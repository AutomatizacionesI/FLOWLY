-- ════════════════════════════════════════════════════════════════════════
--  Fecha de cierre propia para los leads ganados
--
--  El "ganado este mes" del resumen se calculaba con `actualizado_en`, que
--  se pisa sola en cada edición. Un trabajo cerrado en marzo pasaba a contar
--  como de noviembre apenas alguien le corregía una nota.
--
--  Ahora hay una fecha que se graba cuando el lead pasa a ganado y después
--  no se mueve. Es el mismo mecanismo que ya usan las tareas con
--  `completada_en` y el trigger `sellar_tarea`.
--
--  Idempotente, igual que las anteriores.
-- ════════════════════════════════════════════════════════════════════════

alter table public.leads
  add column if not exists cerrado_en timestamptz;

comment on column public.leads.cerrado_en is
  'Cuándo se cerró. Se graba sola al pasar a ganado y no cambia al editar.';

-- Si el lead entra o pasa a ganado, se sella la fecha. Si sale de ganado, se
-- borra. El coalesce deja mandar una fecha explícita, que es lo que permite
-- cargar trabajos viejos con su fecha real en vez de la de hoy.
create or replace function public.sellar_cierre()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.estado = 'ganado'
     and (tg_op = 'INSERT' or coalesce(old.estado, '') <> 'ganado') then
    new.cerrado_en := coalesce(new.cerrado_en, now());
  elsif new.estado <> 'ganado' then
    new.cerrado_en := null;
  end if;
  return new;
end;
$$;

drop trigger if exists on_lead_cerrado on public.leads;
create trigger on_lead_cerrado
  before insert or update on public.leads
  for each row execute function public.sellar_cierre();

revoke execute on function public.sellar_cierre() from public, anon, authenticated;
