# SPEC 01 — Feed como home (`/`)

> **Estado:** Implementado
> **Depende de:** —
> **Fecha:** 2026-10-06
> **Objetivo:** Portar la pantalla Feed de `references/pantallas/feed.dc.html` a la ruta `/` como componentes React + Tailwind v4, con datos ficticios y sidebar responsive, sin navegación ni interactividad.

## Por qué existe este spec

Es el primer spec del repo y establece convenciones de porteo que heredarán las specs siguientes (estructura de carpetas, tema Tailwind v4, fuentes, iconos inline, datos mock). Convertir el mockup en componentes pequeños fija los patrones antes de multiplicarlos por 16 pantallas.

## Scope

**In:**

- Ruta `/` (`app/page.tsx`) que renderiza el Feed completo.
- Tema en `app/globals.css`: colores del mockup y body base vía `@theme`.
- Fuentes Fredoka (títulos) y Nunito (cuerpo) en `app/layout.tsx` con `next/font/google`.
- Sidebar responsive: fijo en desktop (`>= md`), drawer off-canvas con botón hamburguesa en móvil.
- Bloque de bienvenida (eyebrow, saludo, subtítulo).
- Prompt de composición "Compartí un momento…".
- Divisor "PUBLICADO HOY".
- `PostCard` para los 3 tipos: `achievement` (logro), `activity` (actividad con placeholder de foto), `announcement` (anuncio).
- Datos ficticios y tipos TS en `_data/mock.ts`.
- Iconos SVG inline portados del mockup, en `components/shared/icons.tsx`.
- Componentes en `components/shared` (comunes) y `components/home` (propios del home).

**Out of scope (para specs futuras):**

- Navegación real entre pantallas (routing / `<Link>` a rutas existentes).
- Interactividad: dar like, comentar, editar, abrir detalle, subir foto.
- Autenticación y sesión de usuario.
- Base de datos o cualquier persistencia.
- Las otras 15 pantallas de `references/pantallas/`.
- Dark mode.
- Tests automatizados (no hay framework configurado).

## Data model

Todo en `_data/mock.ts`. Sin persistencia.

```ts
export type PostKind = "achievement" | "activity" | "announcement";

export interface RoomHeader {
  room: string; // "Sala Soles"
  greetingName: string; // "Caro"
  childCount: number; // 12
  dateLabel: string; // "martes 17 jun"
}

export interface Author {
  id: string;
  name: string; // "Mateo"
  initial: string; // "M"
  role: string; // "Maestra"
  room: string; // "Soles"
}

export interface Post {
  id: string;
  kind: PostKind;
  author: Author;
  time: string; // "14:20"
  publishedBy: string; // "publicado por vos"
  audience: string; // "Para: familia de Mateo" | "Para: toda la sala"
  body: string;
  likes: number;
  comments: number;
  photoLabel?: string; // presente solo en activity: "Foto · pintando con témperas"
}

export interface NavItem {
  id: string; // "feed" | "children" | "notices" | "account"
  label: string; // "Feed" | "Niños" | "Avisos" | "Mi cuenta"
  active: boolean;
}

export interface PostKindStyle {
  label: string; // "LOGRO"
  bubbleBg: string; // "#CFEBD8"
  dot: string; // "#3E9B6C"
  text: string; // "#3E9B6C"
}

export const currentUser: Author;
export const roomHeader: RoomHeader;
export const navItems: NavItem[];
export const posts: Post[];
export const postKindStyles: Record<PostKind, PostKindStyle>;
```

Convenciones:

- `photoLabel` es un placeholder estático; no hay imagen real ni `next/image`.
- Los colores viven en la config de tipos, no hardcodeados en los componentes.
- Toda la data es de solo lectura; los componentes no la mutan.

## Implementation plan

1. **Tema y fuentes.** En `app/layout.tsx` reemplazar Geist por Fredoka y Nunito (múltiples pesos), exponerlos como variables CSS y actualizar `metadata`. En `app/globals.css` definir `@theme` (colores del mockup, `--font-heading`/`--font-body`) y body base (`#F6ECDF`, texto `#3F362E`, scrollbar). Verificación: `npm run dev` arranca y `/` toma fondo y tipografía.
2. **Datos mock.** Crear `_data/mock.ts` con los tipos y datos de arriba. Verificación: `npx tsc --noEmit` pasa.
3. **Iconos.** Crear `components/shared/icons.tsx` exportando los SVGs inline del mockup (logo sol, plus, home, niños, campana, cuenta, logout, cámara, corazón, comentario, imagen). Verificación: render temporal sin errores de tipos.
4. **Sidebar presentacional.** Crear `components/shared/Sidebar.tsx` (logo + "Nueva publicación" + nav + footer de usuario) consumiendo `navItems` y `currentUser`, con el ítem `active` resaltado. Verificación: se ve igual al mockup en desktop.
5. **AppShell responsive.** Crear `components/shared/AppShell.tsx` como client component: estado `isDrawerOpen`, layout flex sidebar+main, sidebar fijo en `md+`, drawer off-canvas + overlay + botón hamburguesa en móvil. Verificación: en 375px el sidebar se abre y cierra sin scroll horizontal.
6. **Secciones del home.** Crear `components/home/FeedHeader.tsx` (eyebrow + saludo + subtítulo), `components/home/ComposerPrompt.tsx` y `components/home/SectionDivider.tsx`. Verificación: bloque superior idéntico al mockup.
7. **PostCard.** Crear `components/home/PostCard.tsx`: cabecera de autor con avatar inicial, badge por `kind`, audiencia, cuerpo, placeholder de foto condicional (`photoLabel`), y footer con likes/comentarios/"Editar". Verificación: los 3 tipos se distinguen visualmente.
8. **Feed.** Crear `components/home/Feed.tsx` que mapea `posts` a `PostCard`. Verificación: se renderizan 3 tarjetas en orden.
9. **Composición de `/`.** `app/page.tsx` compone `AppShell` + `Feed` con los datos mock. Verificación: `/` reproduce `references/screenshots/feed.png`.

## Acceptance criteria

- [x] `npm run build` termina sin errores.
- [x] `npm run lint` no reporta errores.
- [x] `/` muestra sidebar, bloque de bienvenida, prompt de composición, divisor y 3 tarjetas.
- [x] Los 3 tipos se distinguen por color/etiqueta: LOGRO verde, ACTIVIDAD celeste, ANUNCIO azul.
- [x] Solo la tarjeta de actividad muestra el placeholder `Foto · pintando con témperas`.
- [x] El sidebar es fijo en desktop y se abre como drawer off-canvas con hamburguesa en `< md`.
- [x] Ningún enlace del sidebar ni de las tarjetas navega ni rompe la app.
- [x] No hay scroll horizontal a 375px de ancho.
- [x] Fredoka se aplica a los títulos y Nunito al cuerpo.
- [x] La consola no muestra errores ni warnings de React.

## Decisions

- **Sí:** drawer off-canvas + hamburguesa. Máxima similitud al mockup con usabilidad móvil.
- **No:** rail de iconos en tablet. Sobre-ingeniería para una sola pantalla.
- **Sí:** SVGs inline portados del mockup. Cero dependencias nuevas y fidelidad exacta.
- **No:** `lucide-react`. Cambiaría tamaños/trazos y arriesga el pixel-perfect.
- **Sí:** reemplazar Geist por Fredoka + Nunito en `layout.tsx`. Es lo que pide el diseño.
- **Sí:** enlaces estáticos sin navegación (`<button>`/`<a href="#">`). No hay rutas destino.
- **Sí:** `_data/mock.ts` en la raíz y `components/{shared,home}`. Confirmado por el usuario.
- **Sí:** estado del drawer aislado en `AppShell` (`"use client"`); el resto son server components.
- **Sí:** spec en español, código en inglés. Coincide con "código en inglés, comentarios en español".
- **No:** dark mode, autenticación, persistencia. Fuera de alcance.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Falta de fidelidad pixel-perfect con utilidades Tailwind | Usar los hex, radios y sombras exactos del mockup vía `@theme` y arbitrary values. |
| Errores de hidratación por el estado del drawer | Aislar `useState` solo en `AppShell` con `"use client"`. |
| Fuentes variables con pesos incorrectos | Declarar explícitamente los `weight` usados (400–700 Fredoka, 400–800 Nunito). |
| Ambigüedad sobre el placeholder de foto | Se trata como `div` estático con borde punteado; sin imagen real. |

## What is **not** in this spec

- Navegación entre pantallas e interactividad (likes, comentarios, editar, detalle, subir foto).
- Autenticación, base de datos y persistencia.
- Las otras 15 pantallas de `references/pantallas/`.
- Dark mode y tests automatizados.

Cada uno de esos, si llega, va en su propio spec.
