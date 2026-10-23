-- ════════════════════════════════════════════════════════════════════════
--  Panel interno de Spike — leads, seguimiento y tareas
--
--  Pegá todo este archivo en el SQL Editor del proyecto nuevo de Supabase
--  y dale Run. Es idempotente: se puede volver a correr sin romper nada.
--
--  El panel lo usan dos personas y las dos ven todo. Por eso las policies
--  son simples: si estás autenticado, podés leer y escribir. Lo que cuida
--  la puerta es que no hay signup abierto (los usuarios se crean a mano
--  desde Authentication → Users).
-- ════════════════════════════════════════════════════════════════════════


-- ── Perfiles ────────────────────────────────────────────────────────────
-- Una fila por usuario de auth, para poder asignar leads y tareas a alguien
-- y mostrar un nombre en vez de un uuid.

create table if not exists public.perfiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  nombre      text not null default 'Sin nombre',
  email       text,
  color       text not null default '#63e28f',
  creado_en   timestamptz not null default now()
);

-- Cuando se crea un usuario en Authentication, su perfil aparece solo.
create or replace function public.crear_perfil()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfiles (id, nombre, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nombre', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.crear_perfil();


-- ── Leads ───────────────────────────────────────────────────────────────

create table if not exists public.leads (
  id                   uuid primary key default gen_random_uuid(),
  empresa              text not null,
  contacto             text,
  email                text,
  telefono             text,
  -- De dónde entró: whatsapp | mail | instagram | linkedin | referido | otro
  origen               text not null default 'whatsapp',
  -- nuevo | contactado | reunion | propuesta | ganado | perdido
  estado               text not null default 'nuevo',
  valor_estimado       numeric(12, 2),
  moneda               text not null default 'USD',
  -- Dueño del seguimiento. Si queda null, es de los dos.
  responsable_id       uuid references public.perfiles (id) on delete set null,
  notas                text,
  -- Se actualiza solo cuando se registra un movimiento (ver trigger de abajo).
  ultimo_contacto      timestamptz,
  proximo_seguimiento  date,
  -- Para ordenar a mano dentro de cada columna del kanban.
  orden                double precision not null default 0,
  motivo_perdida       text,
  creado_en            timestamptz not null default now(),
  actualizado_en       timestamptz not null default now(),

  constraint leads_estado_valido check (
    estado in ('nuevo', 'contactado', 'reunion', 'propuesta', 'ganado', 'perdido')
  ),
  constraint leads_origen_valido check (
    origen in ('whatsapp', 'mail', 'instagram', 'linkedin', 'referido', 'web', 'otro')
  )
);

create index if not exists leads_estado_idx on public.leads (estado, orden);
create index if not exists leads_seguimiento_idx on public.leads (proximo_seguimiento);


-- ── Movimientos de cada lead ────────────────────────────────────────────
-- La historia de la conversación: cada llamada, mail o nota queda acá, y eso
-- es lo que alimenta el "cuándo fue la última vez que hablamos".

create table if not exists public.lead_movimientos (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads (id) on delete cascade,
  -- nota | llamada | reunion | mail | whatsapp | propuesta | estado
  tipo       text not null default 'nota',
  detalle    text,
  autor_id   uuid references public.perfiles (id) on delete set null,
  -- true cuando el movimiento cuenta como contacto real con el lead
  cuenta_contacto boolean not null default true,
  creado_en  timestamptz not null default now(),

  constraint movimientos_tipo_valido check (
    tipo in ('nota', 'llamada', 'reunion', 'mail', 'whatsapp', 'propuesta', 'estado')
  )
);

create index if not exists movimientos_lead_idx
  on public.lead_movimientos (lead_id, creado_en desc);

-- Cada movimiento que cuenta como contacto corre la fecha del último contacto.
create or replace function public.marcar_ultimo_contacto()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.cuenta_contacto then
    update public.leads
       set ultimo_contacto = greatest(coalesce(ultimo_contacto, new.creado_en), new.creado_en),
           actualizado_en = now()
     where id = new.lead_id;
  end if;
  return new;
end;
$$;

drop trigger if exists on_movimiento_creado on public.lead_movimientos;
create trigger on_movimiento_creado
  after insert on public.lead_movimientos
  for each row execute function public.marcar_ultimo_contacto();


-- ── Tareas ──────────────────────────────────────────────────────────────
-- Pueden colgar de un lead o ser sueltas ("renovar el dominio").

create table if not exists public.tareas (
  id            uuid primary key default gen_random_uuid(),
  titulo        text not null,
  detalle       text,
  lead_id       uuid references public.leads (id) on delete cascade,
  responsable_id uuid references public.perfiles (id) on delete set null,
  vence         date,
  -- baja | media | alta
  prioridad     text not null default 'media',
  hecha         boolean not null default false,
  completada_en timestamptz,
  creado_en     timestamptz not null default now(),

  constraint tareas_prioridad_valida check (prioridad in ('baja', 'media', 'alta'))
);

create index if not exists tareas_pendientes_idx on public.tareas (hecha, vence);

-- Marcar/desmarcar una tarea pone y saca la fecha de completada sin que el
-- front se tenga que acordar.
create or replace function public.sellar_tarea()
returns trigger
language plpgsql
as $$
begin
  if new.hecha and not coalesce(old.hecha, false) then
    new.completada_en := now();
  elsif not new.hecha then
    new.completada_en := null;
  end if;
  return new;
end;
$$;

drop trigger if exists on_tarea_actualizada on public.tareas;
create trigger on_tarea_actualizada
  before update on public.tareas
  for each row execute function public.sellar_tarea();


-- ── Marca de tiempo de edición ──────────────────────────────────────────

create or replace function public.tocar_actualizado_en()
returns trigger
language plpgsql
as $$
begin
  new.actualizado_en := now();
  return new;
end;
$$;

drop trigger if exists on_lead_actualizado on public.leads;
create trigger on_lead_actualizado
  before update on public.leads
  for each row execute function public.tocar_actualizado_en();


-- ── Permisos ────────────────────────────────────────────────────────────
-- RLS prendido en todo. Sin sesión no se ve nada; con sesión se ve todo.

alter table public.perfiles         enable row level security;
alter table public.leads            enable row level security;
alter table public.lead_movimientos enable row level security;
alter table public.tareas           enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['perfiles', 'leads', 'lead_movimientos', 'tareas']
  loop
    execute format('drop policy if exists "equipo_lee_%1$s" on public.%1$I', t);
    execute format('drop policy if exists "equipo_escribe_%1$s" on public.%1$I', t);

    execute format(
      'create policy "equipo_lee_%1$s" on public.%1$I
         for select to authenticated using (true)', t);

    execute format(
      'create policy "equipo_escribe_%1$s" on public.%1$I
         for all to authenticated using (true) with check (true)', t);
  end loop;
end
$$;
