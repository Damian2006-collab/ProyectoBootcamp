---
slug: "spec-pedido-y-seguimiento"
title: "Especificación · Pedido y seguimiento"
description: "Cómo el cliente arma, paga, confirma, cancela y sigue su pedido, con zonas, tarifas, mínimo de delivery y estados."
spec_kind: spec
status: approved
created_at: "2026-11-08T17:59:04.504Z"
last_updated: "2026-11-08T18:00:50.787Z"
source_use_cases:
  - cu-03-hacer-pedido
  - cu-04-seguir-estado-pedido
---
## Upstream use cases and scope

- **Casos de uso de origen (aprobados):** CU-03 · El cliente arma y confirma su pedido; CU-04 · El cliente sigue el estado de su pedido.
- **Alcance:** desde que el cliente entra al carrito con sesión iniciada hasta que su pedido termina: armado, forma de entrega, zona y tarifa, pago, confirmación, cancelación, seguimiento con avisos e historial.
- **Fuera de alcance:** navegación y cuenta (especificación "Navegación y cuenta"), la operación interna del local y la gestión del catálogo y las zonas (CU-05, CU-06). No se elige tecnología, proveedor de pagos, servicio de mapas ni almacenamiento.

## Rules, exclusions, and acceptance criteria

**Procesos**

- PR-01 · Armar y confirmar un pedido (CU-03).
- PR-02 · Cancelar un pedido (CU-03, CU-04).
- PR-03 · Seguir un pedido y consultar el historial (CU-04).

**Reglas del negocio**

- RN-01 · Solo un cliente con sesión iniciada puede confirmar un pedido (F2-D1).
- RN-02 · El total es la suma de cada hamburguesa por su cantidad, más el combo y los extras elegidos, más la tarifa de envío de la zona si es delivery. Los precios son los vigentes al confirmar; un cambio de precio posterior no afecta al pedido.
- RN-03 · Hay dos formas de entrega: delivery y retiro en el local (D3).
- RN-04 · El delivery exige dirección; la zona es la parroquia oficial del INEC de esa dirección, y la tarifa es la que el administrador asignó a esa zona.
- RN-05 · No hay delivery si la dirección está fuera de todas las zonas, si la zona está en un horario sin delivery o si el personal la bloqueó; en esos casos solo se ofrece retiro.
- RN-06 · El delivery exige un monto mínimo fijo de 2.50 en productos; por debajo solo se ofrece retiro.
- RN-07 · Delivery se paga solo con tarjeta en la app; retiro, con tarjeta en la app o en efectivo en el local (F2-D2).
- RN-08 · El cobro con tarjeta es real en modo de prueba: puede aprobarse o rechazarse, sin mover dinero (F2-D6). Si se rechaza, el pedido no se confirma.
- RN-09 · Un pedido confirmado recibe un número visible para cliente y personal.
- RN-10 · El cliente solo puede cancelar mientras el pedido esté "recibido"; si pagó con tarjeta, se devuelve el total de forma automática.
- RN-11 · Un pedido para retirar que pasa unas 3 horas listo sin retirarse queda "no retirado"; con 2 pedidos no retirados, el cliente ya no puede pagar en efectivo.
- RN-12 · Un producto agotado no se puede agregar ni confirmar.
- RN-13 · El cliente ve el estado al instante, recibe un aviso cuando su pedido está listo para retirar y solo ve sus propios pedidos.

**Estados del pedido**

- Recibido → en preparación → listo para retirar → retirado o no retirado (retiro).
- Recibido → en preparación → entregado al repartidor (delivery).
- Recibido → cancelado (solo por el cliente).

**Exclusiones**

- No hay compra sin cuenta, ni pago en efectivo para delivery, ni cancelación una vez en preparación.
- El cliente no elige repartidor.

**Criterios de aceptación**

- CA-01 · Con dos hamburguesas de 5.00, una en combo de 2.00 más, y delivery a una zona con tarifa 1.50, el total es 13.50.
- CA-02 · Un delivery con 2.00 en productos no se puede confirmar como delivery y se ofrece retiro.
- CA-03 · Una dirección fuera de zona, en zona con horario cerrado o bloqueada, solo ofrece retiro.
- CA-04 · Con delivery solo aparece tarjeta; con retiro aparecen tarjeta y efectivo.
- CA-05 · Una tarjeta rechazada no confirma el pedido y deja reintentar.
- CA-06 · Al confirmar, el pedido queda "recibido" con número, y el cliente ve la confirmación.
- CA-07 · Un pedido "recibido" pagado con tarjeta se cancela y se devuelve el total; uno en preparación no muestra la opción de cancelar.
- CA-08 · Un cliente con 2 pedidos no retirados ya no ve la opción de efectivo.
- CA-09 · El cambio de estado se ve sin recargar y, al quedar listo para retirar, llega un aviso.
- CA-10 · El historial muestra todos los pedidos del cliente y ninguno de otra cuenta.

## Decisions and open questions

- **Decisiones aplicadas:** D3, D5, D10 (fase 1, D8 y D9 modificadas); F2-D1, F2-D2, F2-D3, F2-D6 y las decisiones del 2026-11-08 registradas en el proceso.
- **Ejemplos de CA-01 y CA-02:** los montos son ilustrativos, salvo el mínimo de 2.50.
- **Preguntas abiertas:** ninguna.
