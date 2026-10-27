-- ════════════════════════════════════════════════════════════════════════
--  Pasar lo que ya está en el tablero al modelo de clientes y proyectos
--
--  Hasta ahora lo ganado vivía como leads con `valor_estimado`. El generado
--  histórico sale de eso, no de números cargados a mano: cada lead ganado
--  pasa a ser un cliente (si no lo era) y un proyecto, con el monto, el
--  mantenimiento y la fecha de cierre que ya tenía.
--
--    · monto_usd      = valor_estimado del lead (0 si no tenía)
--    · arr_usd        = mantenimiento_anual del lead (0 si no tenía)
--    · confirmado_en  = fecha de cierre del lead (`cerrado_en`)
--    · Si el lead estaba en otra moneda que USD, el monto se copia igual y
--      queda avisado en las notas del proyecto, para convertirlo a mano.
--
--  Lo único que se suma por fuera del tablero es el proyecto original de
--  Lunar (0006). Después, los clientes que no tienen lead y solo hay que
--  tener registrados, con las marcas acordadas:
--
--    · HIKE: comercial. Proyecto de USD 0 (son amigos) y mantenimiento de
--      USD 120 al año.
--    · Blanco & Etcheverry, TeLaRegalo, Kopel Sanchez y Ventura Rentals: no
--      comerciales, no entran en ninguna métrica.
--
--  Los leads que siguen abiertos o perdidos (Pike&Co, Fiestasuy, el delivery
--  de empanadas) no se tocan: son leads, no proyectos.
--
--  Requiere la 0005 y la 0006. Idempotente: se puede volver a correr.
-- ════════════════════════════════════════════════════════════════════════


-- ── 1. Clientes de los leads ganados ────────────────────────────────────

insert into public.clientes (nombre, contacto, email, telefono, responsable_id)
select distinct on (lower(l.empresa))
       l.empresa, l.contacto, l.email, l.telefono, l.responsable_id
  from public.leads l
 where l.estado = 'ganado'
   and l.cliente_id is null
   and not exists (select 1 from public.clientes c where lower(c.nombre) = lower(l.empresa))
 order by lower(l.empresa), l.creado_en;

update public.leads l
   set cliente_id = c.id
  from public.clientes c
 where l.estado = 'ganado'
   and l.cliente_id is null
   and lower(c.nombre) = lower(l.empresa);


-- ── 2. Un proyecto por cada lead ganado ─────────────────────────────────

insert into public.proyectos (
  cliente_id, lead_id, nombre, estado, cotizado_usd, monto_usd,
  confirmado_en, arr_usd, responsable_id, notas
)
select
  l.cliente_id,
  l.id,
  l.empresa,
  'en_curso',
  l.valor_estimado,
  coalesce(l.valor_estimado, 0),
  coalesce(l.cerrado_en::date, l.actualizado_en::date),
  coalesce(l.mantenimiento_anual, 0),
  l.responsable_id,
  case
    when l.moneda <> 'USD'
      then 'Pasado desde el tablero. El lead estaba en ' || l.moneda
           || ': el monto está sin convertir, revisarlo.'
    else 'Pasado desde el tablero de leads.'
  end
from public.leads l
where l.estado = 'ganado'
  and l.cliente_id is not null
  and not exists (select 1 from public.proyectos p where p.lead_id = l.id);


-- ── 3. Clientes sin lead que hay que tener registrados ──────────────────

create temporary table _extra (
  cliente    text,
  comercial  boolean,
  proyecto   text,
  estado     text,
  fecha      date,
  arr_usd    numeric,
  notas      text
);

insert into _extra values
  ('HIKE', true, 'Landing de HIKE', 'entregado', date '2026-04-05', 120,
   'Proyecto de onda para amigos: se cobró USD 0. Mantenimiento de USD 120 al año (USD 10 por mes).'),
  ('Blanco & Etcheverry', false, 'Sistema de gestión contable', 'en_curso', date '2026-07-03', 0,
   'No comercial. El desarrollo formó parte de otro arreglo con el estudio; lanzamiento por pasos desde 2026-10-13.'),
  ('TeLaRegalo', false, 'Plataforma de regalos', 'en_curso', date '2026-03-01', 0,
   'Venture interno de Spike y laboratorio técnico. Fecha aproximada.'),
  ('Kopel Sanchez', false, 'Reportes Power BI', 'entregado', date '2026-10-05', 0,
   'Trabajo de Gonzalo en su rol, no vendido por Spike. Fecha no registrada.'),
  ('Ventura Rentals', false, 'Estados de cuenta Excel a PDF', 'entregado', date '2026-10-05', 0,
   'Trabajo de Gonzalo en su rol, no vendido por Spike. Archivado. Fecha no registrada.'),
  ('Ventura Rentals', false, 'Sistema de gestión de alquileres', 'en_curso', date '2026-10-05', 0,
   'Trabajo de Gonzalo en su rol, no vendido por Spike. Fecha no registrada.');

insert into public.clientes (nombre, comercial)
select distinct on (lower(e.cliente)) e.cliente, e.comercial
  from _extra e
 where not exists (select 1 from public.clientes c where lower(c.nombre) = lower(e.cliente))
 order by lower(e.cliente);

-- La marca de comercial es una decisión de cómo contar: se fija siempre,
-- también si el cliente ya estaba en el tablero.
update public.clientes c
   set comercial = e.comercial
  from (select distinct on (lower(cliente)) cliente, comercial from _extra order by lower(cliente)) e
 where lower(c.nombre) = lower(e.cliente)
   and c.comercial is distinct from e.comercial;

-- Su proyecto en cero solo se crea si el cliente no tiene ninguno todavía
-- (si venía de un lead ganado, ya lo tiene del paso 2).
insert into public.proyectos (cliente_id, nombre, estado, monto_usd, confirmado_en, arr_usd, notas)
select c.id, e.proyecto, e.estado, 0, e.fecha, e.arr_usd, e.notas
  from _extra e
  join public.clientes c on lower(c.nombre) = lower(e.cliente)
 where not exists (select 1 from public.proyectos p where p.cliente_id = c.id)
    or (e.cliente = 'Ventura Rentals'
        and not exists (
          select 1 from public.proyectos p
           where p.cliente_id = c.id and p.nombre = e.proyecto));

-- HIKE paga USD 120 al año de mantenimiento aunque el lead no lo tuviera cargado.
update public.proyectos p
   set arr_usd = 120
  from public.clientes c
 where p.cliente_id = c.id
   and lower(c.nombre) = 'hike'
   and p.arr_usd = 0
   and p.arr_baja_en is null;

drop table _extra;
