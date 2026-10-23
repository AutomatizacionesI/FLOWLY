-- ════════════════════════════════════════════════════════════════════════
--  Ajustes de seguridad que pidió el linter de Supabase
--
--  Dos cosas, ninguna cambia cómo funciona el panel:
--
--  1. Las dos funciones que faltaban quedan con el search_path fijo. Sin
--     eso, alguien que pueda cambiar el search_path de su sesión podría
--     hacer que la función resuelva otro objeto. `sellar_tarea` y
--     `tocar_actualizado_en` no tocan ninguna tabla (sólo NEW y OLD), así
--     que les alcanza con el search_path vacío.
--
--  2. Las cuatro funciones de trigger dejan de ser llamables por la API.
--     Estaban expuestas en /rest/v1/rpc/ por vivir en el schema public.
--     Llamarlas así da error igual (una función de trigger necesita el
--     contexto del trigger), pero no tienen por qué estar ofrecidas.
--     El permiso venía de PUBLIC, que Postgres le da a toda función
--     nueva, así que hay que revocarlo de ahí y no sólo de los roles.
--     Los triggers siguen andando: corren con los permisos del dueño de
--     la función, no con los de quien hace el insert.
--
--  Idempotente, igual que 0001.
-- ════════════════════════════════════════════════════════════════════════


-- ── 1. search_path fijo ─────────────────────────────────────────────────

alter function public.sellar_tarea() set search_path = '';
alter function public.tocar_actualizado_en() set search_path = '';


-- ── 2. Sacarlas de la API pública ───────────────────────────────────────

revoke execute on function public.crear_perfil()           from public, anon, authenticated;
revoke execute on function public.marcar_ultimo_contacto()  from public, anon, authenticated;
revoke execute on function public.sellar_tarea()            from public, anon, authenticated;
revoke execute on function public.tocar_actualizado_en()    from public, anon, authenticated;
