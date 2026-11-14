---
slug: "spec-navegacion-y-cuenta"
title: "Especificación · Navegación y cuenta"
description: "Cómo se recorre el menú sin cuenta y cómo el cliente se registra, inicia sesión o recupera su contraseña para comprar."
spec_kind: spec
status: approved
created_at: "2026-11-08T15:36:01.674Z"
last_updated: "2026-11-08T15:37:45.387Z"
source_use_cases:
  - cu-01-explorar-menu
  - cu-02-registro-inicio-sesion
---
## Upstream use cases and scope

- **Casos de uso de origen (aprobados):** CU-01 · El cliente explora el menú; CU-02 · El cliente se registra o inicia sesión.
- **Alcance:** cómo una persona llega a Dami's Burguer, recorre el menú sin cuenta y, cuando quiere comprar, se registra o inicia sesión. Cubre la pantalla de entrada, el listado y el detalle de hamburguesas, la señal de agotado, el registro, el inicio de sesión (correo o Google) y la recuperación de contraseña.
- **Fuera de alcance:** armar, pagar y enviar el pedido (CU-03), seguir su estado (CU-04) y la gestión del catálogo por el personal (CU-05, CU-06). Esta especificación no elige tecnología, servicios, rutas ni almacenamiento.

## Rules, exclusions, and acceptance criteria

**Reglas de navegación**

- R1 · La pantalla de entrada muestra una imagen de hamburguesa minimalista y llamativa y un botón principal "Ver menú" (D1).
- R2 · Cualquier persona puede ver el menú completo sin cuenta (D6).
- R3 · El listado muestra cada hamburguesa con nombre, imagen, descripción breve y precio; el detalle muestra la opción de combo (papas y bebida) y los extras con su precio (D4).
- R4 · Los precios mostrados son los que fijó el personal en el catálogo.
- R5 · Un producto agotado se sigue mostrando con la etiqueta "Agotado" y no se puede agregar (D7, F2-D5).
- R6 · Si no hay productos cargados, se muestra un mensaje de menú no disponible.

**Reglas de cuenta**

- R7 · La cuenta es obligatoria para comprar y se pide al entrar al carrito (D6, F2-D1). El motivo es identificar quién pide, para evitar suplantaciones y pedidos de broma.
- R8 · Para registrarse se pide nombre, correo, teléfono y contraseña; el teléfono es obligatorio. La dirección no se guarda en la cuenta, se da en cada pedido (F2-D8, F2-D7).
- R9 · Solo hay dos formas de acceso: correo y contraseña, o Google (F2-D9). Si alguien entra con Google y su cuenta no tiene teléfono, se le pide antes de continuar.
- R10 · Un correo solo puede tener una cuenta.
- R11 · La contraseña olvidada se recupera con un enlace enviado al correo, que permite crear una contraseña nueva (F2-D10). Un enlace vencido o ya usado no sirve y se puede pedir otro.
- R12 · Tras registrarse o iniciar sesión, el cliente vuelve a su carrito.

**Exclusiones**

- No hay compra como invitado.
- No hay acceso con otras redes sociales además de Google.
- No se guardan direcciones en la cuenta.

**Criterios de aceptación**

- Al abrir la página se ve la imagen de entrada y el botón "Ver menú".
- Sin cuenta se puede recorrer el listado y el detalle de cualquier hamburguesa, con combos, extras y precios.
- Un producto agotado aparece marcado "Agotado" y no se puede agregar.
- Con el catálogo vacío se ve el mensaje de menú no disponible.
- Al entrar al carrito sin sesión aparecen las opciones de registro, inicio de sesión con correo y entrada con Google.
- Sin teléfono no se crea la cuenta; con nombre, correo, teléfono y contraseña válidos, sí, y la sesión queda iniciada.
- Un correo ya registrado no crea una segunda cuenta y se ofrece iniciar sesión.
- Con correo o contraseña incorrectos no se inicia sesión, se indica el motivo y se ofrece recuperar la contraseña.
- Quien entra con Google sin teléfono registrado debe darlo antes de seguir.
- Quien pide recuperar la contraseña recibe un enlace en su correo y puede crear una nueva; un enlace vencido o usado se rechaza.
- Después de identificarse, el cliente vuelve a su carrito.

## Decisions and open questions

- **Decisiones aplicadas:** D1, D4, D6, D7 (fase 1); F2-D1, F2-D5, F2-D7, F2-D8, F2-D9, F2-D10 (fase 2).
- **Preguntas abiertas:** ninguna dentro de este alcance. Queda para la especificación del pedido si el inicio de sesión se pide al entrar al carrito o al confirmar; vale F2-D1 (al entrar al carrito) mientras Damián no diga otra cosa.
