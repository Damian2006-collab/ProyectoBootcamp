---
slug: "spec-operacion-del-local"
title: "Especificación · Operación del local"
description: "Cómo el personal atiende pedidos y bloquea zonas, y cómo el administrador gestiona catálogo, precios, zonas, tarifas y horarios."
spec_kind: spec
status: approved
created_at: "2026-11-08T18:00:51.357Z"
last_updated: "2026-11-08T18:01:38.942Z"
source_use_cases:
  - cu-05-atender-pedidos
  - cu-06-gestionar-catalogo
---
## Upstream use cases and scope

- **Casos de uso de origen (aprobados):** CU-05 · El personal atiende los pedidos; CU-06 · El administrador y el personal gestionan el catálogo y las zonas.
- **Alcance:** el trabajo del local: acceso del personal y del administrador, atención de pedidos y sus estados, elección de repartidor, bloqueo de zonas, historial del día, catálogo de hamburguesas, precios, agotados, zonas por parroquias, tarifas y horarios sin delivery.
- **Fuera de alcance:** lo que hace el cliente (especificaciones "Navegación y cuenta" y "Pedido y seguimiento"). No se elige tecnología, servicio de mapas, proveedor de reparto ni almacenamiento.

## Rules, exclusions, and acceptance criteria

**Procesos**

- PR-04 · Atender un pedido hasta su estado final (CU-05).
- PR-05 · Bloquear y desbloquear una zona en el momento (CU-05).
- PR-06 · Gestionar hamburguesas, precios y agotados (CU-06).
- PR-07 · Gestionar zonas, tarifas y horarios sin delivery (CU-06).

**Reglas del negocio**

- RN-14 · El personal trabaja desde el monitor del local con una cuenta compartida; no se registra qué trabajador atiende cada pedido.
- RN-15 · El administrador tiene cuenta propia y puede entrar desde donde quiera.
- RN-16 · Permisos: el personal avanza estados, elige repartidor, bloquea zonas en el momento y marca agotados. El administrador además crea hamburguesas, fija precios y gestiona zonas, tarifas y horarios. Nadie del local cancela ni cambia el contenido de un pedido.
- RN-17 · Solo se ofrece el siguiente estado válido según la forma de entrega: recibido → en preparación → listo para retirar → retirado o no retirado; o recibido → en preparación → entregado al repartidor.
- RN-18 · "No retirado" solo se puede marcar cuando el pedido lleva unas 3 horas listo sin retirarse.
- RN-19 · En cada delivery el personal elige repartidor propio o servicio externo.
- RN-20 · Una zona bloqueada por el personal no ofrece delivery hasta que se desbloquea; el bloqueo no cambia tarifas ni horarios.
- RN-21 · Un pedido terminado o cancelado sale de la lista activa y pasa al historial del día.
- RN-22 · Una hamburguesa necesita nombre y precio mayor que cero; las que no se venden quedan "Agotado", sin eliminarse ni ocultarse.
- RN-23 · Un cambio de precio solo afecta a pedidos nuevos.
- RN-24 · Las zonas son parroquias oficiales del INEC, solas o agrupadas, cada una con una tarifa mayor o igual a cero; una parroquia sin tarifa asignada no tiene delivery.
- RN-25 · Los extras y sus precios, y el mínimo de delivery de 2.50, son fijos y no se cambian desde la app.

**Exclusiones**

- No hay cuentas individuales por trabajador.
- No se eliminan ni ocultan productos.
- No se gestionan extras ni el monto mínimo.

**Criterios de aceptación**

- CA-11 · Un pedido confirmado aparece en el monitor como "recibido" con número, detalle, teléfono y forma de pago.
- CA-12 · Un pedido de retiro nunca ofrece "entregado al repartidor" y uno de delivery nunca ofrece "listo para retirar".
- CA-13 · Un pedido listo hace 1 hora no se puede marcar "no retirado"; uno listo hace más de 3 horas, sí.
- CA-14 · Al bloquear una zona, un cliente de esa zona solo ve retiro; al desbloquearla vuelve a ver delivery.
- CA-15 · Desde el monitor no se pueden cambiar precios, zonas, tarifas ni horarios.
- CA-16 · Una hamburguesa sin nombre o con precio 0 no se guarda.
- CA-17 · Si el precio cambia de 5.00 a 6.00, un pedido ya confirmado mantiene 5.00 y uno nuevo usa 6.00.
- CA-18 · Un pedido terminado se ve en el historial del día y no en la lista activa.

## Decisions and open questions

- **Decisiones aplicadas:** D2, D5, D10 (fase 1, D7 y D9 modificadas) y las decisiones del 2026-11-08 registradas en el proceso.
- **Ejemplos:** los montos de CA-17 son ilustrativos.
- **Preguntas abiertas:** ninguna.
