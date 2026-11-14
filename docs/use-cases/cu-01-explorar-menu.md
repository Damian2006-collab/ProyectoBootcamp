---
slug: "cu-01-explorar-menu"
title: "CU-01 · El cliente explora el menú"
description: "Una persona que llega a la página ve la imagen de entrada, entra al menú y conoce las hamburguesas, combos, extras y precios disponibles antes de decidir si pide."
spec_kind: use-case
status: approved
created_at: "2026-10-25T23:53:10.311Z"
last_updated: "2026-10-26T00:05:38.898Z"
---
## Actor, goal, and trigger

- **Actor principal:** cliente (persona que entra a la página; no necesita estar registrada para ver el menú).
- **Objetivo:** conocer qué hamburguesas, combos y extras ofrece el local, con sus precios, antes de decidir si pide.
- **Disparador:** la persona abre la página, a veces solo por curiosidad.

## Preconditions and main flow

**Condiciones previas:** el personal del local tiene cargado al menos un producto en el catálogo (CU-06).

**Recorrido principal:**

1. El cliente abre la página.
2. El producto muestra la pantalla de entrada con una imagen de hamburguesa minimalista y llamativa y un botón principal **"Ver menú"** (no "Pedir ahora", decisión D1).
3. El cliente pulsa "Ver menú".
4. El producto muestra las hamburguesas disponibles con nombre, imagen, descripción breve y precio.
5. El cliente elige una hamburguesa para ver su detalle.
6. El producto muestra el detalle: precio, opción de convertirla en combo (papas y bebida) y extras disponibles (aros de cebolla, salsas, lechuga, carne extra), cada uno con su precio.
7. El cliente vuelve al listado o decide pedir (continúa en CU-03).

## Alternatives, failures, and rules

- **A1 · Producto agotado:** si el personal marcó una hamburguesa como agotada (CU-06), el producto la sigue mostrando señalada como "Agotado" y no permite agregarla al pedido.
- **A2 · Menú vacío:** si no hay ningún producto cargado, el producto muestra un mensaje indicando que el menú no está disponible por ahora.
- **A3 · Quiere pedir sin estar registrado:** al intentar pedir, el producto le pide registrarse o iniciar sesión (CU-02).
- **Regla:** los precios mostrados son los que el personal fijó en el catálogo.
- **Exclusión:** en este caso no se arma ni se paga el pedido (eso es CU-03).

## Observable outcome and acceptance criteria

**Resultado observable:** el cliente ve el menú completo con precios y sabe qué combos y extras puede agregar.

**Criterios de aceptación:**

- La pantalla de entrada muestra la imagen de hamburguesa y el botón "Ver menú".
- Al pulsar "Ver menú" se ve cada hamburguesa disponible con nombre, imagen y precio.
- El detalle de una hamburguesa muestra la opción de combo y los extras con su precio.
- Una hamburguesa marcada como agotada aparece con la etiqueta "Agotado" y no se puede agregar al pedido.
- Si el catálogo está vacío, se ve el mensaje de menú no disponible.

## Decisions and open questions

- **Confirmado:** botón principal "Ver menú" (D1); combos y extras en la primera versión (D4); el personal marca agotados (D7).
- **Confirmado (Damián, 2026-10-25):** cualquier persona puede ver el menú sin registrarse; el registro se pide solo cuando va a pedir.
- **Pregunta abierta:** ¿un producto agotado se muestra marcado o se oculta? El borrador supone que se muestra marcado.