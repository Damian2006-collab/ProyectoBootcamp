---
slug: "tech-navegacion-y-cuenta"
title: "Diseño técnico · Navegación y cuenta"
description: "Rutas con React Router, menú con TanStack Query y sesión con Supabase Auth."
spec_kind: spec-tech
status: approved
created_at: "2026-11-11T03:09:43.257Z"
last_updated: "2026-11-11T03:11:20.208Z"
source_spec: spec-navegacion-y-cuenta
---
## Source and current evidence

- **Fuente aprobada:** spec-navegacion-y-cuenta (CU-01, CU-02), estado approved.
- **Hecho (base existente):** plantilla Vite + React 19.2.8 + TypeScript; solo react y react-dom instalados. Nada de lo siguiente está instalado ni implementado.
- **Documentación consultada (Context7, 2026-11-10):** React Router `/remix-run/react-router` (modo declarativo con BrowserRouter, useParams). Zustand según docs/proceso.md.

## Boundaries, contracts, and design

- **Rutas (F3-D6, propuesta):** BrowserRouter en modo declarativo, sin loaders ni actions. `/` portada con la imagen de entrada; `/menu` menú público; `/ingresar` registro, inicio de sesión y recuperación; `/carrito`, `/pedido/:numero` y `/mis-pedidos` exigen sesión; `/local` para personal y administrador. Navegación con `Link` y `useNavigate`.
- **Protección de rutas (propuesta):** un componente envoltorio lee la sesión de Supabase Auth; sin sesión redirige a `/ingresar` y vuelve a la ruta pedida (F2-D1: se navega y se arma carrito sin cuenta; se pide al confirmar).
- **Menú (F3-D5):** TanStack Query, clave `["menu"]`, función que lee de Supabase productos con nombre, precio, imagen y disponibilidad. Estados de la interfaz: cargando, error (mensaje y botón reintentar), vacío y con datos. Un producto agotado se muestra como «Agotado» sin botón de agregar (RN-12). No se copia a Zustand.
- **Carrito desde el menú (F3-D2):** el botón agregar llama a la acción del store del carrito; el contador del encabezado lee el mismo store.
- **Cuenta (Supabase Auth, F3-D1):** correo y contraseña, Google, recuperación por correo. Si entra con Google sin teléfono, se pide antes de continuar (CU-02).
- **Componentes Mantine:** AppShell, Card, Button, Badge «Agotado», TextInput, PasswordInput.

## Dependencies, rollout, risks, and validation

- **Dependencias propuestas (no instaladas):** react-router 8.3.1, @tanstack/react-query 5.102.8, zustand 5.0.15, @mantine/core y @mantine/form 9.4.1, @supabase/supabase-js (versión pendiente).
- **Riesgos:** el índice de Context7 publica React Router hasta 7.9.4 y la cohorte usa 8.3.1; hay que confirmar la API. No existe proyecto de Supabase ni tabla de productos.
- **Comprobaciones planificadas (no ejecutadas):** abrir `/menu` sin cuenta y ver productos; simular error de red y ver reintentar; ver «Agotado» sin botón; entrar a `/carrito` sin sesión y ser enviado a `/ingresar`; `/pedido/123` muestra el pedido 123.
- **Fases:** 1) rutas y layout; 2) menú con Query; 3) sesión y protección.

## Decisions and open questions

- **Decisiones:** F3-D1 Supabase, F3-D2 carrito en Zustand, F3-D5 menú en Query, F3-D6 rutas.
- **Abiertas:** versión de supabase-js; subrutas de `/local`; nombres de tablas.
