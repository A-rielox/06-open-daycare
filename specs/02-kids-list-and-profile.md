# SPEC 02 — Niños y perfil del niño (`/kids`, `/kids/[id]`)

> **Estado:** aprobado
> **Depende de:** SPEC 01
> **Fecha:** 2026-10-08
> **Objetivo:** Portar las pantallas Niños y Perfil del niño de `references/pantallas/ninos.dc.html` y `references/pantallas/perfil-nino.dc.html` a las rutas `/kids` y `/kids/[id]` como componentes React + Tailwind v4, con 8 niños ficticios, búsqueda en el cliente y navegación entre la lista y el perfil.

## Por qué existe este spec

Es el segundo spec y el primero que introduce navegación real (lista → perfil) y estado de cliente (búsqueda). Reutiliza el AppShell, el Sidebar, los iconos y el tema de SPEC 01, y valida que el Sidebar pueda volverse route-aware sin romper el Feed. También fija el patrón para futuras pantallas con ruta dinámica (`[id]`) y `notFound()`.

## Scope

**In:**

- Ruta `/kids` (`app/kids/page.tsx`): header (eyebrow GESTIÓN + título "Niños" + botón "Agregar niño"), buscador, encabezado "SALA SOLES · 8 niños" y grilla de tarjetas.
- Ruta `/kids/[id]` (`app/kids/[id]/page.tsx`): volver, identidad, banner de alergia condicional, ficha de datos y columna derecha.
- `_data/kids.ts`: tipos `Kid`, `Parent`, `KidsRoomHeader`, `getKidById` y 8 niños ficticios.
- Búsqueda del lado del cliente por nombre (case/acentos-insensitive) con estado vacío.
- Navegación real: Sidebar `Feed → /` y `Niños → /kids`; tarjeta → `/kids/[id]`; volver → `/kids`.
- Sidebar route-aware (`usePathname` + `next/link`), activo derivado de la ruta.
- Iconos nuevos en `components/shared/icons.tsx`.
- `notFound()` cuando el `id` no existe.

**Out of scope (para specs futuras):**

- Backend, API y persistencia.
- Alta/edición real de niños ("Agregar niño", "Editar") y vinculación real de padres.
- "Resumen del día", "Padres vinculados" y "Vincular otro padre" como funcionalidad (quedan como UI no-navegable).
- Navegación a Avisos, Mi cuenta y "Nueva publicación".
- Autenticación.
- Las otras 14 pantallas de `references/pantallas/`.
- Dark mode y tests automatizados.

## Data model

Todo en `_data/kids.ts`. Sin persistencia.

```ts
export type ParentStatus = "active" | "pending";

export interface Parent {
  id: string;
  name: string;      // "Lucía Fernández"
  initial: string;   // "L"
  role: string;      // "Mamá" | "Papá"
  status: ParentStatus;
}

export interface Kid {
  id: string;             // slug de la URL: "mateo" → /kids/mateo
  name: string;           // "Mateo Fernández"
  initial: string;        // "M"
  avatarBg: string;       // "#A9D9E8"
  avatarText: string;     // "#1F7A93"
  age: number;            // 3
  room: string;           // "Soles"
  birthDateLabel: string; // "12 mar 2022"
  joinedLabel: string;    // "feb 2025"
  allergies: string[];    // ["MANÍ"] | []
  allergyNote?: string;   // presente solo si allergies.length > 0
  parents: Parent[];
}

export interface KidsRoomHeader {
  eyebrow: string; // "GESTIÓN"
  title: string;   // "Niños"
  room: string;    // "SALA SOLES"
}

export const kidsRoomHeader: KidsRoomHeader;
export const kids: Kid[]; // exactamente 8
export function getKidById(id: string): Kid | undefined;
```

Convenciones:

- `kids` tiene exactamente 8 registros con los datos del mockup: Mateo Fernández, Sofía Méndez, Benjamín Ruiz, Valentina Soto, Tomás Díaz, Emma Castro, Lucas Romero, Olivia Vega.
- `avatarBg`/`avatarText` viven en los datos para reproducir la paleta del mockup; no se ciclan por índice.
- El indicador de la tarjeta se deriva en el componente: si `allergies.length > 0` → primer valor de `allergies` con estilo de alerta; si no y `parents.length === 0` → "VINCULAR" con estilo rosado; si no → chevron.
- El conteo "8 niños" se deriva de `kids.length`, no se hardcodea.
- `allergyNote` es obligatorio cuando hay alergias y ausente cuando no.
- `getKidById` es una búsqueda lineal de solo lectura.

## Implementation plan

1. **Datos.** Crear `_data/kids.ts` con los tipos, `kidsRoomHeader`, `getKidById` y los 8 niños. Verificación: `npx tsc --noEmit` pasa.
2. **Iconos.** Agregar a `components/shared/icons.tsx`: `SearchIcon`, `ChevronRightIcon`, `ArrowLeftIcon`, `AlertIcon`. Verificación: `npx tsc --noEmit` pasa.
3. **Sidebar route-aware.** En `_data/mock.ts` cambiar `NavItem` a `{ id, label, href }` (`href` `"/"` y `"/kids"`; placeholders con `"#"`). Convertir `components/shared/Sidebar.tsx` en client component: `next/link` + `usePathname`, activo si `pathname === href` o `pathname.startsWith(href + "/")`. Verificación: en `/` resalta Feed y en `/kids` resalta Niños.
4. **Tarjeta de niño.** Crear `components/kids/KidCard.tsx`: avatar con inicial, nombre, "N años · X padres vinculados | sin padres vinculados", indicador derivado y `Link` a `/kids/${id}`. Verificación: render de una tarjeta con cada variante.
5. **Buscador y lista.** Crear `components/kids/KidsList.tsx` (`"use client"`): input controlado, filtro por nombre normalizado (minúsculas + sin acentos), grilla `md:grid-cols-2` y estado vacío "No se encontraron niños". Verificación: escribir filtra en vivo y un texto sin match muestra el estado vacío.
6. **Página `/kids`.** Crear `app/kids/page.tsx` (server component) que compone `AppShell` + header + `KidsList`. Verificación: `/kids` reproduce `references/screenshots/ninos.png`.
7. **Perfil.** Crear `components/kids/KidProfile.tsx` (o subcomponentes): volver a `/kids`, avatar grande + nombre + "N años · Sala X" + botón Editar, banner de alergia condicional, ficha (fecha de nacimiento, sala, ingreso) y columna derecha (botón "Resumen del día" + tarjeta "Padres vinculados" con padres y "Vincular otro padre"). Verificación: render con Mateo (con alergia y 2 padres) y con Sofía (sin alergia).
8. **Página `/kids/[id]`.** Crear `app/kids/[id]/page.tsx` async: `const { id } = await params`, `const kid = getKidById(id)`, `if (!kid) notFound()`, componer `AppShell` + `KidProfile`. Verificación: `/kids/mateo` renderiza y `/kids/zzz` muestra 404.
9. **Metadatos.** Agregar `metadata` (título) a ambas rutas. Verificación: build sin warnings.

## Acceptance criteria

- [ ] `npm run build` termina sin errores.
- [ ] `npm run lint` no reporta errores.
- [ ] `/kids` muestra exactamente 8 tarjetas en grilla de 2 columnas en desktop.
- [ ] Escribir en el buscador filtra por nombre sin distinguir mayúsculas ni acentos.
- [ ] Una búsqueda sin resultados muestra el estado vacío y no rompe el layout.
- [ ] Mateo muestra badge "MANÍ"; Tomás "LACTOSA"; Valentina "VINCULAR"; el resto chevron.
- [ ] Clic en una tarjeta navega a `/kids/[id]` con el niño correcto.
- [ ] `/kids/mateo` reproduce `references/pantallas/perfil-nino.dc.html`: volver, identidad, banner de alergia, ficha y columna derecha.
- [ ] En `/kids/[id]` sin alergias el banner no se renderiza.
- [ ] "Volver a Niños" navega a `/kids`.
- [ ] `/kids/zzz` (id inexistente) muestra la 404 sin errores.
- [ ] El Sidebar resalta "Niños" en `/kids` y `/kids/[id]`, y "Feed" en `/`.
- [ ] Los botones "Agregar niño", "Editar", "Resumen del día" y "Vincular otro padre" no navegan ni rompen la app.
- [ ] No hay scroll horizontal a 375px de ancho en ninguna ruta.
- [ ] La consola no muestra errores ni warnings de React.

## Decisions

- **Sí:** Sidebar route-aware con `next/link` + `usePathname`. Habilita resaltar el ítem activo y navegar del menú a `/kids`.
- **No:** Sidebar estático como SPEC 01. No permitiría marcar "Niños" activo sin hardcodear.
- **Sí:** badge derivado de datos (alergia > sin padres > chevron). Replica el mockup sin campos redundantes.
- **No:** campo `badge` explícito. Duplicaría información y podría desincronizarse.
- **Sí:** placeholders no-navegables (`button`/`href="#"`). No hay rutas destino en este spec.
- **No:** rutas stub para las acciones. Añadirían páginas vacías sin valor.
- **Sí:** `notFound()` para id inexistente. Comportamiento idiomático de Next App Router.
- **Sí:** `_data/kids.ts` separado de `_data/mock.ts`. No mezcla dominios y deja el Feed intacto.
- **Sí:** búsqueda solo por nombre, normalizando mayúsculas y acentos, con estado vacío.
- **No:** búsqueda por sala o por estado de padres. No lo pide el mockup.
- **Sí:** conteo de niños derivado de `kids.length`.
- **Sí:** paleta de avatar por niño en los datos.
- **Sí:** `await params` (Promise en Next 16) en la ruta dinámica.
- **Sí:** modificar `NavItem` en `_data/mock.ts` (quitar `active`, agregar `href`). Es el único cambio a SPEC 01 requerido por la navegación.
- **Sí:** spec en español, código en inglés.
- **No:** dark mode, autenticación, persistencia, backend.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| `params` es Promise en Next 16 y se lee sincrónicamente por error | Tipar la page y usar `await params` (o `PageProps<"/kids/[id]">`). |
| Sidebar como client component puede desincronizar el activo | Derivar `active` solo de `usePathname`; sin estado ni aleatoriedad. |
| Fidelidad pixel-perfect de la grilla y el perfil | Usar los hex, radios, sombras y anchos (`max-w-[880px]`, `max-w-[820px]`, columna 300px) exactos del mockup. |
| Ambigüedad del indicador de tarjeta | Regla única y explícita: alergia > VINCULAR (0 padres) > chevron. |
| Búsqueda con acentos (p.ej. "Sofía") | Normalizar con `normalize("NFD")` + strip de diacríticos y `toLowerCase()`. |
| `notFound()` sin UI propia se ve fuera de tema | Aceptable por ahora; el 404 por defecto de Next es suficiente (fuera de alcance). |

## What is **not** in this spec

- Backend, API, persistencia y autenticación.
- Alta/edición de niños y vinculación de padres reales.
- Funcionalidad de "Resumen del día" y "Padres vinculados" (solo UI).
- Navegación a Avisos, Mi cuenta y "Nueva publicación".
- Las otras 14 pantallas de `references/pantallas/`.
- Dark mode y tests automatizados.

Cada uno de esos, si llega, va en su propio spec.
