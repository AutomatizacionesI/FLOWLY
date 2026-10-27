-- ════════════════════════════════════════════════════════════════════════
--  Clientes y proyectos
--
--  Hasta ahora todo colgaba del lead, y el "ganado" salía de leads cerrados.
--  Esta migración separa tres cosas que son distintas:
--
--    lead      una oportunidad. Un cliente que pide otra cosa abre un lead
--              nuevo, así el historial de ganados y perdidos queda limpio.
--    cliente   quien persiste. Tiene sus proyectos, sus leads y su propio
--              seguimiento posventa (último y próximo contacto).
--    proyecto  lo que se confirmó. Su `monto_usd` y su fecha de confirmación
--              son lo que alimenta "Generado" (histórico, con filtro por fecha).
--
--  Reglas del modelo:
--    · Todo es en USD. No hay columna de moneda en las tablas nuevas.
--    · "Generado" = suma de `monto_usd` de proyectos no cancelados de
--      clientes comerciales, por `confirmado_en`. No depende de cuándo se cobra.
--    · Los mantenimientos no son generado: van en `arr_usd` (ingreso anual
--      recurrente) y se miran aparte.
--    · Una ampliación es un proyecto nuevo con su propio monto (el extra),
--      opcionalmente ligado al original con `proyecto_origen_id`.
--    · Los clientes internos o no comerciales (`comercial = false`) no entran
--      en ninguna métrica.
--    · Horas y costos por proyecto, para poder ver el margen real.
--
--  No migra datos: cargar el histórico es un paso aparte, con los números
--  confirmados. `leads.moneda` queda como está (el front todavía la lee).
--
--  Idempotente, igual que las anteriores.
-- ════════════════════════════════════════════════════════════════════════


-- ── Clientes ────────────────────────────────────────────────────────────

create table if not exists public.clientes (
  id                   uuid primary key default gen_random_uuid(),
  nombre               text not null,
  contacto             text,
  email                text,
  telefono             text,
  -- false para internos y trabajos sin fin comercial (no entran en métricas)
  comercial            boolean not null default true,
  responsable_id       uuid references public.perfiles (id) on delete set null,
  notas                text,
  -- Seguimiento posventa: es lo que hace aparecer al cliente en el resumen
  -- cuando conviene volver a hablarle, aunque no tenga un lead abierto.
  ultimo_contacto      timestamptz,
  proximo_seguimiento  date,
  creado_en            timestamptz not null default now(),
  actualizado_en       timestamptz not null default now()
);

create unique index if not exists clientes_nombre_unico_idx
  on public.clientes (lower(nombre));
create index if not exists clientes_seguimiento_idx
  on public.clientes (proximo_seguimiento);


-- ── Los leads apuntan al cliente ────────────────────────────────────────
-- Null mientras el lead es un prospecto nuevo. Se completa al confirmar, o
-- desde el principio si quien escribe ya es cliente.

alter table public.leads
  add column if not exists cliente_id uuid references public.clientes (id) on delete set null;

create index if not exists leads_cliente_idx on public.leads (cliente_id);

comment on column public.leads.cliente_id is
  'Cliente al que pertenece. Null si todavía es un prospecto que nunca confirmó nada.';


-- ── Proyectos ───────────────────────────────────────────────────────────

create table if not exists public.proyectos (
  id                  uuid primary key default gen_random_uuid(),
  cliente_id          uuid not null references public.clientes (id) on delete restrict,
  -- El lead que lo originó. Un lead confirma a lo sumo un proyecto.
  lead_id             uuid references public.leads (id) on delete set null,
  -- Si es una ampliación o mejora, el proyecto que la originó. Informativo:
  -- el generado de la ampliación es solo el extra, como si fuera aparte.
  proyecto_origen_id  uuid references public.proyectos (id) on delete set null,
  nombre              text not null,
  -- en_curso | entregado | cancelado
  estado              text not null default 'en_curso',
  -- Lo que se estimó en el lead, para comparar contra el monto final.
  cotizado_usd        numeric(12, 2),
  -- Lo confirmado. Es el "generado" del proyecto.
  monto_usd           numeric(12, 2) not null default 0,
  -- Día en que se confirmó. Es la fecha por la que se filtra el generado.
  confirmado_en       date not null default current_date,
  -- Mantenimiento recurrente anual (no cuenta como generado).
  arr_usd             numeric(12, 2) not null default 0,
  -- Si el mantenimiento se dio de baja, desde cuándo. Null = sigue vigente.
  arr_baja_en         date,
  responsable_id      uuid references public.perfiles (id) on delete set null,
  repo_url            text,
  drive_url           text,
  notas               text,
  creado_en           timestamptz not null default now(),
  actualizado_en      timestamptz not null default now(),

  constraint proyectos_estado_valido check (estado in ('en_curso', 'entregado', 'cancelado')),
  constraint proyectos_montos_validos check (
    monto_usd >= 0 and arr_usd >= 0 and (cotizado_usd is null or cotizado_usd >= 0)
  )
);

create unique index if not exists proyectos_lead_unico_idx
  on public.proyectos (lead_id) where lead_id is not null;
create index if not exists proyectos_cliente_idx on public.proyectos (cliente_id);
create index if not exists proyectos_confirmado_idx on public.proyectos (confirmado_en);


-- ── Horas por proyecto ──────────────────────────────────────────────────
-- Una fila por bloque de trabajo cargado: quién, cuándo y cuánto.

create table if not exists public.horas (
  id           uuid primary key default gen_random_uuid(),
  proyecto_id  uuid not null references public.proyectos (id) on delete cascade,
  persona_id   uuid references public.perfiles (id) on delete set null,
  fecha        date not null default current_date,
  horas        numeric(5, 2) not null,
  detalle      text,
  creado_en    timestamptz not null default now(),

  constraint horas_positivas check (horas > 0 and horas <= 24)
);

create index if not exists horas_proyecto_idx on public.horas (proyecto_id, fecha desc);


-- ── Costos por proyecto ─────────────────────────────────────────────────
-- Lo que sale de plata de verdad para entregar el proyecto: infraestructura,
-- licencias, terceros. El tiempo propio va en `horas`, no acá.

create table if not exists public.costos_proyecto (
  id           uuid primary key default gen_random_uuid(),
  proyecto_id  uuid not null references public.proyectos (id) on delete cascade,
  fecha        date not null default current_date,
  -- infra | licencia | terceros | otro
  tipo         text not null default 'otro',
  concepto     text not null,
  monto_usd    numeric(12, 2) not null,
  creado_en    timestamptz not null default now(),

  constraint costos_tipo_valido check (tipo in ('infra', 'licencia', 'terceros', 'otro')),
  constraint costos_monto_valido check (monto_usd >= 0)
);

create index if not exists costos_proyecto_idx
  on public.costos_proyecto (proyecto_id, fecha desc);


-- ── Marca de tiempo de edición ──────────────────────────────────────────
-- Reusa la función de la 0001.

drop trigger if exists on_cliente_actualizado on public.clientes;
create trigger on_cliente_actualizado
  before update on public.clientes
  for each row execute function public.tocar_actualizado_en();

drop trigger if exists on_proyecto_actualizado on public.proyectos;
create trigger on_proyecto_actualizado
  before update on public.proyectos
  for each row execute function public.tocar_actualizado_en();


-- ── Confirmar un lead ───────────────────────────────────────────────────
-- Es el paso que convierte un lead en cliente (si todavía no lo era) y crea
-- su proyecto, todo junto: o pasa todo o no pasa nada. El front lo llama
-- cuando alguien marca un lead como ganado.
--
-- Corre con los permisos de quien llama, así que se rige por las policies.

create or replace function public.confirmar_lead(
  p_lead_id        uuid,
  p_monto_usd      numeric,
  p_nombre         text default null,
  p_arr_usd        numeric default 0,
  p_confirmado_en  date default current_date
)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  v_lead       public.leads%rowtype;
  v_cliente_id uuid;
  v_proyecto   uuid;
begin
  select * into v_lead from public.leads where id = p_lead_id for update;
  if not found then
    raise exception 'El lead % no existe', p_lead_id;
  end if;

  if exists (select 1 from public.proyectos where lead_id = p_lead_id) then
    raise exception 'Este lead ya tiene un proyecto confirmado';
  end if;

  v_cliente_id := v_lead.cliente_id;

  -- Si el lead no tenía cliente, se busca por nombre (por si ya existía) y,
  -- si no está, se crea con los datos del lead.
  if v_cliente_id is null then
    select id into v_cliente_id
      from public.clientes
     where lower(nombre) = lower(v_lead.empresa);

    if v_cliente_id is null then
      insert into public.clientes (nombre, contacto, email, telefono, responsable_id)
      values (v_lead.empresa, v_lead.contacto, v_lead.email, v_lead.telefono, v_lead.responsable_id)
      returning id into v_cliente_id;
    end if;
  end if;

  insert into public.proyectos (
    cliente_id, lead_id, nombre, cotizado_usd, monto_usd,
    arr_usd, confirmado_en, responsable_id
  )
  values (
    v_cliente_id, p_lead_id, coalesce(nullif(trim(p_nombre), ''), v_lead.empresa),
    v_lead.valor_estimado, p_monto_usd,
    coalesce(p_arr_usd, 0), p_confirmado_en, v_lead.responsable_id
  )
  returning id into v_proyecto;

  -- El trigger de la 0004 sella `cerrado_en` al pasar a ganado.
  update public.leads
     set estado = 'ganado', cliente_id = v_cliente_id
   where id = p_lead_id;

  return v_proyecto;
end;
$$;

revoke execute on function public.confirmar_lead(uuid, numeric, text, numeric, date)
  from public, anon;
grant execute on function public.confirmar_lead(uuid, numeric, text, numeric, date)
  to authenticated;


-- ── Vistas para los números ─────────────────────────────────────────────
-- `security_invoker` hace que las vistas respeten las policies de quien
-- consulta, en vez de saltearlas.

-- Un proyecto con sus horas, costos y margen. Es la base de todo lo demás.
create or replace view public.proyectos_resumen
with (security_invoker = on) as
select
  p.id,
  p.cliente_id,
  c.nombre                                   as cliente,
  c.comercial,
  p.lead_id,
  p.proyecto_origen_id,
  p.nombre,
  p.estado,
  p.cotizado_usd,
  p.monto_usd,
  p.confirmado_en,
  p.arr_usd,
  p.arr_baja_en,
  p.responsable_id,
  p.repo_url,
  p.drive_url,
  p.notas,
  coalesce(h.horas, 0)                       as horas,
  coalesce(k.costos, 0)                      as costos_usd,
  p.monto_usd - coalesce(k.costos, 0)        as margen_usd,
  -- Lo que queda por hora trabajada: el número que más cuesta de llevar.
  case when coalesce(h.horas, 0) > 0
       then round((p.monto_usd - coalesce(k.costos, 0)) / h.horas, 2)
  end                                        as usd_por_hora,
  -- Cuenta para "Generado" si no está cancelado y el cliente es comercial.
  (p.estado <> 'cancelado' and c.comercial)  as cuenta_generado,
  -- Cuenta para ARR si tiene mantenimiento vigente.
  (p.estado <> 'cancelado' and c.comercial
     and p.arr_usd > 0 and p.arr_baja_en is null) as cuenta_arr
from public.proyectos p
join public.clientes c on c.id = p.cliente_id
left join (
  select proyecto_id, sum(horas) as horas from public.horas group by proyecto_id
) h on h.proyecto_id = p.id
left join (
  select proyecto_id, sum(monto_usd) as costos from public.costos_proyecto group by proyecto_id
) k on k.proyecto_id = p.id;

-- Leads marcados como ganados que todavía no tienen proyecto: la lista de
-- lo que falta cargar o confirmar bien.
create or replace view public.leads_ganados_sin_proyecto
with (security_invoker = on) as
select l.*
from public.leads l
where l.estado = 'ganado'
  and not exists (select 1 from public.proyectos p where p.lead_id = l.id);


-- ── Permisos ────────────────────────────────────────────────────────────
-- Mismo criterio que el resto: RLS prendido, con sesión se ve y se escribe
-- todo. Son dos personas, no un CRM con roles.

alter table public.clientes        enable row level security;
alter table public.proyectos       enable row level security;
alter table public.horas           enable row level security;
alter table public.costos_proyecto enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['clientes', 'proyectos', 'horas', 'costos_proyecto']
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
