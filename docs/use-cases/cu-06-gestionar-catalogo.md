---
slug: "cu-06-gestionar-catalogo"
title: "CU-06 · El administrador y el personal gestionan el catálogo y las zonas"
description: "El administrador agrega hamburguesas, fija precios y define zonas de reparto por parroquias con su tarifa y horarios; el personal marca productos agotados."
spec_kind: use-case
status: approved
created_at: "2026-10-26T00:01:36.196Z"
last_updated: "2026-11-08T18:00:49.645Z"
---
## Actor, goal, and trigger

- **Actor principal:** administrador, con cuenta propia, que puede entrar desde donde quiera.
- **Actor secundario:** personal del local, desde el monitor con la cuenta compartida.
- **Objetivo:** mantener el menú y las condiciones de delivery al día: hamburguesas, combos, precios, agotados, zonas de reparto, tarifas y horarios sin delivery, para que el cliente no pida algo que no hay ni a donde no se llega.
- **Disparador:** el local agrega un producto, cambia un precio, se queda sin stock de algo o cambia sus condiciones de reparto.

## Preconditions and main flow

**Condiciones previas:** el administrador inició sesión con su cuenta, o el personal está en el monitor del local.

**Recorrido principal (el administrador agrega una hamburguesa):**

1. El administrador abre la sección de catálogo.
2. El producto muestra la lista de hamburguesas con su precio, precio de combo y estado (disponible o agotado).
3. El administrador elige "Agregar hamburguesa" e ingresa nombre, descripción, imagen, precio y precio del combo.
4. El producto comprueba que los datos obligatorios estén completos y que los precios sean válidos, y guarda la hamburguesa.
5. La hamburguesa aparece en el menú del cliente (CU-01).

**Variante · cambiar precio (administrador):** el administrador edita el precio de una hamburguesa o de su combo y el menú muestra el nuevo precio en los pedidos nuevos.

**Variante · marcar agotado (personal o administrador):** se marca una hamburguesa como agotada; el menú la muestra como "Agotado" y no permite pedirla. Cuando vuelve a haber stock, se marca como disponible. Una hamburguesa que el local deja de vender también queda como "Agotado": no se elimina ni se oculta.

**Variante · zonas de reparto (administrador):** el administrador elige las parroquias de la división oficial del INEC donde hay delivery, les asigna una tarifa de envío y puede agrupar varias parroquias con la misma tarifa. También fija los horarios en que ciertas zonas no tienen delivery por seguridad.

## Alternatives, failures, and rules

- **A1 · Datos incompletos:** si falta nombre o precio, el producto no guarda y señala el campo.
- **A2 · Precio inválido:** el precio debe ser un número mayor que cero.
- **A3 · Tarifa inválida:** una zona sin tarifa, o con tarifa que no sea un número mayor o igual a cero, no se guarda.
- **A4 · El personal intenta cambiar precios o zonas:** no tiene esa opción; solo puede marcar agotados y bloquear zonas en el momento (CU-05).
- **Regla (cambia D7):** el administrador crea productos, fija precios y gestiona zonas, tarifas y horarios; el personal solo marca agotados o disponibles.
- **Regla:** las hamburguesas no se eliminan ni se ocultan; las que no se venden aparecen como "Agotado".
- **Regla:** los extras (salsas, aros de cebolla, lechuga, carne extra) y sus precios son fijos y no se gestionan aquí.
- **Regla:** el monto mínimo de delivery es fijo, 2.50, y no se cambia aquí (CU-03).
- **Regla:** un producto agotado no se puede agregar a ningún pedido (CU-01, CU-03).
- **Regla:** un cambio de precio no afecta a los pedidos ya confirmados; solo a los nuevos.

## Observable outcome and acceptance criteria

**Resultado observable:** el menú y las condiciones de delivery que ve el cliente reflejan lo que cargó el administrador y los agotados que marcó el personal.

**Criterios de aceptación:**

- Una hamburguesa agregada por el administrador con datos completos aparece en el menú del cliente.
- Un cambio de precio se ve en el menú y se usa en los pedidos nuevos.
- Una hamburguesa marcada como agotada aparece como "Agotado" y no se puede pedir; al marcarla disponible vuelve a poder pedirse.
- No existe la opción de eliminar ni ocultar una hamburguesa.
- No se guarda un producto sin nombre o con precio inválido.
- Desde el monitor del personal no se pueden cambiar precios, zonas, tarifas ni horarios.
- Una parroquia sin delivery asignado no ofrece delivery al cliente.

## Decisions and open questions

- **Confirmado:** D7, modificada en fase 2 por la llegada del administrador; zonas por parroquias del INEC; extras fijos; mínimo fijo; sin eliminar ni ocultar productos.
- **Confirmado:** un cambio de precio solo afecta a pedidos nuevos.
- **Sin preguntas abiertas.**
