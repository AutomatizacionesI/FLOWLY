-- ════════════════════════════════════════════════════════════════════════
--  Carga de Lunar: el cliente y su primer proyecto (la tienda online)
--
--  El panel solo tenía el trabajo nuevo de Lunar (el marketplace). Esto
--  agrega al cliente y la tienda original, que se confirmó antes de que
--  existiera el panel.
--
--  Datos tomados de Spike Core (03-clientes/Lunar):
--    · Precio acordado USD 460; se cobraron USD 420 por un descuento de
--      USD 40 (Gonzalo, 2026-10-02). Se carga 420, lo realmente acordado.
--    · Confirmado en 2026-04-27 (fecha aproximada: es el inicio del
--      proyecto, no consta el día exacto del sí).
--    · Entregado: en producción desde 2026-06-18.
--    · Sin ARR: el mantenimiento de USD 95 queda incluido en el proyecto
--      nuevo, así que no se cuenta dos veces.
--    · Las 30-40 horas son estimadas por Gonzalo, no medidas: van en las
--      notas y no en la tabla de horas.
--
--  Si en `leads` ya hay leads de Lunar (el del marketplace), se ligan al
--  cliente para que al confirmarlos no se cree uno duplicado.
--
--  Requiere la 0005. Idempotente: se puede correr de nuevo sin duplicar.
-- ════════════════════════════════════════════════════════════════════════

insert into public.clientes (nombre, contacto, comercial, notas)
values (
  'Lunar',
  'Cali y Delfi',
  true,
  'Tienda de ropa de segunda mano. Primer cliente externo; refirió a ReDress.'
)
on conflict (lower(nombre)) do nothing;

-- Los leads de Lunar que ya estén cargados pasan a ser del cliente.
update public.leads
   set cliente_id = (select id from public.clientes where lower(nombre) = 'lunar')
 where lower(empresa) like 'lunar%'
   and cliente_id is null;

insert into public.proyectos (
  cliente_id, nombre, estado, cotizado_usd, monto_usd, confirmado_en,
  arr_usd, repo_url, drive_url, notas
)
select
  c.id,
  'Tienda online',
  'entregado',
  460,
  420,
  date '2026-04-27',
  0,
  'https://github.com/AutomatizacionesI/Lunar-Vintage',
  'https://drive.google.com/drive/folders/1FogW7DKKOloagBtaVbTH4YY8Hbz4Qx5-',
  'Web en producción desde 2026-06-18 (lunarvintagee.com). Cotizado 460, cobrado 420 por descuento. Fecha de confirmación aproximada. Horas estimadas por Gonzalo: 30-40 entre los dos (no medidas). Su mantenimiento (USD 95/año) quedó incluido en el proyecto nuevo.'
from public.clientes c
where lower(c.nombre) = 'lunar'
  and not exists (
    select 1 from public.proyectos p
     where p.cliente_id = c.id and p.nombre = 'Tienda online'
  );
