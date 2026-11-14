---
slug: "tech-pedido-y-seguimiento"
title: "Diseño técnico · Pedido y seguimiento"
description: "Carrito en Zustand, formulario de entrega y pago con Zod y Mantine Form, Modal de revisión y pedidos en TanStack Query."
spec_kind: spec-tech
status: approved
created_at: "2026-11-11T03:09:48.206Z"
last_updated: "2026-11-11T03:11:20.805Z"
source_spec: spec-pedido-y-seguimiento
---
## Source and current evidence

- **Fuente aprobada:** spec-pedido-y-seguimiento (CU-03, CU-04), estado approved, reglas RN-01 a RN-13 y CA-01 a CA-10.
- **Hecho:** nada de esto está implementado; la base es la plantilla Vite + React 19.2.8 + TypeScript.
- **Documentación consultada (Context7, 2026-11-10):** Zustand `/pmndrs/zustand` (store tipado con `create<T>()(...)`); React Router (useParams).

## Boundaries, contracts, and design

- **Carrito (Zustand, F3-D2):** store `useCarrito` con líneas (producto, cantidad, combo, extras), acciones agregar, quitar, cambiar cantidad y vaciar, y subtotal derivado. Consumidores: menú (agregar), contador del encabezado, pantalla `/carrito` y Modal de revisión. Motivo global: lo usan componentes de pantallas distintas y no existe en Supabase hasta confirmar.
- **Formulario de entrega y pago (F3-D3):** Mantine Form con `schemaResolver` y schema de `zod/v4`. Campos: forma de entrega, dirección y parroquia (si delivery), forma de pago. Reglas: RN-04 dirección obligatoria en delivery; RN-05 parroquia con servicio y en horario; RN-06 subtotal mínimo de 2.50 para delivery; RN-07 delivery solo con tarjeta. Válido: retiro con efectivo y 3.00 en productos. Inválidos: delivery con 2.00 («El delivery necesita al menos 2.50 en productos»), delivery con efectivo, delivery sin dirección. El error se ve bajo cada campo.
- **Modal de revisión (F3-D4):** lo abre «Confirmar pedido» si el formulario es válido; muestra productos, entrega, pago y total (RN-02). Cancelar cierra y conserva carrito y formulario. Confirmar ejecuta la mutación; si el cobro de prueba se rechaza (RN-08) el error se muestra en el Modal y el carrito queda intacto; si sale bien se vacía el carrito y se navega a `/pedido/:numero`.
- **Datos remotos (TanStack Query + Supabase, propuesta):** mutación crear pedido que al terminar invalida `["pedidos", usuario]`. Consulta `["pedido", numero]` para el seguimiento y `["pedidos", usuario]` para `/mis-pedidos`. La actualización al instante (RN-13) se propone con Supabase Realtime invalidando la consulta del pedido. Mutación cancelar solo si el estado es «recibido» (RN-10).
- **Recorrido:** agregar en el menú, store del carrito, `/carrito`, formulario validado por Zod, Modal, mutación a Supabase, número de pedido, `/pedido/:numero` con el estado en Query.

## Dependencies, rollout, risks, and validation

- **Riesgos:** el cobro de prueba necesita un proveedor no elegido; zonas y horarios vienen de Supabase y se pasan al schema al construirlo. La regla de 2 pedidos no retirados (RN-11) se valida también en el servidor.
- **Comprobaciones planificadas (no ejecutadas):** CA-01 total 13.50; CA-02 error con 2.00; CA-04 opciones de pago; CA-05 rechazo en el Modal sin vaciar el carrito; CA-06 número visible; CA-07 cancelar solo en recibido; CA-09 cambio de estado sin recargar.
- **Fases:** 1) store del carrito; 2) formulario y schema; 3) Modal; 4) mutación y seguimiento.

## Decisions and open questions

- **Decisiones:** F3-D1, F3-D2, F3-D3, F3-D4, F3-D6.
- **Abiertas:** proveedor del cobro de prueba; contrato de tablas; uso de Realtime por confirmar en documentación.
