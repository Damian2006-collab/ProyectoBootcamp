---
slug: "cu-02-registro-inicio-sesion"
title: "CU-02 · El cliente se registra o inicia sesión"
description: "El cliente crea su cuenta o se identifica con correo o con Google para poder comprar."
spec_kind: use-case
status: approved
created_at: "2026-10-26T00:01:36.179Z"
last_updated: "2026-11-08T15:34:23.713Z"
---
## Actor, goal, and trigger

- **Actor principal:** cliente.
- **Objetivo:** tener una cuenta e identificarse para poder hacer pedidos.
- **Disparador:** el cliente entra al carrito sin haber iniciado sesión (F2-D1), o entra por su cuenta a "Iniciar sesión".

## Preconditions and main flow

**Condiciones previas:** ninguna; ver el menú no requiere cuenta.

**Recorrido principal (registro con correo):**

1. El cliente entra al carrito o pulsa "Iniciar sesión" sin tener sesión activa.
2. El producto muestra las opciones: iniciar sesión con correo y contraseña, crear una cuenta, o entrar con Google.
3. El cliente elige "Crear cuenta" e ingresa su nombre, correo, teléfono y contraseña.
4. El producto comprueba que los datos estén completos, incluido el teléfono, y que el correo no esté ya registrado.
5. El producto crea la cuenta, deja al cliente con la sesión iniciada y lo devuelve a donde estaba (por ejemplo, su carrito).

**Variante · inicio de sesión:** el cliente ya tiene cuenta, ingresa correo y contraseña, el producto los comprueba e inicia la sesión.

**Variante · Google:** el cliente elige entrar con Google, autoriza el acceso en la ventana de Google y el producto inicia la sesión con esa identidad. Si la cuenta aún no tiene teléfono, el producto lo pide antes de continuar.

**Variante · contraseña olvidada (F2-D10):** el cliente pulsa "Olvidé mi contraseña" e ingresa su correo; el producto le envía un enlace a ese correo; el cliente abre el enlace, crea una contraseña nueva y puede iniciar sesión con ella.

## Alternatives, failures, and rules

- **A1 · Correo ya registrado:** el producto avisa que ese correo ya tiene cuenta y ofrece iniciar sesión.
- **A2 · Datos incompletos o inválidos:** el producto señala qué campo falta o es incorrecto (también si falta el teléfono) y no crea la cuenta.
- **A3 · Correo o contraseña incorrectos:** el producto avisa que los datos no coinciden y permite reintentar u ofrece recuperar la contraseña.
- **A4 · El cliente cancela el acceso con Google:** el producto vuelve a la pantalla de opciones sin iniciar sesión.
- **A5 · Enlace de recuperación vencido o ya usado:** el producto avisa y permite pedir un enlace nuevo.
- **Regla (D6, F2-D1):** la cuenta es obligatoria para comprar, no para ver el menú; se pide al entrar al carrito.
- **Regla (motivo D6):** la cuenta permite identificar quién pide, para detectar suplantación de identidad o pedidos de broma.
- **Regla (F2-D8):** el teléfono es obligatorio para que el local o el repartidor puedan contactar al cliente; la dirección no se guarda en la cuenta, se da en cada pedido (F2-D7).
- **Regla (F2-D9):** las únicas formas de acceso son correo y contraseña, o Google.

## Observable outcome and acceptance criteria

**Resultado observable:** el cliente queda identificado con su cuenta, con un teléfono de contacto, y puede continuar con su compra.

**Criterios de aceptación:**

- Un cliente sin sesión navega el menú libremente y, al entrar al carrito, ve las opciones de registro e inicio de sesión.
- Con nombre, correo, teléfono y contraseña válidos se crea la cuenta y la sesión queda iniciada.
- Sin teléfono no se crea la cuenta y se indica que falta.
- Un correo ya registrado no puede crear una segunda cuenta y se ofrece iniciar sesión.
- Con datos incorrectos no se inicia sesión y se muestra el motivo.
- Tras registrarse o iniciar sesión, el cliente vuelve a su carrito.
- Se puede entrar con Google como alternativa al correo; no hay otras redes sociales.
- Quien olvidó su contraseña recibe un enlace en su correo y puede crear una nueva.

## Decisions and open questions

- **Confirmado:** registro obligatorio solo para comprar (D6, CU-01); el inicio de sesión se pide al entrar al carrito (F2-D1).
- **Confirmado:** datos de registro: nombre, correo, teléfono obligatorio y contraseña; sin dirección en la cuenta (F2-D8).
- **Confirmado:** acceso solo con correo y contraseña o con Google (F2-D9).
- **Confirmado:** recuperación de contraseña por enlace al correo (F2-D10).
- **Sin preguntas abiertas.**
