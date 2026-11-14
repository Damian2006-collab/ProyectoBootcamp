---
slug: "cu-05-atender-pedidos"
title: "CU-05 · El personal atiende los pedidos"
description: "El personal ve los pedidos que llegan ya armados y cambia su estado para que el cliente lo vea."
spec_kind: use-case
status: approved
created_at: "2026-10-26T00:01:36.193Z"
last_updated: "2026-11-08T17:52:19.711Z"
---
## Actor, goal, and trigger

- **Actor principal:** personal del local, que trabaja desde el monitor del local con una cuenta compartida.
- **Actor secundario:** administrador, con cuenta propia, que puede entrar desde donde quiera.
- **Objetivo:** recibir los pedidos ya armados, sin tomarlos a mano, organizar su entrega y avisar a cada cliente en qué etapa está su pedido.
- **Disparador:** llega un pedido nuevo (CU-03), un pedido avanza en la cocina o surge un problema de seguridad en una zona.

## Preconditions and main flow

**Condiciones previas:** el monitor del local tiene iniciada la cuenta compartida del personal.

**Recorrido principal:**

1. El personal ve en el monitor la lista de pedidos activos.
2. El producto muestra cada pedido con: número, cliente y teléfono, productos con combo y extras, total (con tarifa de envío si es delivery), forma de entrega (con dirección y parroquia si es delivery), forma de pago ("pagado con tarjeta" o "paga en efectivo al retirar") y estado.
3. El personal empieza a preparar un pedido y lo marca **"en preparación"**.
4. Si es delivery, el personal elige quién lo lleva: un repartidor propio o el servicio externo.
5. Cuando está listo, lo marca **"listo para retirar"** (retiro) o **"entregado al repartidor"** (delivery).
6. En un pedido para retirar, cuando el cliente lo recoge, el personal lo marca **"retirado"**; si pasan unas 3 horas desde que está listo y nadie lo retiró, lo marca **"no retirado"**.
7. El producto actualiza el estado, el cliente lo ve al instante (CU-04) y el pedido terminado pasa al historial del día.

**Variante · bloqueo de zona:** si en un momento una zona se vuelve peligrosa, el personal la bloquea temporalmente; mientras esté bloqueada, los clientes de esa zona solo pueden elegir retiro. El personal la desbloquea cuando pasa el riesgo. No puede cambiar tarifas ni horarios.

**Variante · historial del día:** el personal consulta los pedidos terminados del día con su número, estado final y detalle.

## Alternatives, failures, and rules

- **A1 · Sin pedidos activos:** el producto indica que no hay pedidos pendientes.
- **A2 · Estado equivocado:** el producto solo ofrece el siguiente estado válido según la forma de entrega.
- **A3 · Pedido cancelado por el cliente:** si el cliente cancela mientras está "recibido", el pedido aparece como "cancelado" y sale de la lista activa.
- **Regla:** el personal no puede cancelar ni cambiar el contenido de un pedido; solo avanza su estado.
- **Regla:** no se registra qué trabajador atiende cada pedido.
- **Regla (cambia D9):** el reparto lo hacen repartidores propios o un servicio externo, y el personal lo elige en cada pedido.
- **Regla (cambia D7):** hay un administrador aparte del personal; el personal atiende pedidos y bloquea zonas en el momento, y el administrador gestiona zonas, tarifas y horarios (CU-06).
- **Regla:** con 2 pedidos "no retirados", ese cliente ya no puede pagar en efectivo (CU-03).

## Observable outcome and acceptance criteria

**Resultado observable:** cada pedido muestra el estado que le asignó el personal, el cliente lo ve y los pedidos terminados quedan en el historial del día.

**Criterios de aceptación:**

- Un pedido confirmado aparece en el monitor en estado "recibido" con su número y todo su detalle.
- El personal puede pasarlo a "en preparación" y luego al estado que corresponde a su forma de entrega.
- En un delivery, el personal elige repartidor propio o servicio externo.
- Un pedido para retirar puede terminar en "retirado" o, pasadas unas 3 horas listo, en "no retirado".
- El pedido indica claramente si ya está pagado con tarjeta o si se paga en efectivo al retirar.
- Una zona bloqueada por el personal no ofrece delivery hasta que se desbloquea.
- Un pedido terminado o cancelado sale de la lista activa y se ve en el historial del día.

## Decisions and open questions

- **Confirmado:** D2, D5, D10 (fase 1); en fase 2: cuenta compartida en el monitor y administrador aparte, reparto propio o externo elegido por el personal, bloqueo temporal de zonas, "retirado" y "no retirado", historial del día y sin registro de qué trabajador atiende.
- **Cambia respecto de la fase 1:** D7 (ahora hay administrador) y D9 (reparto ya no es solo externo).
- **Sin preguntas abiertas.**
