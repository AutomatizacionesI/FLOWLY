# Panel interno — leads y tareas

> Vive en `/admin`, dentro del mismo proyecto que la landing. No se enlaza desde ningún lado del sitio, no se indexa y sin login no se ve nada.
> Lo usan Tatu y Facu. Código en `src/admin/`, base en Supabase.

---

## Qué resuelve

Dos cosas que hoy se pierden entre WhatsApp y la cabeza:

1. **El seguimiento de cada lead.** En qué estado está, cuándo fue la última vez que hablaron, cuándo hay que volver a hablarle, cuánto vale y quién lo sigue.
2. **Las tareas.** Las que cuelgan de un lead ("mandarle la propuesta a X") y las sueltas ("renovar el dominio").

El resumen es la pantalla que contesta *qué hago hoy*: lo que tiene el seguimiento vencido, lo que se está enfriando y las tareas que vencen.

---

## Puesta en marcha (una sola vez)

### 1. Crear el proyecto en Supabase

En [supabase.com](https://supabase.com), proyecto nuevo. Región **South America (São Paulo)**, que es la más cerca.

### 2. Correr la migración

SQL Editor → pegar todo el contenido de [`supabase/migrations/0001_panel_admin.sql`](../supabase/migrations/0001_panel_admin.sql) → Run.

Eso crea las cuatro tablas (`perfiles`, `leads`, `lead_movimientos`, `tareas`), los triggers y las policies de RLS. Se puede volver a correr sin romper nada.

Después, lo mismo con [`supabase/migrations/0002_panel_admin_seguridad.sql`](../supabase/migrations/0002_panel_admin_seguridad.sql), que son los ajustes que pidió el linter de Supabase: el `search_path` fijo en las dos funciones que no lo tenían, y sacar las cuatro funciones de trigger de la API pública. No cambia cómo funciona el panel.

### 3. Crear los dos usuarios

**Authentication → Users → Add user → Create new user.** Uno para cada uno, con mail y contraseña. El perfil se crea solo por trigger.

Después, en **Authentication → Sign In / Providers**, dejar **desactivado** el registro público ("Allow new users to sign up"). Así nadie que caiga en `/admin` puede crearse una cuenta.

### 4. Las credenciales

De **Settings → API** salen dos valores. En local van a un archivo `.env.local` en la raíz del repo (está en `.gitignore`, no se sube):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

En Vercel, las mismas dos en **Settings → Environment Variables** (Production y Preview), y redeploy.

> La `anon key` es pública por diseño: viaja en el bundle de cualquier app de Supabase. Lo que protege los datos son las policies de RLS (sin sesión no devuelven nada) y que el registro esté cerrado. La `service_role` key **no** va nunca al front.

### 5. Entrar

`/admin`. Mientras falten las credenciales, el panel muestra una pantalla con estos mismos pasos en vez de romperse.

---

## Cómo está armado

```
src/admin/
  AdminApp.tsx          marco, rutas y puerta de login
  admin.css             todo el estilo, con variables --a-* propias
  config.ts             estados, orígenes, prioridades
  lib/supabase.ts       cliente (null si faltan las credenciales)
  lib/fechas.ts         "hace 3 días", "vence mañana", montos
  state/AuthContext     sesión y perfil
  state/DataContext     leads, tareas y perfiles + realtime
  components/           Shell, formularios, panel del lead, piezas sueltas
  screens/              Resumen, Leads, Tareas, Login, Setup
```

Entra por `src/main.tsx`, que mira el pathname y carga un chunk distinto para la landing, la demo contable y el panel. La landing no arrastra nada de esto: en el build salen tres CSS y tres JS separados.

### Decisiones que conviene saber

- **El último contacto no se escribe a mano.** Sale de los movimientos: cada vez que anotás una llamada, un mail o un WhatsApp en la historia del lead, un trigger corre la fecha. Las notas sueltas no cuentan como contacto.
- **Un lead se considera frío a los 7 días** sin hablar (`DIAS_SIN_CONTACTO` en `config.ts`). Es lo que prende el punto rojo y lo que lo manda a "Se están enfriando".
- **Las dos personas ven y editan todo.** Las policies solo piden estar autenticado. Es un panel de dos, no un CRM con permisos.
- **Hay realtime:** si uno mueve un lead, al otro se le actualiza la pantalla sin recargar.
- **El estilo está escrito a mano**, igual que la demo contable: nada de Tailwind acá, todo cuelga de `.a-root` con variables propias para que no se cruce con la landing.

---

## Cosas que quedaron afuera a propósito

- No hay alta automática de leads: la landing no tiene formulario, los leads entran por WhatsApp y mail y se cargan a mano.
- No hay notificaciones por mail ni recordatorios push.
- No hay reportes ni exportación.

Todo eso se puede agregar después sin tocar lo que ya está.
