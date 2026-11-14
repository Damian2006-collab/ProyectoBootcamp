---
slug: "tech-operacion-del-local"
title: "Diseño técnico · Operación del local"
description: "Panel /local con pedidos activos, catálogo y zonas sobre TanStack Query y Supabase."
spec_kind: spec-tech
status: approved
created_at: "2026-11-11T03:09:48.852Z"
last_updated: "2026-11-11T03:11:21.409Z"
source_spec: spec-operacion-del-local
---
## Source and current evidence

- **Fuente aprobada:** spec-operacion-del-local (CU-05, CU-06), estado approved.
- **Hecho:** nada implementado; base Vite + React 19.2.8 + TypeScript.

## Boundaries, contracts, and design

- **Ruta (F3-D6):** `/local`, protegida por rol. Cuenta compartida del local para el personal; cuenta propia del administrador. Subrutas propuestas: `/local/pedidos`, `/local/historial`, `/local/catalogo` y `/local/zonas` (estas dos con funciones de administrador).
- **Pedidos activos (TanStack Query):** consulta `["local", "pedidos"]` en Supabase; mutación cambiar estado que invalida esa consulta. Un pedido terminado pasa al historial del día.
- **Catálogo:** el administrador crea productos y fija precios; el personal marca agotado o disponible; las mutaciones invalidan `["menu"]`. Los productos no se eliminan ni se ocultan. Los extras son fijos y no se gestionan aquí.
- **Zonas:** el administrador marca parroquias del INEC con delivery, tarifa y horario; el personal puede bloquear una zona. Ejemplo: sur de Guayaquil con delivery hasta las 18:30.
- **Estado del cliente:** no usa Zustand; todo es dato remoto en Query.
- **Componentes Mantine:** Table, Badge de estado, Switch de agotado, Select de estado.

## Dependencies, rollout, risks, and validation

- **Riesgos:** reglas de acceso por rol en Supabase sin diseñar en detalle; cargar la lista oficial de parroquias.
- **Comprobaciones planificadas (no ejecutadas):** cambiar un pedido a «en preparación» y verlo en la pantalla del cliente; marcar agotado y ver «Agotado» en `/menu`; la cuenta del personal no puede crear productos.
- **Fases:** después del flujo del cliente: 1) pedidos activos; 2) agotados; 3) catálogo y zonas.

## Decisions and open questions

- **Decisiones:** F3-D1, F3-D5, F3-D6 y las decisiones de fase 2 sobre la cuenta compartida.
- **Abiertas:** contrato de roles en Supabase; formato de carga de parroquias.
