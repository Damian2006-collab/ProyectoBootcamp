---
slug: "cu-03-hacer-pedido"
title: "CU-03 · El cliente arma y confirma su pedido"
description: "El cliente arma su pedido con combos y extras, elige delivery (según zona) o retiro, paga con tarjeta o efectivo según la entrega y lo envía al local; puede cancelarlo mientras esté recibido."
spec_kind: use-case
status: approved
created_at: "2026-10-26T00:01:36.185Z"
last_updated: "2026-11-08T17:52:18.584Z"
---
## Actor, goal, and trigger

- **Actor principal:** cliente con sesión iniciada.
- **Objetivo:** armar su pedido con hamburguesas, combos y extras, elegir delivery o retiro, pagar y dejar el pedido enviado al local sin errores de toma de pedido.
- **Disparador:** el cliente agrega productos desde el menú (CU-01) y entra al carrito; si no tiene sesión, se le pide en ese momento (CU-02, F2-D1).

## Preconditions and main flow

**Condiciones previas:** el cliente tiene sesión iniciada (CU-02); hay al menos un producto disponible.

**Recorrido principal:**

1. Desde el detalle de una hamburguesa, el cliente elige cantidad, si la quiere en combo (papas y bebida) y los extras (aros de cebolla, salsas, lechuga, carne extra).
2. El producto la agrega al carrito y muestra el total actualizado.
3. El cliente repite con otros productos o entra al carrito.
4. El producto muestra el resumen: cada producto con su combo y extras, precios y total; permite cambiar cantidades o quitar productos.
5. El cliente elige la forma de entrega: **delivery** (ingresa la dirección) o **retiro en el local**.
6. Con delivery, el producto identifica la zona de la dirección, comprueba que tenga delivery en ese momento y suma al total la tarifa de envío de esa zona.
7. El cliente elige la forma de pago según la entrega: con delivery, solo tarjeta en la app; con retiro, tarjeta en la app o efectivo al llegar al local.
8. Si eligió tarjeta, ingresa sus datos y el proveedor de pagos aprueba o rechaza el cobro (cobro real en modo de prueba, sin dinero real).
9. El cliente confirma el pedido.
10. El producto registra el pedido en estado **"recibido"** con un **número de pedido** visible, lo hace visible al personal (CU-05) y muestra al cliente la confirmación con el número, el resumen y el acceso para seguir su estado (CU-04).

**Variante · cancelación por el cliente:** mientras el pedido siga en estado "recibido", el cliente puede cancelarlo; el pedido pasa a **"cancelado"** y, si lo pagó con tarjeta, se le devuelve el total a la tarjeta de forma automática. Cuando el local empieza a prepararlo, ya no puede cancelarlo.

## Alternatives, failures, and rules

- **A1 · Carrito vacío:** no se puede confirmar un pedido sin productos.
- **A2 · Producto agotado durante el pedido:** si el personal marca agotado un producto que estaba en el carrito, el producto avisa al cliente y no permite confirmarlo hasta quitarlo.
- **A3 · Delivery sin dirección:** no se puede continuar hasta ingresar la dirección.
- **A4 · Dirección fuera de zona:** si la dirección no está en ninguna zona, el producto avisa que no hay delivery a esa dirección y ofrece retirar en el local.
- **A5 · Zona sin delivery en ese horario o bloqueada:** si la zona tiene delivery cerrado por horario (fijado por el administrador) o bloqueado en el momento por el personal, el producto avisa y solo ofrece retirar en el local.
- **A6 · Pago rechazado:** el pedido no se confirma; el cliente puede reintentar con otra tarjeta o, si es retiro, elegir efectivo.
- **A7 · El cliente abandona el pago:** el pedido no se confirma y vuelve al carrito.
- **A8 · Retiro con efectivo:** se confirma sin paso de pago; el pedido indica "paga al retirar".
- **A9 · Intento de cancelar tarde:** si el pedido ya no está en "recibido", el producto avisa que ya no se puede cancelar.
- **A10 · Delivery bajo el mínimo:** si el total de productos no llega al monto mínimo de delivery, el producto avisa cuánto falta y solo ofrece retiro.
- **A11 · Pedido en efectivo no retirado:** si pasan unas 3 horas desde que el pedido está listo y el cliente no lo retiró, el personal lo marca "no retirado". Con 2 pedidos no retirados, ese cliente ya no puede elegir efectivo y solo paga con tarjeta.
- **Regla (D3):** se ofrecen delivery y retiro.
- **Regla (F2-D2):** delivery se paga solo con tarjeta en la app; retiro, con tarjeta en la app o efectivo en el local.
- **Regla (F2-D6):** el cobro con tarjeta es real en modo de prueba: hay aprobaciones y rechazos, pero no se mueve dinero.
- **Regla (F2-D3):** la tarifa de envío depende de la zona de la dirección y se suma al total; las zonas son parroquias de la división oficial del INEC, solas o agrupadas por el administrador.
- **Regla (F2-D3):** el administrador define zonas, tarifas y horarios sin delivery; el personal puede bloquear una zona temporalmente por seguridad.
- **Regla (F2-D3):** el reparto lo hacen repartidores propios o un servicio externo, y el personal elige en cada pedido (cambia D9); el cliente no elige repartidor.
- **Regla:** el delivery exige un monto mínimo fijo de 2.50, que no se cambia desde la app.
- **Regla:** con 2 pedidos en efectivo no retirados, el cliente pierde la opción de efectivo.
- **Regla:** el cliente solo cancela mientras el pedido esté "recibido"; la devolución con tarjeta es total y automática.

## Observable outcome and acceptance criteria

**Resultado observable:** el pedido queda enviado al local con todo su detalle y un número de pedido, y el cliente ve la confirmación.

**Criterios de aceptación:**

- El total refleja productos, cantidades, combos, extras y, con delivery, la tarifa de la zona.
- Con delivery solo se ofrece tarjeta y se exige dirección.
- Con retiro se ofrecen tarjeta en la app y efectivo en el local.
- Una dirección fuera de zona, o en una zona cerrada por horario o bloqueada, no permite delivery y se ofrece retiro.
- Un pago rechazado no confirma el pedido y permite reintentar.
- Al confirmar, el pedido aparece "recibido" para el personal con su número, y el cliente ve la confirmación con ese número.
- No se puede confirmar con el carrito vacío ni con productos agotados.
- Un pedido de delivery por debajo del mínimo no se puede confirmar como delivery y se ofrece retiro.
- Un cliente con 2 pedidos no retirados ya no ve la opción de efectivo.
- Un pedido "recibido" se puede cancelar y, si se pagó con tarjeta, se devuelve el total; uno en preparación ya no se puede cancelar.

## Decisions and open questions

- **Confirmado:** D3, D4 (fase 1); F2-D1, F2-D2, F2-D3, F2-D6 y las decisiones del 2026-11-08 sobre zonas, horarios, reparto, cancelación, devolución y número de pedido.
- **Cambia respecto de la fase 1:** el pago ya no es simulado (D8) y el reparto ya no es solo externo (D9).
- **Sin preguntas abiertas.**
