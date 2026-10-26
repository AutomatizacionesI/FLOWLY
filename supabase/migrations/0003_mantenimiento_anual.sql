-- ════════════════════════════════════════════════════════════════════════
--  Mantenimiento anual de los leads ganados
--
--  Hasta ahora el único número del lead era `valor_estimado`, que es lo que
--  entra una sola vez al cerrar. Los mantenimientos quedaban escritos en las
--  notas, donde no los suma nadie.
--
--  Esta columna los separa, porque son plata distinta: una entra una vez y
--  la otra entra todos los años. Mezclarlas ensuciaría el "ganado del mes".
--
--  Idempotente, igual que las anteriores.
-- ════════════════════════════════════════════════════════════════════════

alter table public.leads
  add column if not exists mantenimiento_anual numeric(12, 2);

comment on column public.leads.mantenimiento_anual is
  'Lo que paga por año de mantenimiento, aparte del valor del cierre. Null si no tiene.';
