# Registro del proceso — Fase 1

## Comprobaciones del entorno (2026-10-25)

| Comprobación | Resultado | Límite |
|---|---|---|
| `node --version` | v22.23.4 (Node 22 portable; el Node 24 del sistema no se usa para este proyecto) | Solo confirma la versión de Node. |
| `pnpm --version` | 11.17.0 | Solo confirma la versión de pnpm. |
| `ahk --version` | 3.0.0 | Confirma la versión del CLI. |
| Plantilla Vite + React + TS | Creada con los comandos de la sección 4.2; `pnpm build` compila sin errores. | Pendiente: abrir `pnpm dev` en el navegador y verlo con mis propios ojos. |
| `ahk init` | Ejecutado por mí en mi terminal (provider claude-code, docs en `./docs`, storage local, sin notificaciones). | — |
| `ahk doctor` | Archivos del agente y skills presentes. Avisa que existe la versión 3.2.0; no actualizo porque la consigna fija 3.0.0. | No prueba decisiones del producto. |
| Skill `ahk-use-case` | Presente en `.claude/skills/ahk-use-case/` con `SKILL.md`, `resources/template.md` y `resources/workflow.md`. | — |
| MCP `specs.list` | Llamada real por stdio a `ahk serve`: responde `items: []` sin error. | Lista vacía porque todavía no hay casos de uso. |
| `ahk health` | **Falla.** AHK 3.0.0 lanza `cmd.exe` con la ruta entre comillas escapadas (`'\"...\health.bat\"' is not recognized`), así que cmd no encuentra el script. Pasa igual con y sin espacios en la ruta (probé moviendo el proyecto a `C:\Users\chzam\proyectos\`). | Ejecutando `health.bat` a mano (`cmd /c .\health.bat`) el build pasa con código 0. No modifiqué el harness para forzar el resultado. Pendiente consultar al docente. |

## Idea inicial (palabras de Damián, 2026-10-25)

> Lo que se quiere resolver es evitar que las personas se encuentren con horribles páginas web de servicios de hamburguesas, donde la interfaz no la entienden y no es llamativa, y desean comprar de mejor manera. A su vez es demasiado lento el proceso de las personas cuando desean comprar para sus casas o pedir para que le tengan preparado y solo ir a recoger, pero con WhatsApp lo ven complicado por miedo a un error humano al momento de tomar el pedido.

Observación vs. supuesto: es una percepción propia; no hay entrevistas ni datos que la respalden.

## Decisiones

### D1 — Botón principal de la pantalla de entrada (2026-10-25)

- **Pregunta:** ¿el botón principal de la entrada lleva directo a pedir o al menú?
- **Alternativas:** "Pedir ahora" (el CTA del sitio anterior pag_burguer) / "Ver menú".
- **Elección (Damián):** "Ver menú".
- **Motivo (Damián):** un cliente que llega por curiosidad quiere ver qué hay antes de pedir; si solo encuentra "Pedir ahora" se pregunta dónde está el menú y termina buscándolo en Instagram. Empujar a pedir de entrada se siente demasiado insistente.
- **Casos afectados:** el de explorar el menú y el de hacer un pedido (todavía sin crear en AHK).

### D2 — Actores del producto (2026-10-25)

- **Pregunta:** ¿la app la usa solo el cliente o también el personal del local?
- **Alternativas (propuestas por Jarvis):** solo cliente, y el local recibe el pedido ya armado sin pantalla propia / cliente + personal del local con una pantalla para ver los pedidos que llegan.
- **Elección (Damián):** cliente + personal del local.
- **Motivo:** evitar el error humano al tomar pedidos por WhatsApp; el personal recibe el pedido ya armado.
- **Casos afectados:** hacer un pedido; ver/atender pedidos entrantes (por crear en AHK).

### D3 — Forma de entrega (2026-10-25)

- **Pregunta:** ¿retiro en el local, delivery o ambos?
- **Elección (Damián):** ambos. El cliente elige delivery a su casa o retirarlo en el local.
- **Casos afectados:** hacer un pedido.

### D4 — Alcance de la primera versión (2026-10-25)

- **Elección (Damián):** entra en la primera versión, de forma sencilla, todo lo hablado: menú, personalización (combos, snacks y extras) y la pantalla del personal.
- **Pendiente:** concretar qué extras y combos exactos, y qué queda explícitamente fuera.

### D5 — Estado del pedido visible para el cliente (2026-10-25)

- **Elección (Damián):** la pantalla del personal sirve también para marcar cuándo el pedido está listo; el cliente lo ve en la página web: "listo para retirar" o "el delivery ya salió".
- **Casos afectados:** atender pedidos (personal); seguir el estado del pedido (cliente).

### D6 — Registro del cliente (2026-10-25)

- **Elección (Damián):** el registro es obligatorio para pedir; se podrá entrar con correo y contraseña o con Google/redes sociales.
- **Motivo (Damián):** identificar qué persona está pidiendo mediante su usuario, para saber quién es cada cliente, y poder detectar y analizar suplantación de identidad o pedidos de broma.

### D7 — Administración del catálogo (2026-10-25)

- **Elección (Damián):** el sistema permite añadir hamburguesas con sus combos y fijar sus precios.
- **Quién lo hace (Damián):** el mismo personal del local que atiende los pedidos; no hay un administrador aparte. Alternativa descartada: un administrador separado (p. ej. el dueño). Motivo: es la opción más simple, con un solo tipo de usuario del local.
- **Casos afectados:** gestionar el catálogo (por crear en AHK).
- **Ampliación (Damián):** el administrador también puede marcar una hamburguesa como agotada cuando no hay stock, para que el cliente no la pida y no haya conflictos.

### D8 — Forma de pago (2026-10-25)

- **Pregunta:** ¿pago en línea, pago al recibir/retirar, o ambos?
- **Alternativas (propuestas por Jarvis):** pago en línea dentro de la página / pago al recibir o retirar con la página mostrando solo el total (Jarvis advirtió que una pasarela real es mucho trabajo y suele quedar como mejora futura).
- **Elección (Damián):** delivery → pago en línea obligatorio; retiro en el local → el cliente elige pagar en línea o en físico al retirar.
- **Real o simulado (Damián):** en la primera versión el pago en línea es una simulación; no cobra de verdad. El pago real queda como mejora futura.
- **Casos afectados:** hacer un pedido.

### D9 — Quién reparte el delivery (2026-10-25)

- **Primera respuesta (Damián):** lo reparte personal del local, a quien se le paga.
- **Corrección (Damián, mismo día):** el reparto lo hace un servicio externo de delivery.
- **Interacción con la app (Damián):** el local coordina el servicio externo por fuera de la app; el servicio de delivery no es un actor del sistema. Alternativa descartada: que la página avise directamente al servicio. Motivo: es mucho más simple.
- **Casos afectados:** hacer un pedido (delivery); atender pedidos; estado del pedido.

### D10 — Estados del pedido (2026-10-25)

- **Propuesta (Jarvis):** recibido → en preparación → "listo para retirar" (retiro) o "entregado al repartidor" (delivery). Se mencionaron como posibles extras "cancelado" y "entregado".
- **Elección (Damián):** acepta las etapas propuestas, sin agregar "cancelado" ni "entregado".
- **Casos afectados:** atender pedidos (personal); seguir el estado del pedido (cliente).

### D11 — Separación de casos de uso (2026-10-25)

- **Propuesta (Jarvis):** 1) cliente explora el menú; 2) cliente se registra o inicia sesión; 3) cliente arma su pedido (combos y extras), elige delivery o retiro y paga (simulado); 4) cliente sigue el estado de su pedido; 5) personal atiende pedidos y cambia su estado; 6) personal gestiona el catálogo (hamburguesas, precios, agotados).
- **Elección (Damián):** acepta la separación tal cual.
- **Siguiente paso:** crear cada caso como borrador en AHK y aprobarlo uno por uno.

### D11 — Separación de casos de uso (2026-10-25)

- **Propuesta (Jarvis):** 1) cliente explora el menú; 2) cliente se registra o inicia sesión; 3) cliente arma su pedido (combos/extras, delivery o retiro, pago simulado); 4) cliente sigue el estado de su pedido; 5) personal atiende pedidos y cambia su estado; 6) personal gestiona el catálogo (hamburguesas, precios, agotados).
- **Elección (Damián):** acepta la separación tal cual. Cada caso se aprobará por separado cuando esté redactado en AHK.

## Aprobaciones de casos de uso

- 2026-10-25 · Damián revisó y aprobó `cu-01-explorar-menu` y `cu-02-registro-inicio-sesion` (versión borrador del 2026-10-25). Transición a `approved` hecha con AHK y validada.
- 2026-10-25 · Damián leyó y aprobó `cu-03-hacer-pedido`, `cu-04-seguir-estado-pedido`, `cu-05-atender-pedidos` y `cu-06-gestionar-catalogo` (versión borrador del 2026-10-25). Transición a `approved` con AHK y validada. Sus preguntas abiertas siguen declaradas como pendientes.

## Ideas de Damián pendientes de ubicar

- Pantalla de entrada: al abrir, el cliente ve una imagen de hamburguesa minimalista y llamativa, que provoque un "guau". (Corresponde a la sección 6, pantallas previstas; el estilo visual se define en fases posteriores.)
- Personalizar la hamburguesa al pedirla: convertirla en combo (con papas y bebida), sumar snacks como aros de cebolla, y agregar extras como salsas, lechuga o carne. Pendiente decidir qué entra en la primera versión.

---

# Registro del proceso — Fase 2

## Comprobaciones del entorno (2026-11-05)

| Comprobación | Resultado | Límite |
|---|---|---|
| `ahk --version` | 3.0.0 | Confirma la versión del CLI. |
| `ahk doctor` | Skills del harness presentes y al día. Avisa que existe 3.7.0; no actualizo porque la consigna fija 3.0.0. | No prueba decisiones del producto. |
| `ahk health` | **Pasa** (código 0, ejecuta `pnpm build` real vía `health.bat`). Para lograrlo se parcheó el AHK 3.0.0 instalado: en `dist/cli.js` y `dist/chunk-RXYGE27F.js` se añadió `windowsVerbatimArguments` al lanzar `cmd.exe`, porque Node escapaba las comillas como `\"` y cmd no encontraba el script. Originales guardados como `.orig`. | El parche modifica la herramienta del curso; pendiente informar al docente. Reinstalar AHK lo deshace. El build no prueba reglas del negocio. |
| Skill `ahk-spec` | Presente en `.claude/skills/ahk-spec/` con `SKILL.md`, `resources/workflow.md` y `resources/template.md`; leídos. | — |
| MCP `specs.list` | Llamada real por stdio a `ahk serve`: responde los seis casos de uso. | — |
| Estado de casos fuente | CU-01 a CU-06 en `approved` según AHK; ninguna especificación funcional todavía. | Las preguntas abiertas de los casos siguen pendientes. |
| Retroalimentación docente de la fase 1 | Sin registrar. | Pendiente que Damián confirme si la recibió. |
| MCP (sesión de voz, 2026-11-05) | Repetida la llamada real por stdio a `ahk serve`: `tools/list` y `specs.list` responden; CU-01 a CU-06 en `approved`, sin especificaciones. | — |

## Recorrido del pedido explicado por Damián (2026-11-05)

> El cliente entra a la página y navega libre: ve cómo es el restaurante, los contactos, los testimonios y de qué trata. Luego entra al catálogo del menú y elige sus pedidos. Cuando ya quiere comprar, inicia sesión. Después elige delivery o retiro en el local.

## Decisiones de la fase 2

### F2-D1 — Momento del inicio de sesión (2026-11-05)

- **Pregunta:** ¿cuándo se le pide al cliente que inicie sesión?
- **Alternativas (propuestas por Jarvis):** al confirmar el pedido / al entrar al carrito / login con opción de invitado al inicio (obligaba a reabrir CU-01 y CU-02).
- **Elección (Damián):** al entrar al carrito. Navega libre y, cuando quiere comprar, se le pide iniciar sesión.
- **Casos afectados:** CU-02, CU-03. Pendiente comprobar si el texto aprobado de CU-03 coincide; si no, revisarlo con ahk-use-case.

### F2-D2 — Formas de pago según la entrega (2026-11-05)

- **Elección (Damián, con su propia corrección):** delivery → solo cobro con tarjeta (el cliente ingresa su tarjeta y se le cobra). Retiro en el local → efectivo o cobro con tarjeta en el local.
- **Antes (fase 1, D8):** delivery con pago en línea obligatorio; retiro en línea o en físico; pago en línea simulado.
- **Pendiente:** confirmar si el cobro con tarjeta sigue siendo simulado en la primera versión.
- **Casos afectados:** CU-03.

### F2-D3 — Reparto y tarifa de envío (2026-11-05)

- **Pregunta:** ¿cómo se cobra el envío de un delivery?
- **Alternativas (propuestas por Jarvis):** tarifa por zonas / tarifa fija / envío fuera de la app / cálculo por distancia exacta (requiere mapas y ubicación).
- **Recorrido:** Damián eligió primero distancia exacta; luego dijo no tener claro cómo funcionan los servicios externos (PedidosYa, Uber Eats) y pidió la recomendación de Jarvis.
- **Elección (Damián):** mantener el reparto con un servicio externo, como en la fase 1 (D9).
- **Elección (Damián, 2026-11-08):** tarifa por zonas: el monto del envío depende de la zona o barrio de la dirección y se suma al total del pedido, que se paga con tarjeta. Alternativas descartadas: tarifa fija, envío gratis, cobro aparte por el repartidor.
- **Elección (Damián, 2026-11-08, siguiendo la recomendación de Jarvis):** si la dirección está fuera de todas las zonas, no se permite delivery; el producto avisa que no llega a esa dirección y ofrece retirar en el local. Alternativas descartadas: cobrar la tarifa máxima, o que el local decida caso por caso.
- **Regla nueva (Damián, 2026-11-08):** por seguridad de los trabajadores, ciertas zonas no tienen delivery en ciertos horarios por ser peligrosas; en ese caso el producto avisa y solo ofrece retirar en el local.
- **Elección (Damián, 2026-11-08, siguiendo la recomendación de Jarvis):** el administrador define las zonas, sus montos y los horarios fijos sin delivery; el personal solo puede bloquear una zona temporalmente ante una situación del momento, sin cambiar montos ni horarios. Se agrega el actor administrador: afecta a CU-06 (revisar con ahk-use-case). Alternativas descartadas: solo el personal, solo el administrador.
- **Elección (Damián, 2026-11-08):** el reparto lo hacen repartidores propios y también un servicio externo; el personal elige en cada pedido quién lo lleva. Cambia D9 de la fase 1 (solo servicio externo). Alternativas descartadas: solo propios, solo externo.
- **Elección (Damián, 2026-11-08):** en un pedido para retirar no se asigna repartidor; cuando está listo, la app avisa al cliente que puede ir a retirarlo (afecta a CU-04 y CU-05). Damián confirmó de nuevo que al retirar se paga con efectivo o tarjeta.
- **Elección (Damián, 2026-11-08):** el cliente puede cancelar un pedido confirmado solo mientras esté en estado "recibido"; cuando el local empieza a prepararlo ya no puede. Agrega el estado "cancelado" (no estaba en D10). Alternativas descartadas: nunca desde la app, siempre antes de la entrega. Afecta a CU-03, CU-04 y CU-05.
- **Elección (Damián, 2026-11-08):** si se cancela un pedido pagado con tarjeta, se devuelve el total a la tarjeta de forma automática (en modo de prueba, sin dinero real). Alternativas descartadas: devolución aprobada por el personal, saldo a favor. Afecta a CU-03.
- **Elección (Damián, 2026-11-08):** la confirmación muestra un número de pedido visible, que el cliente y el personal usan para identificarlo al retirar o entregar. Alternativa descartada: identificar solo por el nombre. Afecta a CU-03, CU-04 y CU-05.
- **2026-11-08:** con esto quedan resueltas las preguntas abiertas de CU-03; se revisa con ahk-use-case.
- **Elección (Damián, 2026-11-08, al revisar CU-03):** hay un monto mínimo para delivery, lo fija el administrador y el valor inicial es 2.50 (moneda sin precisar). Por debajo de ese monto solo se ofrece retiro. Alternativa descartada: sin mínimo.
- **Elección (Damián, 2026-11-08, al revisar CU-03):** si un pedido para retirar con pago en efectivo no se retira, pasado un tiempo el personal lo marca "no retirado"; tras varias veces, ese cliente ya no puede elegir efectivo. Agrega el estado "no retirado". Alternativas descartadas: solo marcarlo sin consecuencias, bloqueo a la primera. Límite (Damián): a los 2 pedidos no retirados se bloquea el efectivo para ese cliente. Plazo (Damián): eligió primero "al cierre del local" y luego lo precisó: una espera de unas 3 horas desde que el pedido está listo; pasado ese plazo se marca "no retirado". Alternativas descartadas: una hora, treinta minutos. Afecta a CU-03, CU-04 y CU-05.
- **Casos afectados:** CU-03, CU-05.

### F2-D4 — Agrupación de especificaciones funcionales (2026-11-05)

- **Alternativas (propuestas por Jarvis):** tres especificaciones / dos (cliente y personal) / una por caso de uso.
- **Elección (Damián):** tres: navegación y cuenta (CU-01, CU-02), pedido y seguimiento (CU-03, CU-04), operación del local (CU-05, CU-06).
- **Orden:** se empieza por navegación y cuenta.

### F2-D5 — Producto agotado en el menú (2026-11-05)

- **Pregunta (abierta en CU-01):** ¿un producto agotado se muestra marcado o se oculta?
- **Elección (Damián):** se muestra con la etiqueta "Agotado" y no se puede agregar. Coincide con lo que suponía CU-01, así que el caso no cambia.
- **Casos afectados:** CU-01, CU-06.

### F2-D6 — Cobro con tarjeta (2026-11-05)

- **Elección (Damián):** el cobro con tarjeta es una pasarela directa: el cliente ingresa su tarjeta y se le debita.
- **Antes (fase 1, D8):** pago en línea simulado, sin cobro real.
- **Pendiente:** confirmar si en la primera versión el débito es real o sigue simulado; si es real, cambia el alcance de CU-03 y hay que revisarlo con ahk-use-case.
- **Elección por modalidad (Damián, 2026-11-08):** a domicilio solo se paga con tarjeta en la app; para recoger en el local se puede pagar con tarjeta en la app o en efectivo al llegar al local.
- **Elección (Damián, 2026-11-08):** el cobro con tarjeta es real en modo de prueba: pasa por un proveedor de pagos con aprobaciones y rechazos, pero sin mover dinero. Alternativas descartadas: simulado sin proveedor, o cobro con dinero real.
- **Casos afectados:** CU-03 (hay que revisarlo con ahk-use-case).

### F2-D7 — Dirección de entrega (2026-11-05)

- **Pregunta:** ¿se usa la dirección guardada en la cuenta o se escribe una nueva?
- **Elección (Damián):** el cliente puede cambiar la dirección al final del pedido. **Motivo (Damián):** el cliente puede movilizarse y la ruta cambia.
- **Casos afectados:** CU-03 (delivery).

### F2-D8 — Datos del registro (2026-11-05)

- **Pregunta (abierta en CU-02):** ¿qué datos se piden además de nombre, correo y contraseña?
- **Alternativas (propuestas por Jarvis):** agregar teléfono / teléfono y dirección por defecto / nada más.
- **Elección (Damián):** agregar teléfono obligatorio, para que el local o el repartidor puedan contactar al cliente. La dirección no se guarda en la cuenta; se da en cada pedido (F2-D7).
- **Casos afectados:** CU-02 (cambia su recorrido: hay que revisarlo con ahk-use-case), CU-03.

### F2-D9 — Acceso con cuentas externas (2026-11-05)

- **Pregunta (abierta en CU-02):** ¿qué redes además de Google?
- **Alternativas (propuestas por Jarvis):** solo Google / Google y Facebook / ninguna externa.
- **Elección (Damián):** solo Google, además de correo y contraseña.
- **Casos afectados:** CU-02 (precisa "Google/redes sociales" → "Google").
- **Confirmado de nuevo (Damián):** el menú se ve sin cuenta y la sesión es obligatoria para pedir (coincide con D6 y F2-D1).

### F2-D10 — Contraseña olvidada (2026-11-05)

- **Pregunta (abierta en CU-02):** ¿hay recuperación de contraseña?
- **Alternativas (propuestas por Jarvis):** recuperar por correo / dejarlo como mejora futura.
- **Elección (Damián):** recuperar por correo: pide un enlace a su correo y crea una contraseña nueva.
- **Casos afectados:** CU-02 (agrega una variante).

## Dónde quedamos (2026-11-05, pausa pedida por Damián)

- Preguntas de navegación y cuenta (CU-01, CU-02) resueltas: F2-D1, D5, D8, D9, D10.
- **2026-11-08:** Damián confirmó los cuatro cambios; CU-02 revisado mediante AHK (specs.update_content), validado y en estado needs-decision a la espera de su reaprobación. Se añadió que, si se entra con Google sin teléfono, se pide antes de continuar (deriva de F2-D8; pendiente de que Damián lo confirme al reaprobar).
- **2026-11-08:** Damián confirmó el detalle del teléfono al entrar con Google y reaprobó CU-02 (specs.transition a approved).
- **2026-11-08:** borrador de la especificación "Navegación y cuenta" creado mediante AHK (spec-navegacion-y-cuenta, estado draft, vinculado a CU-01 y CU-02), validado sin errores.
- **2026-11-08:** Damián aprobó la especificación "Navegación y cuenta" (specs.transition a approved).
- **Siguiente paso:** especificación del pedido (CU-03, CU-04), empezando por F2-D6 (cobro real o simulado).
- **Pendientes para la especificación del pedido (CU-03, CU-04):** si el cobro con tarjeta es real o simulado (F2-D6), cómo se muestra o cobra la tarifa de envío (F2-D3), y si el login sale "al entrar al carrito" o "al confirmar" (en un turno Jarvis dijo "al confirmar"; vale F2-D1 hasta que Damián diga otra cosa).
- Luego: especificación de operación del local (CU-05, CU-06), sección 9 escrita por Damián, y `docs/entregas/fase-02.md`.

### Nota de la sesión (2026-11-05)

- Jarvis se desvió proponiendo lógica de backend y rutas de API; está fuera del alcance de la fase 2 y no se hizo nada de eso.

- **2026-11-08:** Damián aprobó CU-03 revisado (specs.transition a approved), con zonas, horarios, mínimo de delivery, cobro en modo de prueba, cancelación, devolución, número de pedido y pedidos no retirados. Siguiente: revisar CU-04.
- **Elección (Damián, 2026-11-08, al revisar CU-04):** el estado del pedido se actualiza solo en la pantalla del cliente y llega un aviso en los cambios importantes (por ejemplo, listo para retirar). Alternativa descartada: que el cliente vuelva a consultar.
- **Elección (Damián, 2026-11-08, al revisar CU-04):** el cliente ve el historial completo de sus pedidos (número, fecha, detalle y estado final). Alternativa descartada: solo el pedido actual. CU-04 revisado mediante AHK; Jarvis añadió el estado "retirado" como contraparte de "no retirado", pendiente de que Damián lo confirme al aprobar.
- **2026-11-08:** Damián aprobó CU-04 revisado, con el estado "retirado" incluido (specs.transition a approved). Siguiente: revisar CU-05.
- **Elección (Damián, 2026-11-08, al revisar CU-05):** en el local hay un monitor con una cuenta compartida del local, por la que trabaja el personal; el administrador tiene su propia cuenta y puede entrar desde donde quiera. Alternativa descartada: una cuenta por trabajador. Cambia D7 (ya no es "no hay administrador aparte"). Afecta a CU-05 y CU-06.
- **Elección (Damián, 2026-11-08, al revisar CU-05):** no se registra qué trabajador atiende cada pedido; la cuenta compartida del monitor basta. Alternativa descartada: que el personal elija su nombre al atender.
- **Elección (Damián, 2026-11-08, al revisar CU-05):** un pedido terminado sale de la lista activa del personal y pasa a un historial del día que se puede consultar. Alternativas descartadas: que desaparezca, que quede en la lista.
- **Cambio (Damián, 2026-11-08, al revisar CU-06):** el monto mínimo de delivery queda fijo en 2.50 y el administrador no lo cambia. Contradice lo aprobado en CU-03 ("lo fija el administrador"): hay que corregir CU-03 y reaprobarlo.
- **Elección (Damián, 2026-11-08, siguiendo la recomendación de Jarvis):** las zonas de reparto se basan en las parroquias de la división oficial del INEC; el administrador marca las parroquias con delivery, les pone tarifa y puede agrupar varias con el mismo precio. Alternativas descartadas: zonas con nombre libre, anillos por distancia. Afecta a CU-03 y CU-06.
- **2026-11-08:** CU-05 revisado mediante AHK con las decisiones de esta sesión; CU-03 corregido (mínimo fijo de 2.50, zonas por parroquias).
- **2026-11-08:** Damián aprobó CU-03 corregido y CU-05 revisado (specs.transition a approved). Siguiente: preguntas abiertas de CU-06.
- **Elección (Damián, 2026-11-08, al revisar CU-06):** el administrador crea productos y fija precios; el personal solo marca productos agotados o disponibles. Alternativas descartadas: solo el administrador, solo el personal.
- **Elección (Damián, 2026-11-08, al revisar CU-06):** los extras (salsas, aros de cebolla, lechuga, carne extra) y sus precios son fijos, definidos de antemano, y no se gestionan desde el catálogo. Alternativa descartada: gestionarlos como las hamburguesas.
- **Elección (Damián, 2026-11-08, al revisar CU-06):** las hamburguesas no se eliminan ni se ocultan; si no se venden, aparecen como "Agotado". Damián eligió primero ocultarlas y lo corrigió en el turno siguiente. Alternativas descartadas: eliminarlas, ocultarlas. Con esto Damián da por cerradas las dudas de CU-06.
- **2026-11-08:** CU-06 revisado mediante AHK con las decisiones de esta sesión; queda como supuesto que un cambio de precio no afecta a pedidos ya confirmados.
- **Elección (Damián, 2026-11-08, al revisar CU-06):** un cambio de precio no afecta a pedidos ya confirmados; solo a los nuevos. Alternativa descartada: actualizar los confirmados.
- **2026-11-08:** borrador de la especificación "Pedido y seguimiento" creado mediante AHK (spec-pedido-y-seguimiento, vinculado a CU-03 y CU-04), validado. Los montos de sus ejemplos CA-01 y CA-02 son ilustrativos, salvo el mínimo de 2.50.
- **2026-11-08:** Damián aprobó CU-06 revisado y la especificación "Pedido y seguimiento". Borrador de la especificación "Operación del local" creado mediante AHK (spec-operacion-del-local, vinculado a CU-05 y CU-06), validado.
- **2026-11-08:** Damián aprobó la especificación "Operación del local". Las tres especificaciones y los seis casos están aprobados. Siguiente: sección 9 escrita por Damián, luego docs/entregas/fase-02.md.

### Sección 9 · respuestas de Damián (2026-11-08, transcritas tal cual)

- **Regla elegida:** zonas sin delivery en ciertos horarios.
- **Por qué (Damián):** "Porque estas son peligrosas y no queremos tampoco arriesgar el bienestar de nuestros trabajadores."
- **Herramienta (Damián):** Claude, usado por voz con su asistente Jarvis, junto con AHK 3.0.0.
- **Alternativas (Damián):** "No pensé en ninguna otra opción y me convenci a que delivery a todas horas en ciertas zonas por el peligro." (Transcrito de voz; se entiende que descartó hacer delivery a todas horas en esas zonas por el peligro.)
- **Aclaración (Damián):** "Claro, en algunas zonas hasta ciertas horas."
- **Ejemplo de zona y horario (Damián):** "Las zonas del sur de Guayaquil, y las haría hasta las 17 o 18 de la tarde." Es un ejemplo para la sección 9; la hora exacta (17 o 18) no está decidida y la configuraría el administrador.
- **Hora (Damián):** se queda con las 18:30 (llegó por voz como "18:3-"): en el sur de Guayaquil hay delivery solo hasta las 18:30.
- **Ejemplos (Damián):** "Por ejemplo, un pedido para Sauces 8 a las 8 de la noche [válido], y algo que no se podría es un pedido al Guasmo Sur a las 7 u 8 [inválido: pasa de las 18:30 en el sur]."
- **Qué cambió desde la fase 1 (Damián):** "La forma en cómo se dará el proceso de pago y el manejo de parte del administrador junto al personal, como también establecer una tarifa fija para los pedidos." (Jarvis señaló que la tarifa de envío es por zonas; lo fijo es el mínimo de 2.50. Pendiente que Damián lo aclare.)

- **2026-11-08:** Jarvis preparó docs/entregas/fase-02.md con los 20 apartados, a partir de los 9 documentos aprobados en AHK, fase-01.md y este registro. Comprobaciones del día: node 22.23.4, pnpm 11.17.0, ahk 3.0.0, ahk doctor correcto, ahk health con build real y código 0, specs.list y specs.validate correctos en los 9. Pendientes para Damián: cohorte, aclarar "tarifa fija" en la sección 9, escribir "qué sigo sin validar", moneda, revisar el documento y exportarlo a PDF.

## Fase 3 · Diseño técnico

- **2026-11-10:** comprobación del entorno antes de empezar: node v22.23.4, pnpm 11.17.0, ahk 3.0.0, `ahk doctor` con archivos del agente y skills presentes (solo avisa que existe la 3.7.0; no se actualiza), `ahk health` con build real correcto. Llamada real al MCP `specs.list`: 6 casos de uso y 3 especificaciones funcionales, todos en estado approved. La skill `ahk-spec-tech` está en `.claude/skills/ahk-spec-tech/`.
- **Base existente (2026-11-10):** plantilla Vite + React 19.2.8 + TypeScript; solo `react` y `react-dom` instalados. Router, TanStack Query, Zustand, Zod y Mantine son dependencias propuestas, no instaladas.
- **Bloqueo:** Context7 no está configurado en este proyecto. Las decisiones que dependen de la API de una librería quedan detenidas hasta recuperarlo.
- **Pendiente:** saber si hay retroalimentación docente de las fases 1 y 2; si no la hay, se declara así.
- **2026-11-10:** para el paso 1 se usa el recorrido que Damián ya explicó con sus palabras el 2026-11-05 (sección «Recorrido del pedido explicado por Damián»); Damián indicó que ya estaba hecho.

### F3-D1 — Fuente de los datos remotos (2026-11-10)

- **Pregunta:** ¿de dónde salen los datos remotos (menú, pedidos y su estado) que administrará TanStack Query?
- **Alternativas (propuestas por Jarvis):** Supabase / backend del docente / declarar que aún no hay servicio y dejar Query bloqueado.
- **Elección (Damián):** Supabase. Jarvis lo recomendó porque Damián ya lo usó en el hackatón (BusTrack), es gratis y trae el acceso con Google que pide CU-02.
- **Pendiente:** el contrato (tablas, operaciones, reglas de acceso) aún no existe ni está verificado; es una propuesta. No hay proyecto de Supabase creado para Dami's Burguer.
- **Apartados afectados:** 21, 25, 27.
- **2026-11-10 · Context7 recuperado:** no hay MCP de Context7 en el proyecto, pero su API pública responde (`https://context7.com/api/v1/...`) y se consulta desde la terminal. Primera consulta real: Zustand, id `/pmndrs/zustand` (versiones publicadas hasta v5.0.14 en el índice; la cohorte fija 5.0.15), concepto «store tipado con `create<T>()(...)`», fuente `docs/learn/guides/beginner-typescript.md`, fecha 2026-11-10.

### F3-D2 — Estado compartido en Zustand (2026-11-10)

- **Pregunta:** ¿qué estado compartido del cliente administra Zustand?
- **Alternativas (propuestas por Jarvis):** el carrito / la entrega elegida (delivery o retiro y parroquia) / carrito y entrega en un solo store.
- **Elección (Damián):** el carrito. Jarvis lo recomendó porque se arma en el menú, se ve en el contador y se usa al confirmar, y no existe en Supabase hasta que el pedido se confirma.
- **Queda fuera de Zustand:** el menú, los pedidos y su estado (TanStack Query, F3-D1) y los valores de los formularios (Mantine Form).
- **Apartados afectados:** 21, 24.

### F3-D3 — Formulario validado con Zod y Mantine Form (2026-11-10)

- **Pregunta:** ¿qué formulario real se valida con Zod y Mantine Form?
- **Alternativas (propuestas por Jarvis):** entrega y pago al confirmar el pedido / registro de cuenta / producto del administrador.
- **Elección (Damián):** entrega y pago ("la primera"), siguiendo la recomendación de Jarvis: es el que aplica más reglas aprobadas (RN-04 dirección en delivery, RN-05 zona sin servicio, RN-06 mínimo de 2.50, RN-07 forma de pago según la entrega), mientras que el registro lo valida casi todo Supabase.
- **Apartados afectados:** 14, 21, 26.

### F3-D4 — Propósito del Modal de Mantine (2026-11-10)

- **Pregunta:** ¿para qué sirve el Modal de Mantine?
- **Alternativas (propuestas por Jarvis):** revisión del pedido antes de enviarlo / confirmar la cancelación de un pedido recibido / detalle del producto para elegir combo y extras.
- **Elección (Damián):** revisión del pedido, como recomendó Jarvis.
- **Comportamiento propuesto:** lo abre el botón «Confirmar pedido» cuando el formulario de entrega y pago es válido; muestra productos, entrega, pago y total. Cancelar lo cierra y conserva carrito y formulario. Confirmar envía el pedido; si el cobro de prueba se rechaza (RN-08), el error se muestra en el Modal y el carrito sigue intacto. Si sale bien, se vacía el carrito y se va al seguimiento del pedido.
- **Apartados afectados:** 21, 26, 27.
- **Siguiente paso:** F3-D5, qué consulta remota real administra TanStack Query.

### F3-D5 — Consulta remota en TanStack Query (2026-11-10)

- **Pregunta:** ¿qué consulta remota real administra TanStack Query?
- **Alternativas (propuestas por Jarvis):** el menú / el estado del pedido / el historial de pedidos.
- **Elección (Damián):** el menú, como recomendó Jarvis: lo ve cualquiera sin cuenta (CU-01) y trae hamburguesas, precios y el estado «Agotado» desde Supabase (F3-D1).
- **Pendiente:** la tabla y la consulta exactas de Supabase son una propuesta; no hay proyecto creado ni contrato verificado.
- **Apartados afectados:** 21, 25, 27.
- **Siguiente paso:** F3-D6.

### F3-D6 — Rutas con React Router (2026-11-10)

- **Pregunta:** ¿cómo se organizan las pantallas con React Router?
- **Alternativas (propuestas por Jarvis):** rutas del cliente con panel aparte para el local / solo rutas del cliente / una ruta por rol (/cliente, /personal, /admin).
- **Elección (Damián):** rutas con panel aparte, como recomendó Jarvis: cliente en `/`, `/menu`, `/carrito`, `/pedido/:numero` y `/mis-pedidos`; personal y administrador en `/local`.
- **Modo:** declarativo con `BrowserRouter`, sin loaders ni actions. El número de pedido se lee con `useParams`.
- **Context7:** React Router, id `/remix-run/react-router` (el índice publica hasta 7.9.4; la cohorte fija 8.3.1), conceptos «modo declarativo con BrowserRouter» (`docs/start/modes.md`) y «useParams con segmento dinámico» (`docs/start/declarative/url-values.md`), fecha 2026-11-10.
- **Pendiente:** confirmar que la API declarativa no cambió en la 8.3.1; las subrutas de `/local` (pedidos, historial del día, catálogo, zonas) son propuesta.
- **Apartados afectados:** 21, 22, 23.
- **Siguiente paso:** con las seis decisiones tomadas, redactar los borradores spec-tech mediante AHK, uno por especificación funcional aprobada (sourceSpec), y pedir la aprobación de Damián.

- **2026-11-10:** borradores spec-tech creados mediante AHK (specs.create) y validados sin errores: tech-navegacion-y-cuenta, tech-pedido-y-seguimiento y tech-operacion-del-local, cada uno con sourceSpec a su especificación funcional aprobada. Estado draft. Damián dijo de antemano que aprobaría todo; la consigna exige aprobación explícita de cada documento tras leerlo, así que siguen en draft hasta entonces.
- **Siguiente paso:** que Damián lea cada borrador, explique con sus palabras un recorrido, una decisión y una alternativa, y apruebe cada documento; después, sección 9 y docs/entregas/fase-03.md.
- **2026-11-10:** Damián leyó los tres borradores (abiertos en el Bloc de notas) y los aprobó: «Listo, aprobado los 3». specs.transition a approved en tech-navegacion-y-cuenta, tech-pedido-y-seguimiento y tech-operacion-del-local.
- **Siguiente paso:** explicación de Damián (un recorrido, una decisión y una alternativa), sección 9 escrita por él y docs/entregas/fase-03.md.

### Explicación de Damián · recorrido del pedido (2026-11-10, transcrita tal cual)

- «Lo que pasa es que el cliente una vez que agregue sus productos y todo, al momento que vaya a comprar le pida iniciar sesión, luego selecciona qué tipo de pedido si delivery o no, seleccionando el método de pago, una vez mandada la orden le va a aparecer la animación que su orden llegó, fue aceptada, está siendo preparada, ya está listo para que la venga a ver en caso que sea por recoger en local, o sino ya salió en ruta para caso de delivery.»
- **Contraste con el diseño aprobado (Jarvis):** coincide con F2-D1 (sesión al comprar), F3-D3 (entrega y pago) y los estados de RN-13. Diferencias a aclarar: «fue aceptada» no es un estado aprobado (el pedido pasa de «recibido» a «en preparación»), y la «animación» no figura en el diseño; el Modal de revisión antes de enviar no aparece en la explicación.
- **Corrección de Damián al recorrido (2026-11-10):** añade que, antes de enviar, el pedido pasa por la ventana de revisión (Modal, F3-D4).

### Explicación de Damián · una decisión y su alternativa (2026-11-10, transcrita tal cual)

- **Decisión:** F3-D2, el carrito en Zustand.
- **Por qué (Damián):** «Porque es lo más recomendable para no saturar demasiado, ya que es una data más simple y con mucho nivel de importancia, rechazando las demás.»
- **Alternativas descartadas:** guardar en Zustand la entrega elegida, o carrito y entrega juntos en un solo store (las otras dos opciones de F3-D2).
- **Aclaración (Damián, 2026-11-10):** «fue aceptada» era forma de decirlo; equivale a «recibido». No cambia ningún estado aprobado.
- **2026-11-10:** Jarvis preparó docs/entregas/fase-03.md con los 30 apartados (1-20 de la fase 2 actualizados, 21-30 nuevos). Pendiente: que Damián lo revise completo y lo exporte a PDF.

## Fase 4 · Primera pantalla funcionando

- **2026-11-13 · Consigna (Damián):** una pantalla con catálogo y formulario, y un cuadro para revisar el pedido antes de enviarlo. Tres hamburguesas de precio fijo (Clásica $5, Queso $6, Doble $7), un solo tipo por pedido, nombre de al menos dos caracteres, cantidad entera de 1 a 5, total = precio × cantidad, resumen con producto, cantidad, total, nombre y «Retiro en el local»; Volver conserva los datos y Confirmar muestra «Pedido recibido en esta demostración». Fuera: delivery, pagos, cuentas y pantalla del personal.
- **Comprobaciones:** node v22.23.4, ahk 3.0.0. Tarea AHK 1 «pedido-hamburguesa-revision» creada con 8 criterios, reclamada con health correcto y cerrada como done con health final correcto.
- **Stack usado (del diseño aprobado):** @mantine/core, @mantine/hooks y @mantine/form 9.4.1, zod 4.4.3 (`zod/v4`), zustand 5.0.15, versiones exactas. Context7 `/mantinedev/mantine` (2026-11-13): en la 9.x `schemaResolver` viene en `@mantine/form` y reemplaza a `zodResolver`. React Router, TanStack Query y Supabase no se usan todavía: es una sola pantalla sin datos remotos.
- **Cómo quedó:** formulario validado con Zod y Mantine Form (F3-D3) y Modal de revisión (F3-D4) en `src/pedido/PantallaPedido.tsx`. Los pedidos confirmados quedan en un store de Zustand en memoria y se listan en «Pedidos recibidos en esta sesión»; se pierden al recargar. La cantidad no se corrige sola al salir del campo: un 0 queda escrito y bloquea la revisión con «La cantidad mínima es 1».
- **Verificación:** `pnpm build` y `pnpm lint` sin errores. Recorrido real en Edge (playwright-core, guion en C:\Users\chzam\tools\pw\demo-pedido.mjs): 30 de 30 comprobaciones correctas, entre ellas dos Clásicas para Ana con total $10, nombre vacío y cantidad 0 bloqueados con su error, y Volver conservando Clásica, Ana y 2. Capturas en `docs/entregas/capturas-fase-04/`.
- **Pendiente:** que Damián lo pruebe él mismo con `pnpm dev` y decida si hace falta un documento de entrega de la fase 4.
- **2026-11-13 · Estilo de la página anterior:** a pedido de Damián, la pantalla en React toma el estilo de pag_burguer (logo «Dami's Burguer» en rojo y naranja, fuente Nunito, fondo crema, rojo #c0392b como color principal de Mantine, botón con degradado y tarjetas del menú con foto, descripción y precio en USD). Se mantienen los nombres y precios de la consigna (Clásica $5, Queso $6, Doble $7). Recorrido en Edge repetido: 30 de 30 correctas.
- **2026-11-13 · Botón (Damián):** el botón que abre el resumen dice «Realizar pedido» en vez de «Revisar pedido». Recorrido en Edge repetido: 30 de 30 correctas.
- **2026-11-13 · Resto de la página anterior (Damián, opción «todo, sin tocar el pedido»):** se pasaron a React las páginas de pag_burguer: inicio (portada, menú destacado, nosotros, testimonios y contacto con formulario), menú completo de 12 productos solo para mirar, nosotros (historia, valores y equipo), login, registro (edad mínima 13, fuerza de contraseña, confirmación) y modo oscuro que se recuerda. Rutas con React Router 8.3.1 en modo declarativo (F3-D6): `/`, `/menu`, `/pedido`, `/nosotros`, `/login`, `/registro` y «No encontrado». Los formularios validan con Zod y Mantine Form y los mismos mensajes de antes; login y registro no crean cuentas reales. El pedido de la consigna no cambió: ahora vive en `/pedido`. El carrito de varios productos de la página anterior no se trajo porque choca con «un solo tipo por pedido». Verificación en Edge: 28 de 28 en las páginas y 30 de 30 en el pedido; build y lint sin errores.
