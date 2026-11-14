---
slug: "cu-04-seguir-estado-pedido"
title: "CU-04 · El cliente sigue el estado de su pedido"
description: "El cliente consulta en qué etapa está su pedido hasta que está listo para retirar o entregado al repartidor."
spec_kind: use-case
status: approved
created_at: "2026-10-26T00:01:36.189Z"
last_updated: "2026-11-08T17:29:05.147Z"
---
## Actor, goal, and trigger

- **Actor principal:** cliente con sesión iniciada.
- **Objetivo:** saber en qué etapa está su pedido para ir a retirarlo o esperar el delivery con tranquilidad, y consultar sus pedidos anteriores.
- **Disparador:** el cliente confirmó un pedido (CU-03) y quiere saber cómo va, o quiere ver su historial.

## Preconditions and main flow

**Condiciones previas:** el cliente tiene sesión iniciada y al menos un pedido confirmado.

**Recorrido principal:**

1. El cliente entra a "Mi pedido" desde la confirmación o desde su cuenta.
2. El producto muestra el pedido con su número, resumen, forma de entrega, forma de pago y estado actual.
3. Cuando el personal cambia el estado (CU-05), la pantalla se actualiza sola, sin que el cliente tenga que recargar.
4. En los cambios importantes el cliente recibe un aviso; en particular, cuando un pedido para retirar pasa a **"listo para retirar"**.
5. Según la entrega, el pedido termina en **"retirado"** (retiro) o **"entregado al repartidor"** (delivery).

**Variante · cancelar:** mientras el pedido esté en "recibido", el cliente ve la opción de cancelarlo (CU-03); al hacerlo, el estado pasa a "cancelado" y, si pagó con tarjeta, se le indica que se devolvió el total.

**Variante · historial:** el cliente entra a "Mis pedidos" y ve todos sus pedidos anteriores con número, fecha, detalle y estado final.

## Alternatives, failures, and rules

- **A1 · Sin pedidos:** si el cliente no tiene pedidos, el producto se lo indica y le ofrece ver el menú.
- **A2 · Pedido de otra persona:** un cliente solo puede ver sus propios pedidos.
- **A3 · Pedido no retirado:** si un pedido para retirar pasa unas 3 horas listo sin que lo retiren, el cliente lo ve como "no retirado" (CU-03, A11).
- **A4 · Ya no se puede cancelar:** si el pedido ya está en preparación, la opción de cancelar no aparece y, si lo intenta, se le avisa.
- **Regla (D10, ampliada en fase 2):** etapas: recibido → en preparación → "listo para retirar" → "retirado" o "no retirado" (retiro); recibido → en preparación → "entregado al repartidor" (delivery). Desde "recibido" también se puede pasar a "cancelado".
- **Regla (D5):** el estado lo cambia el personal; el cliente solo lo consulta y, mientras esté "recibido", puede cancelarlo.

## Observable outcome and acceptance criteria

**Resultado observable:** el cliente ve la etapa actual de su pedido al instante y puede consultar su historial.

**Criterios de aceptación:**

- Tras confirmar, el pedido se ve en estado "recibido" con su número.
- Cuando el personal cambia el estado, la pantalla del cliente lo muestra sin recargar.
- Al pasar a "listo para retirar", el cliente recibe un aviso.
- Un pedido de retiro nunca muestra "entregado al repartidor", y uno de delivery nunca muestra "listo para retirar".
- Solo un pedido en "recibido" muestra la opción de cancelar.
- El historial muestra todos los pedidos del cliente con número, fecha, detalle y estado final.
- Un cliente no puede ver pedidos de otra cuenta.

## Decisions and open questions

- **Confirmado:** D5, D10; en fase 2: actualización automática con avisos, historial completo, número de pedido, cancelación en "recibido" y pedidos no retirados.
- **Sin preguntas abiertas.**
