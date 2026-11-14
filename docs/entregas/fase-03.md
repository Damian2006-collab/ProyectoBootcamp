# Dami's Burguer — Fase 3 · Diseño técnico y plan de construcción

> **Estado de este documento:** síntesis acumulativa preparada con el agente el 2026-11-10 a partir de los 6 casos de uso, las 3 especificaciones funcionales y las 3 especificaciones técnicas aprobadas en AHK, la entrega de la fase 2 y el registro de proceso. Los apartados 1 a 20 conservan la fase 2 (con la identificación, las decisiones, la sección 9 y las fuentes actualizadas); los apartados 21 a 30 son nuevos. Las versiones de las fases 1 y 2 se conservan sin cambios. **Nada de este diseño está implementado:** la aplicación sigue siendo la plantilla Vite + React + TypeScript.

## 1. Identificación del proyecto

| Campo | Valor |
|---|---|
| Producto | Dami's Burguer |
| Autor | Damián |
| Cohorte | React Guide VI (grupo no indicado) |
| Fecha | 2026-11-10 |
| Versión del documento | 0.3 |
| Entrega | **Fase 3 · Diseño técnico** |

## 2. Problema y contexto

Muchas páginas web de hamburgueserías tienen interfaces confusas y poco llamativas: el cliente no las entiende y no puede comprar de forma cómoda. Pedir es lento, tanto para recibir en casa como para dejar el pedido listo y solo pasar a recogerlo. La alternativa habitual es pedir por WhatsApp, pero los clientes la ven complicada y temen un error humano cuando el local toma el pedido.

**Quién lo vive:** clientes de una hamburguesería de Guayaquil que quieren pedir para su casa o para retirar, y el personal del local, que hoy toma los pedidos a mano.

**Hecho o supuesto:** es una percepción propia de Damián; no se hicieron entrevistas ni se recogieron datos que la respalden. En esta fase se suma una observación propia: algunas zonas del sur de Guayaquil son peligrosas a ciertas horas para quien reparte.

## 3. Usuarios y objetivos

| Actor | Objetivo |
|---|---|
| **Cliente** | Ver el menú con tranquilidad, armar su pedido con combos y extras, elegir delivery o retiro, pagar, seguir su pedido y consultar su historial. |
| **Personal del local** | Recibir los pedidos ya armados en el monitor del local, avanzar su estado, elegir quién reparte, bloquear una zona peligrosa en el momento y marcar productos agotados. |
| **Administrador** (nuevo en fase 2) | Crear hamburguesas, fijar precios y definir las zonas de reparto, sus tarifas y los horarios sin delivery. |

**Cambio respecto de la fase 1:** antes no había administrador (D7). Se incorpora porque las zonas, tarifas y precios son decisiones del negocio que no conviene dejar en el monitor compartido. El personal pierde la capacidad de crear productos y cambiar precios. El reparto ya no es solo externo: hay repartidores propios y un servicio externo, que no es actor de la app.

## 4. Descripción general de la solución

Una página web de pedidos para la hamburguesería. Al entrar, el cliente ve una imagen de hamburguesa llamativa y el botón **"Ver menú"**, y puede recorrer todo el menú sin cuenta. Cuando entra al carrito, se le pide registrarse o iniciar sesión con correo o con Google. Arma su pedido, elige delivery o retiro; si es delivery, la app reconoce la parroquia de la dirección, comprueba que haya delivery a esa hora y suma la tarifa de la zona. Paga con tarjeta (cobro real en modo de prueba) o, si retira, en efectivo en el local. Al confirmar recibe un número de pedido. El pedido aparece en el monitor del local; el personal lo prepara, elige quién lo reparte y avanza su estado, que el cliente ve al instante, con un aviso cuando está listo para retirar.

**Recorrido de ejemplo:** Ana, en Sauces 8, entra a las 20:00, ve el menú, agrega una hamburguesa en combo e inicia sesión con Google al entrar al carrito. Elige delivery; Sauces 8 tiene delivery a esa hora, así que se suma la tarifa de su zona. Paga con tarjeta y recibe su número de pedido. En el local, el personal lo marca en preparación, elige un repartidor propio y lo marca "entregado al repartidor". Ana ve cada cambio sin recargar.

## 5. Alcance inicial y exclusiones

**Comprometido para la primera versión:**

- Pantalla de entrada y menú visible sin cuenta, con combos, extras, precios y agotados (CU-01).
- Cuenta obligatoria para comprar, pedida al entrar al carrito: registro con nombre, correo, teléfono obligatorio y contraseña, acceso con Google y recuperación de contraseña por correo (CU-02).
- Pedido con combos y extras, delivery o retiro, zonas por parroquias del INEC con tarifa, horarios sin delivery, mínimo de delivery de 2.50, pago con tarjeta en modo de prueba o efectivo al retirar, número de pedido, cancelación y devolución (CU-03).
- Seguimiento en tiempo real con avisos e historial de pedidos (CU-04).
- Monitor del personal: atención de pedidos, elección de repartidor, bloqueo de zonas, pedidos no retirados e historial del día (CU-05).
- Gestión del catálogo y de las zonas por el administrador; agotados por el personal (CU-06).

**Fuera de esta versión:** cobro con dinero real (solo modo de prueba); integración automática con el servicio externo de reparto; compra sin cuenta; acceso con otras redes además de Google; direcciones guardadas en la cuenta; cuentas individuales por trabajador; eliminar u ocultar productos; gestionar extras o el monto mínimo desde la app.

**Mejoras futuras:** pasar el cobro a dinero real; avisar directamente al servicio externo de reparto.

## 6. Secciones o pantallas previstas

| Pantalla | Propósito | Quién la usa | Información | Acciones | Casos |
|---|---|---|---|---|---|
| Entrada | Llevar al menú | Cualquier visitante | Imagen de hamburguesa | "Ver menú" | CU-01 |
| Menú y detalle | Conocer la oferta | Cualquier visitante | Hamburguesas, precios, combo, extras, "Agotado" | Ver detalle, agregar al carrito | CU-01, CU-03 |
| Acceso | Identificar al cliente | Cliente | Correo y contraseña, Google, recuperación | Crear cuenta, iniciar sesión, recuperar contraseña | CU-02 |
| Carrito y confirmación | Armar, pagar y enviar | Cliente con sesión | Productos, total, tarifa de envío, entrega, pago, número | Cambiar cantidades, elegir entrega y pago, pagar, confirmar | CU-03 |
| Mi pedido y Mis pedidos | Seguir y consultar | Cliente con sesión | Número, estado, detalle, historial | Consultar, cancelar si está "recibido" | CU-04 |
| Monitor · Pedidos | Atender pedidos | Personal | Pedidos activos con detalle, teléfono, entrega, pago y estado; historial del día | Avanzar estado, elegir repartidor, bloquear zona | CU-05 |
| Monitor · Agotados | Señalar faltantes | Personal | Hamburguesas y disponibilidad | Marcar agotado o disponible | CU-06 |
| Administración | Gestionar el negocio | Administrador | Catálogo, precios, parroquias, tarifas, horarios | Agregar hamburguesa, cambiar precio, definir zonas y horarios | CU-06 |

## 7. Casos de uso de la versión inicial

### Catálogo

| Identificador AHK | Nombre | Actor | Archivo fuente | Estado en AHK |
|---|---|---|---|---|
| cu-01-explorar-menu | El cliente explora el menú | Cliente | docs/use-cases/cu-01-explorar-menu.md | Aprobado (sin cambios en fase 2) |
| cu-02-registro-inicio-sesion | El cliente se registra o inicia sesión | Cliente | docs/use-cases/cu-02-registro-inicio-sesion.md | Aprobado (revisado 2026-11-08) |
| cu-03-hacer-pedido | El cliente arma y confirma su pedido | Cliente | docs/use-cases/cu-03-hacer-pedido.md | Aprobado (revisado 2026-11-08) |
| cu-04-seguir-estado-pedido | El cliente sigue el estado de su pedido | Cliente | docs/use-cases/cu-04-seguir-estado-pedido.md | Aprobado (revisado 2026-11-08) |
| cu-05-atender-pedidos | El personal atiende los pedidos | Personal, administrador | docs/use-cases/cu-05-atender-pedidos.md | Aprobado (revisado 2026-11-08) |
| cu-06-gestionar-catalogo | El administrador y el personal gestionan el catálogo y las zonas | Administrador, personal | docs/use-cases/cu-06-gestionar-catalogo.md | Aprobado (revisado 2026-11-08) |

### CU-01 · El cliente explora el menú

1. **Actor y objetivo:** cualquier persona, sin cuenta; conocer hamburguesas, combos, extras y precios.
2. **Inicio y condiciones previas:** abre la página; hay al menos un producto cargado.
3. **Pasos:** ve la entrada y pulsa "Ver menú" → ve cada hamburguesa con nombre, imagen, descripción y precio → abre el detalle con combo y extras con precio → vuelve o agrega al carrito.
4. **Alternativas y restricciones:** un agotado se muestra "Agotado" y no se agrega (RN-05); menú vacío muestra un aviso (RN-06).
5. **Resultado:** el cliente conoce la oferta completa.
6. **Criterios:** CA-N01 a CA-N04 (sección 18).

### CU-02 · El cliente se registra o inicia sesión

1. **Actor y objetivo:** cliente; identificarse para comprar.
2. **Inicio:** entra al carrito sin sesión, o pulsa "Iniciar sesión".
3. **Pasos:** elige crear cuenta, iniciar sesión con correo o entrar con Google → al crear cuenta da nombre, correo, teléfono y contraseña → el producto comprueba los datos → queda con sesión y vuelve al carrito. Variantes: Google (si falta teléfono, se pide); contraseña olvidada por enlace al correo.
4. **Alternativas:** correo ya registrado; datos incompletos o sin teléfono; credenciales incorrectas; cancela Google; enlace vencido o usado.
5. **Resultado:** el cliente queda identificado con un teléfono de contacto.
6. **Reglas y criterios:** RN-07 a RN-12; CA-N05 a CA-N11.

### CU-03 · El cliente arma y confirma su pedido

1. **Actor y objetivo:** cliente con sesión; enviar un pedido completo y pagado al local.
2. **Inicio:** agrega productos y entra al carrito.
3. **Pasos:** elige cantidad, combo y extras → revisa el carrito → elige delivery (dirección) o retiro → con delivery se identifica la parroquia, se comprueba horario y bloqueo y se suma la tarifa → elige pago → paga con tarjeta si corresponde → confirma → el pedido queda "recibido" con número.
4. **Alternativas:** carrito vacío; agotado durante el pedido; sin dirección; fuera de zona; zona con horario cerrado o bloqueada; bajo el mínimo; pago rechazado o abandonado; efectivo al retirar; cancelación en "recibido"; cancelación tardía; pedido no retirado.
5. **Resultado:** el pedido llega al local con su número y el cliente ve la confirmación.
6. **Reglas y criterios:** RN-13 a RN-25; CA-P01 a CA-P08.

### CU-04 · El cliente sigue el estado de su pedido

1. **Actor y objetivo:** cliente con sesión; saber en qué etapa está su pedido y consultar los anteriores.
2. **Inicio:** confirmó un pedido o quiere ver su historial.
3. **Pasos:** entra a "Mi pedido" → ve número, detalle, entrega, pago y estado → la pantalla se actualiza sola → recibe aviso al quedar listo para retirar → el pedido termina en "retirado" o "entregado al repartidor". Variantes: cancelar en "recibido"; historial completo.
4. **Alternativas:** sin pedidos; pedido ajeno; pedido no retirado; ya no se puede cancelar.
5. **Resultado:** el cliente ve el estado al instante y su historial.
6. **Reglas y criterios:** RN-22, RN-24, RN-25, RN-26; CA-P06, CA-P07, CA-P09, CA-P10.

### CU-05 · El personal atiende los pedidos

1. **Actor y objetivo:** personal, desde el monitor con cuenta compartida; atender pedidos y organizar su entrega.
2. **Inicio:** llega un pedido, avanza la cocina o una zona se vuelve peligrosa.
3. **Pasos:** ve los pedidos activos → marca "en preparación" → en delivery elige repartidor propio o externo → marca "listo para retirar" o "entregado al repartidor" → en retiro marca "retirado" o, pasadas unas 3 horas, "no retirado" → el pedido pasa al historial del día. Variante: bloquear y desbloquear una zona.
4. **Alternativas:** sin pedidos; estado inválido; pedido cancelado por el cliente.
5. **Resultado:** cada pedido tiene el estado que le asignó el personal y el cliente lo ve.
6. **Reglas y criterios:** RN-27 a RN-34; CA-L01 a CA-L04, CA-L08.

### CU-06 · El administrador y el personal gestionan el catálogo y las zonas

1. **Actores y objetivo:** administrador (cuenta propia) y personal; mantener al día el menú y las condiciones de delivery.
2. **Inicio:** se agrega un producto, cambia un precio, se acaba algo o cambian las zonas.
3. **Pasos:** el administrador agrega una hamburguesa con nombre, descripción, imagen, precio y precio de combo → se valida y aparece en el menú. Variantes: cambiar precio; marcar agotado o disponible (personal o administrador); definir parroquias con delivery, tarifas y horarios.
4. **Alternativas:** datos incompletos; precio o tarifa inválidos; el personal no tiene opción de cambiar precios ni zonas.
5. **Resultado:** el menú y las condiciones de delivery reflejan lo cargado.
6. **Reglas y criterios:** RN-35 a RN-40; CA-L05 a CA-L07.

## 8. Decisiones y preguntas pendientes

**Decisiones confirmadas por Damián:** las de la fase 1 (D1 a D11), con D7, D8 y D9 modificadas, y las de la fase 2 (F2-D1 a F2-D10 y las del 2026-11-08), registradas con alternativas y motivo en `docs/proceso.md` y resumidas en la sección 20.

**Supuestos:** los montos de los ejemplos (hamburguesa de 5.00, combo de 2.00, tarifa de 1.50) son ilustrativos; solo el mínimo de 2.50 y el corte de las 18:30 en el sur de Guayaquil son valores decididos.

**Preguntas abiertas:**

| Pregunta | Afecta | ¿Bloquea el cierre? |
|---|---|---|
| Moneda de los montos (se usa 2.50 sin precisar). | CU-03, CU-06 | No |
| Retroalimentación docente de las fases 1 y 2: no registrada; no se inventa una aprobación. | Todo el documento | No |
| Proyecto de Supabase y contrato de tablas: no existen todavía (F3-D1). | 25, 27, 29 | Bloquea la implementación, no el diseño |
| Proveedor del cobro con tarjeta en modo de prueba (RN-08): no elegido. | 25, 29 | Bloquea la etapa de pago |
| Versión de React Router documentada en Context7 (hasta 7.9.4) frente a la de la cohorte (8.3.1). | 23 | No; se confirma antes de implementar |

**Decisiones técnicas de la fase 3 (Damián, 2026-11-10):** F3-D1 Supabase como fuente remota; F3-D2 carrito en Zustand; F3-D3 formulario de entrega y pago con Zod y Mantine Form; F3-D4 Modal de revisión del pedido; F3-D5 menú como consulta de TanStack Query; F3-D6 rutas con panel aparte para el local. Detalle en los apartados 21 a 27 y en `docs/proceso.md`.

## 9. Decisiones propias y uso de IA

*Texto de Damián, armado con sus respuestas dictadas por voz el 2026-11-08 y transcritas en `docs/proceso.md`. Las frases entre comillas son suyas.*

**Herramienta utilizada:** Claude, usado por voz con mi asistente Jarvis, junto con AHK 3.0.0.

**Regla que precisé:** algunas zonas no tienen delivery a ciertas horas. Por qué: "Porque estas son peligrosas y no queremos tampoco arriesgar el bienestar de nuestros trabajadores." Concretamente: "las zonas del sur de Guayaquil", con delivery solo hasta las 18:30.

**Alternativas evaluadas:** "No pensé en ninguna otra opción" y descarté hacer delivery a todas horas en esas zonas por el peligro: "Claro, en algunas zonas hasta ciertas horas."

**Ejemplo válido y no válido:** "Un pedido para Sauces 8 a las 8 de la noche" sí se puede; "algo que no se podría es un pedido al Guasmo Sur a las 7 u 8".

**Qué cambió desde la fase 1:** "La forma en cómo se dará el proceso de pago y el manejo de parte del administrador junto al personal, como también establecer una tarifa fija para los pedidos." Aclaración de Damián: con "tarifa fija" se refiere al monto mínimo de 2.50 para delivery.

**Opiniones que recibí (informales, sin entrevistas ni datos):** "La gente me dice que es mucho mejor por la aplicación, y también los que entregan delivery dicen que les parece muy bien que se controle hasta qué hora entregar a ciertas zonas."

**Qué sigo sin validar:** "Todavía no lo he probado con clientes reales porque la app sigue en proceso."

**Uso de la IA (de la fase 1, vigente):** "Me ayudó siendo una guía: corroborando lo que decía, ayudándome a redactar mejor, a pensar mejor mis ideas y dándome mejores opciones." En esta fase seguí recomendaciones del agente en tres puntos: cobro real en modo de prueba, zonas por parroquias del INEC y que el administrador defina zonas mientras el personal solo bloquea en el momento.

### Fase 3 · Decisiones técnicas y recorrido (Damián, 2026-11-10)

*Respuestas dictadas por voz y transcritas en `docs/proceso.md`. Las frases entre comillas son suyas.*

**Decisión que tomé:** guardar el carrito en Zustand, "porque es lo más recomendable para no saturar demasiado, ya que es una data más simple y con mucho nivel de importancia, rechazando las demás". Las alternativas que descarté fueron guardar en Zustand la forma de entrega, o el carrito y la entrega juntos en un solo store. Consecuencia: el menú, el contador, el carrito y el Modal de revisión leen el mismo store; el menú y los pedidos no se copian ahí porque son datos de Supabase.

**Recorrido con mis palabras:** "El cliente, una vez que agregue sus productos y todo, al momento que vaya a comprar le pida iniciar sesión, luego selecciona qué tipo de pedido si delivery o no, seleccionando el método de pago", revisa su pedido en la ventana de revisión antes de enviarlo, y "una vez mandada la orden le va a aparecer la animación que su orden llegó, fue aceptada, está siendo preparada, ya está listo para que la venga a ver en caso que sea por recoger en local, o sino ya salió en ruta para caso de delivery". Aclaración: "fue aceptada" era forma de decirlo y corresponde al estado "recibido"; la animación no está en el diseño aprobado.

**Quién administra los datos de ese recorrido:** el carrito, Zustand; entrega y pago, Mantine Form validado con Zod; el pedido enviado y su estado, TanStack Query sobre Supabase; el número de pedido, la URL (`/pedido/:numero`).

**Recomendaciones que seguí:** Supabase (ya lo usé en el hackatón y trae el acceso con Google), el menú como consulta remota, el formulario de entrega y pago, el Modal de revisión y las rutas con panel aparte, todas propuestas por el agente y confirmadas por mí.

**Evidencia que falta:** nada está implementado ni probado; no existe el proyecto de Supabase ni el proveedor del cobro de prueba.

## 10. Fuentes y comprobaciones de esta fase

**Fase 3 (2026-11-10):**

| Fuente o comprobación | Resultado | Límite |
|---|---|---|
| `node -v` / `pnpm -v` / `ahk --version` | v22.23.4 / 11.17.0 / 3.0.0 | Solo versiones. |
| `ahk health` | Build real, código 0 | Compila la plantilla, no el diseño. |
| MCP real `specs.list` | 6 casos, 3 specs funcionales, todos approved | Disponibilidad. |
| `specs.create` + `specs.validate` | `tech-navegacion-y-cuenta`, `tech-pedido-y-seguimiento`, `tech-operacion-del-local`, válidos, con `sourceSpec` | Formato y vínculos. |
| `specs.transition` | Los 3 spec-tech en approved, tras leerlos Damián | Aprobar no autoriza implementar. |
| Context7 · Zustand `/pmndrs/zustand` | Store tipado con `create<T>()(...)`, `docs/learn/guides/beginner-typescript.md`, https://context7.com/pmndrs/zustand, 2026-11-10 | Índice hasta 5.0.14; cohorte 5.0.15. |
| Context7 · React Router `/remix-run/react-router` | Modo declarativo con BrowserRouter (`docs/start/modes.md`) y `useParams` (`docs/start/declarative/url-values.md`), https://context7.com/remix-run/react-router, 2026-11-10 | Índice hasta 7.9.4; cohorte 8.3.1. |
| TanStack Query, Zod, Mantine Form y Modal | No consultados todavía en Context7 | Sus APIs se describen como propuesta y se confirman antes de implementar. |

**Fase 2 (conservado):**

**Fuentes:** casos `cu-01` a `cu-06` en `docs/use-cases/`; especificaciones `spec-navegacion-y-cuenta`, `spec-pedido-y-seguimiento` y `spec-operacion-del-local` en `docs/specs/`; `docs/proceso.md`; `docs/entregas/fase-01.md`. Fuente externa de referencia: la división político-administrativa oficial del INEC (parroquias de Guayaquil), mencionada como criterio de zonas; no se descargaron datos.

| Comprobación (2026-11-08) | Resultado | Límite |
|---|---|---|
| `node --version` / `pnpm --version` | v22.23.4 / 11.17.0 | Solo versiones. |
| `ahk --version` | 3.0.0 (avisa que existe la 3.7.0; no se actualizó, por la consigna) | Solo la versión del CLI. |
| `ahk doctor` | Archivos del agente, skills, `.mcp.json` y base del harness válidos | No prueba reglas del producto. |
| `ahk health` | Ejecuta el build real (`tsc -b && vite build`) y termina con código 0. En la fase 1 fallaba; se corrigió parcheando el CLI de AHK para que llame bien a `health.bat` (copias `.orig` conservadas). | Un build correcto no demuestra que las reglas sean correctas. |
| Llamada MCP real `specs.list` | Lista los 6 casos y las 3 especificaciones | Disponibilidad, no calidad. |
| `specs.validate` sobre los 9 documentos | `valid: true`, sin errores | Formato y relaciones, no conveniencia. |
| Estados en AHK | Los 9 documentos en `approved` | Las aprobaciones las dio Damián en la conversación. |
| Revisión propia del documento | Damián pidió exportarlo el 2026-11-08 | Debe leer el PDF antes de subirlo. |

## 11. Procesos detallados

| ID | Casos | Actor | Inicio y condiciones | Datos de entrada | Pasos y decisiones | Reglas | Éxito / cancelación / fallo |
|---|---|---|---|---|---|---|---|
| PR-N1 · Explorar menú | CU-01 | Visitante | Abre la página; hay productos | Ninguno | Entrada → "Ver menú" → listado → detalle | RN-01 a RN-06 | Éxito: ve la oferta. Fallo: menú vacío, ve aviso. |
| PR-N2 · Registrarse o iniciar sesión | CU-02 | Cliente | Entra al carrito sin sesión | Nombre, correo, teléfono, contraseña; o Google | Elige vía → producto comprueba datos y correo único → sesión | RN-07 a RN-12 | Éxito: vuelve al carrito. Cancelación: cancela Google, sigue sin sesión. Fallo: datos inválidos, correo repetido. |
| PR-N3 · Recuperar contraseña | CU-02 | Cliente | Olvidó su contraseña | Correo | Pide enlace → abre enlace → crea contraseña nueva | RN-11 | Fallo: enlace vencido o usado, pide otro. |
| PR-01 · Armar y confirmar pedido | CU-03 | Cliente con sesión | Carrito con productos | Productos, entrega, dirección, pago, tarjeta | Carrito → entrega → zona, horario, bloqueo, mínimo → pago → confirmar | RN-13 a RN-23 | Éxito: "recibido" con número. Cancelación: abandona el pago, vuelve al carrito. Fallo: pago rechazado, sin dirección, fuera de zona, bajo mínimo. |
| PR-02 · Cancelar pedido | CU-03, CU-04 | Cliente | Pedido en "recibido" | Ninguno | Pulsa cancelar → "cancelado" → devolución si fue con tarjeta | RN-22 | Fallo: ya en preparación, no se puede. |
| PR-03 · Seguir pedido e historial | CU-04 | Cliente | Tiene pedidos | Ninguno | Ve estado en vivo, aviso al estar listo, historial | RN-24 a RN-26 | Sin pedidos: aviso y acceso al menú. |
| PR-04 · Atender pedido | CU-05 | Personal | Pedido "recibido" en el monitor | Estado, repartidor | En preparación → elegir repartidor (delivery) → estado final → historial del día | RN-27 a RN-33 | Pedido cancelado por el cliente sale de la lista. |
| PR-05 · Bloquear zona | CU-05 | Personal | Situación de riesgo | Zona | Bloquear → solo retiro en esa zona → desbloquear | RN-32 | Sin efecto en tarifas ni horarios. |
| PR-06 · Gestionar hamburguesas | CU-06 | Administrador; personal para agotados | Cambio en la oferta | Nombre, descripción, imagen, precio, precio de combo | Agregar, cambiar precio, marcar agotado o disponible | RN-35 a RN-38 | Fallo: falta nombre o precio inválido, no se guarda. |
| PR-07 · Gestionar zonas | CU-06 | Administrador | Cambian condiciones de reparto | Parroquias, tarifa, horarios | Elegir parroquias, agrupar, poner tarifa y horarios | RN-39, RN-40 | Fallo: tarifa inválida, no se guarda. |

## 12. Reglas del negocio

| ID | Condición | Comportamiento exigido | Motivo | Procesos |
|---|---|---|---|---|
| RN-01 | Al abrir la página | Imagen de hamburguesa y botón "Ver menú" | D1 | PR-N1 |
| RN-02 | Visitante sin cuenta | Puede ver todo el menú | D6 | PR-N1 |
| RN-03 | Listado y detalle | Nombre, imagen, descripción, precio; combo y extras con precio | D4 | PR-N1 |
| RN-04 | Precios mostrados | Son los del catálogo vigente | Coherencia | PR-N1, PR-01 |
| RN-05 | Producto agotado | Se muestra "Agotado" y no se puede agregar ni confirmar | D7, F2-D5 | PR-N1, PR-01 |
| RN-06 | Catálogo vacío | Mensaje de menú no disponible | — | PR-N1 |
| RN-07 | Cliente sin sesión entra al carrito | Se le pide registrarse o iniciar sesión | Identificar quién pide (D6, F2-D1) | PR-N2 |
| RN-08 | Registro | Nombre, correo, teléfono y contraseña obligatorios; sin dirección en la cuenta | Contactar al cliente (F2-D8) | PR-N2 |
| RN-09 | Acceso | Solo correo y contraseña, o Google; con Google sin teléfono, se pide | F2-D9 | PR-N2 |
| RN-10 | Correo ya registrado | No se crea otra cuenta; se ofrece iniciar sesión | Una cuenta por correo | PR-N2 |
| RN-11 | Contraseña olvidada | Enlace al correo para crear una nueva; vencido o usado no sirve | F2-D10 | PR-N3 |
| RN-12 | Tras identificarse | Vuelve al carrito | Comodidad | PR-N2 |
| RN-13 | Total del pedido | Suma de hamburguesas por cantidad, combos y extras, más tarifa de zona si es delivery | Cálculo (sección 16) | PR-01 |
| RN-14 | Formas de entrega | Delivery o retiro | D3 | PR-01 |
| RN-15 | Delivery | Exige dirección; la zona es su parroquia oficial del INEC | Zonas claras y sin solaparse | PR-01 |
| RN-16 | Dirección fuera de zona | No hay delivery; se ofrece retiro | Logística | PR-01 |
| RN-17 | Zona en horario sin delivery (ej.: sur de Guayaquil después de 18:30) o bloqueada | No hay delivery; se ofrece retiro | Seguridad de los trabajadores | PR-01, PR-05 |
| RN-18 | Productos por debajo de 2.50 | No hay delivery; se ofrece retiro. Valor fijo | Decisión de Damián | PR-01 |
| RN-19 | Forma de pago | Delivery: solo tarjeta en la app. Retiro: tarjeta en la app o efectivo en el local | F2-D2 | PR-01 |
| RN-20 | Pago con tarjeta | Real en modo de prueba: se aprueba o se rechaza sin mover dinero; rechazado no confirma | F2-D6 | PR-01 |
| RN-21 | Pedido confirmado | Recibe número visible y queda "recibido" | Identificar al retirar o entregar | PR-01 |
| RN-22 | Cancelación | Solo el cliente y solo en "recibido"; con tarjeta se devuelve el total automáticamente | Evitar pérdidas una vez preparado | PR-02 |
| RN-23 | 2 pedidos "no retirados" | El cliente ya no puede pagar en efectivo | Evitar pedidos abandonados | PR-01, PR-04 |
| RN-24 | Cambio de estado | El cliente lo ve sin recargar | Tranquilidad del cliente | PR-03 |
| RN-25 | Pedido listo para retirar | El cliente recibe un aviso | — | PR-03 |
| RN-26 | Pedidos visibles | Solo los propios; historial completo | Privacidad | PR-03 |
| RN-27 | Acceso del personal | Cuenta compartida en el monitor del local; no se registra qué trabajador atiende | Simplicidad | PR-04 |
| RN-28 | Acceso del administrador | Cuenta propia, desde donde quiera | Separar decisiones del negocio | PR-06, PR-07 |
| RN-29 | Avance de estado | Solo el siguiente válido según la entrega (sección 15) | Evitar errores | PR-04 |
| RN-30 | "No retirado" | Solo tras unas 3 horas en "listo para retirar" | Dar tiempo al cliente | PR-04 |
| RN-31 | Repartidor | En cada delivery el personal elige propio o servicio externo | Cambia D9 | PR-04 |
| RN-32 | Bloqueo de zona | El personal bloquea y desbloquea; no cambia tarifas ni horarios | Reaccionar a riesgos del momento | PR-05 |
| RN-33 | Pedido terminado o cancelado | Sale de la lista activa al historial del día | Orden en el monitor | PR-04 |
| RN-34 | Contenido del pedido | Nadie del local lo cancela ni lo modifica | Respetar lo que pidió el cliente | PR-04 |
| RN-35 | Permisos de catálogo | El administrador crea y fija precios; el personal solo marca agotados | Cambia D7 | PR-06 |
| RN-36 | Datos de hamburguesa | Nombre y precio mayor que cero obligatorios | Menú coherente | PR-06 |
| RN-37 | Producto que no se vende | No se elimina ni se oculta: queda "Agotado" | Decisión de Damián | PR-06 |
| RN-38 | Cambio de precio | Solo afecta a pedidos nuevos | Respetar lo pagado | PR-06 |
| RN-39 | Zonas | Parroquias del INEC, solas o agrupadas, con tarifa mayor o igual a cero; sin tarifa, sin delivery | Recomendación aceptada | PR-07 |
| RN-40 | Extras y mínimo | Precios de extras y mínimo de 2.50 fijos, no editables | Simplicidad | PR-06 |

## 13. Datos necesarios y su significado

| Dato | Proceso | Origen | Obligatorio | Valores permitidos | Quién lo ve / modifica |
|---|---|---|---|---|---|
| Nombre del cliente | PR-N2 | Cliente | Sí | Texto | Cliente y personal lo ven; el cliente lo da |
| Correo | PR-N2, PR-N3 | Cliente o Google | Sí | Correo válido, único | Cliente |
| Teléfono | PR-N2 | Cliente | Sí | Teléfono de contacto | Cliente lo da; personal lo ve |
| Contraseña | PR-N2, PR-N3 | Cliente | Sí (si no usa Google) | — | Nadie la ve |
| Productos, cantidad, combo, extras | PR-01 | Cliente | Al menos un producto | Disponibles, cantidad ≥ 1 | Cliente y personal |
| Forma de entrega | PR-01 | Cliente | Sí | Delivery o retiro | Cliente y personal |
| Dirección | PR-01 | Cliente, en cada pedido | Con delivery | Dentro de una zona | Cliente y personal |
| Parroquia / zona | PR-01, PR-07 | Producto, a partir de la dirección | Con delivery | Parroquias con delivery | El administrador las define |
| Tarifa de envío | PR-01, PR-07 | Producto, según zona | Con delivery | ≥ 0 | El administrador la fija |
| Horario sin delivery | PR-01, PR-07 | Administrador | No | Franja horaria por zona | Administrador |
| Bloqueo de zona | PR-05 | Personal | No | Bloqueada o no | Personal |
| Forma de pago | PR-01 | Cliente | Sí | Tarjeta; efectivo solo en retiro y si no está bloqueado | Cliente y personal |
| Datos de tarjeta | PR-01 | Cliente | Con tarjeta | Los acepta o rechaza el proveedor | No se muestran al personal |
| Total | PR-01 | Producto, calculado | Sí | ≥ 0 | Cliente y personal |
| Número de pedido | PR-01 | Producto | Sí | Único | Cliente y personal |
| Estado | PR-03, PR-04 | Personal; "cancelado", el cliente | Sí | Sección 15 | Cliente lo ve; personal lo cambia |
| Repartidor | PR-04 | Personal | Con delivery | Propio o externo | Personal |
| Pedidos no retirados del cliente | PR-01 | Producto, contándolos | Sí | 0, 1, 2 o más | Producto lo usa |
| Hamburguesa: nombre, descripción, imagen, precio, precio de combo | PR-06 | Administrador | Nombre y precio | Precio > 0 | Administrador; todos los ven |
| Disponibilidad | PR-06 | Personal o administrador | Sí | Disponible o agotado | Personal y administrador |

## 14. Validaciones, permisos y restricciones

| Actor | Puede | No puede | Respuesta ante error |
|---|---|---|---|
| Visitante | Ver menú | Comprar | Al entrar al carrito se le pide cuenta |
| Cliente | Comprar, pagar, seguir, cancelar en "recibido", ver su historial | Ver pedidos ajenos, cancelar en preparación, delivery fuera de zona u horario, efectivo en delivery o con 2 no retirados | Mensaje claro con el motivo y la alternativa (retiro, otra tarjeta, completar el campo); puede corregir y reintentar |
| Personal | Avanzar estados, elegir repartidor, bloquear zonas, marcar agotados, ver historial del día | Cambiar precios, zonas, tarifas, horarios; cancelar o modificar pedidos | No tiene esas opciones; un estado inválido no se ofrece |
| Administrador | Todo lo del catálogo y las zonas | Cambiar extras o el mínimo; eliminar u ocultar productos | Datos incompletos o inválidos no se guardan y se señala el campo |

Mensajes de ejemplo: "Falta tu teléfono", "Ese correo ya tiene cuenta, ¿quieres iniciar sesión?", "No hacemos delivery a esta dirección a esta hora; puedes retirar en el local", "Te faltan 0.50 para el mínimo de delivery", "Tu tarjeta fue rechazada; prueba con otra", "Este pedido ya está en preparación y no se puede cancelar".

## 15. Estados y cambios permitidos

| Desde | Hacia | Quién | Condición | Efecto |
|---|---|---|---|---|
| — | Recibido | Cliente | Confirma con pago válido o efectivo al retirar | Aparece en el monitor con número |
| Recibido | Cancelado | Cliente | Aún no está en preparación | Sale de la lista; devolución si fue con tarjeta |
| Recibido | En preparación | Personal | — | Ya no se puede cancelar |
| En preparación | Listo para retirar | Personal | Pedido de retiro | Aviso al cliente |
| En preparación | Entregado al repartidor | Personal | Delivery, con repartidor elegido | Pasa al historial del día |
| Listo para retirar | Retirado | Personal | El cliente lo recoge | Pasa al historial del día |
| Listo para retirar | No retirado | Personal | Pasaron unas 3 horas | Suma un no retirado al cliente |

Las zonas tienen además un estado simple, con o sin bloqueo, que cambia el personal. "Cargando" o "error de pago" son respuestas temporales, no estados del pedido. El registro de cuenta y el catálogo no necesitan un ciclo de estados más allá de disponible o agotado.

## 16. Cálculos y ejemplos

**Total del pedido:** suma, para cada hamburguesa, de (precio + precio del combo si lo eligió + precio de sus extras) × cantidad; si es delivery, más la tarifa de la zona. Montos con dos decimales.

- **Ejemplo esperado:** 2 hamburguesas de 5.00, una de ellas en combo de 2.00, delivery a una zona con tarifa 1.50 → 5.00 + 5.00 + 2.00 + 1.50 = **13.50**.
- **Límite del mínimo:** el mínimo de 2.50 se compara con los productos, sin la tarifa. Con 2.50 exactos se permite delivery; con 2.00 no, y se avisa que faltan 0.50.
- **Entrada inválida:** cantidad 0 o un producto agotado no suman; el pedido no se puede confirmar con ellos.

**No retirado:** si la hora actual menos la hora de "listo para retirar" es de unas 3 horas o más, se puede marcar. Ejemplo: listo a las 15:00, a las 16:00 no; a las 18:00, sí.

**Horario de zona:** en el sur de Guayaquil hay delivery solo hasta las 18:30. Ejemplo: Guasmo Sur a las 18:00, sí; a las 19:00, no.

## 17. Alternativas, errores y recuperación

| Situación | Qué ve el usuario | Qué cambia / se mantiene | Cómo sigue |
|---|---|---|---|
| Carrito vacío | No puede confirmar | Nada | Agrega productos |
| Producto se agota con el carrito abierto | Aviso | El carrito sigue | Quita el producto |
| Dirección fuera de zona, zona cerrada por horario o bloqueada | Aviso de que no hay delivery | El carrito sigue | Elige retiro |
| Bajo el mínimo de delivery | Cuánto falta | El carrito sigue | Agrega productos o elige retiro |
| Tarjeta rechazada | Aviso de rechazo | No se crea el pedido | Otra tarjeta o efectivo si es retiro |
| Abandona el pago | Vuelve al carrito | No se crea el pedido | Reintenta |
| Cancela a tiempo | Pedido "cancelado" y devolución | El local deja de verlo activo | Puede hacer otro pedido |
| Intenta cancelar tarde | Aviso de que ya no se puede | Sigue el pedido | Espera o contacta al local |
| No retira en unas 3 horas | Pedido "no retirado" | Suma un no retirado; con 2, sin efectivo | Paga con tarjeta en adelante |
| Correo repetido, datos incompletos o credenciales mal | Mensaje con el motivo | No se crea cuenta o sesión | Corrige o recupera contraseña |
| Enlace de recuperación vencido | Aviso | Contraseña sin cambios | Pide otro enlace |
| Sin pedidos | Mensaje y acceso al menú | — | Ve el menú |

## 18. Criterios de aceptación y ejemplos comprobables

Comportamiento esperado; todavía no hay pruebas ejecutadas porque la funcionalidad no está implementada.

| ID | Proceso / reglas | Condición inicial | Acción | Resultado esperado |
|---|---|---|---|---|
| CA-N01 | PR-N1 / RN-01 | Abre la página | — | Ve la imagen y "Ver menú" |
| CA-N02 | PR-N1 / RN-02, RN-03 | Sin cuenta | Abre un detalle | Ve combo y extras con precio |
| CA-N03 | PR-N1 / RN-05 | Hamburguesa agotada | Intenta agregarla | Ve "Agotado", no se agrega |
| CA-N04 | PR-N1 / RN-06 | Catálogo vacío | Pulsa "Ver menú" | Mensaje de menú no disponible |
| CA-N05 | PR-N2 / RN-07 | Sin sesión | Entra al carrito | Ve registro, inicio con correo y Google |
| CA-N06 | PR-N2 / RN-08 | Formulario sin teléfono | Crea cuenta | No se crea; indica que falta |
| CA-N07 | PR-N2 / RN-08 | Datos completos | Crea cuenta | Cuenta creada y sesión iniciada |
| CA-N08 | PR-N2 / RN-10 | Correo ya usado | Crea cuenta | Se ofrece iniciar sesión |
| CA-N09 | PR-N2 / RN-09 | Google sin teléfono | Entra con Google | Debe dar el teléfono |
| CA-N10 | PR-N3 / RN-11 | Enlace usado | Lo abre | Rechazado; puede pedir otro |
| CA-N11 | PR-N2 / RN-12 | Inicia sesión desde el carrito | — | Vuelve al carrito |
| CA-P01 | PR-01 / RN-13 | 2 × 5.00, un combo de 2.00, tarifa 1.50 | Ve el total | 13.50 |
| CA-P02 | PR-01 / RN-18 | 2.00 en productos | Elige delivery | No se permite; se ofrece retiro |
| CA-P03 | PR-01 / RN-16, RN-17 | Guasmo Sur a las 19:00 | Elige delivery | Solo se ofrece retiro |
| CA-P04 | PR-01 / RN-17 | Sauces 8 a las 20:00 | Elige delivery | Se permite y se suma la tarifa |
| CA-P05 | PR-01 / RN-19, RN-20 | Delivery; tarjeta rechazada | Confirma | Solo tarjeta disponible; no se confirma, puede reintentar |
| CA-P06 | PR-01 / RN-21 | Pago aprobado | Confirma | "Recibido" con número, visible en el monitor |
| CA-P07 | PR-02 / RN-22 | "Recibido" pagado con tarjeta | Cancela | "Cancelado" y devolución total; en preparación no aparece la opción |
| CA-P08 | PR-01 / RN-23 | Cliente con 2 no retirados | Elige retiro | No ve efectivo |
| CA-P09 | PR-03 / RN-24, RN-25 | Personal cambia el estado | — | El cliente lo ve sin recargar; aviso al estar listo |
| CA-P10 | PR-03 / RN-26 | Cliente con pedidos | Abre "Mis pedidos" | Ve todos los suyos y ninguno ajeno |
| CA-L01 | PR-04 / RN-29 | Pedido de retiro | Avanza estados | Nunca se ofrece "entregado al repartidor" |
| CA-L02 | PR-04 / RN-30 | Listo hace 1 hora | Marca no retirado | No se permite; a las 3 horas, sí |
| CA-L03 | PR-04 / RN-31 | Delivery en preparación | Elige repartidor | Puede elegir propio o externo |
| CA-L04 | PR-05 / RN-32 | Zona activa | El personal la bloquea | Los clientes de esa zona solo ven retiro hasta que se desbloquea |
| CA-L05 | PR-06 / RN-35 | Desde el monitor | Busca cambiar un precio | No existe la opción |
| CA-L06 | PR-06 / RN-36 | Precio 0 | Guarda | No se guarda |
| CA-L07 | PR-06 / RN-38 | Precio pasa de 5.00 a 6.00 | — | Pedido ya confirmado sigue en 5.00; uno nuevo usa 6.00 |
| CA-L08 | PR-04 / RN-33 | Pedido terminado | — | Sale de la lista y aparece en el historial del día |

## 19. Relación entre casos, procesos, reglas y criterios

| Caso de uso | Proceso | Reglas | Datos o estados relevantes | Criterios | Especificación fuente |
|---|---|---|---|---|---|
| CU-01 | PR-N1 | RN-01 a RN-06 | Catálogo, disponibilidad | CA-N01 a CA-N04 | spec-navegacion-y-cuenta |
| CU-02 | PR-N2, PR-N3 | RN-07 a RN-12 | Nombre, correo, teléfono, contraseña | CA-N05 a CA-N11 | spec-navegacion-y-cuenta |
| CU-03 | PR-01, PR-02 | RN-05, RN-13 a RN-23 | Dirección, zona, tarifa, pago, total, número; recibido, cancelado | CA-P01 a CA-P08 | spec-pedido-y-seguimiento |
| CU-04 | PR-02, PR-03 | RN-22, RN-24 a RN-26 | Estados del pedido, historial | CA-P07, CA-P09, CA-P10 | spec-pedido-y-seguimiento |
| CU-05 | PR-04, PR-05 | RN-27, RN-29 a RN-34 | Estados, repartidor, bloqueo de zona | CA-L01 a CA-L04, CA-L08 | spec-operacion-del-local |
| CU-06 | PR-06, PR-07 | RN-28, RN-35 a RN-40 | Hamburguesas, precios, parroquias, tarifas, horarios | CA-L05 a CA-L07 | spec-operacion-del-local |

Nota: las especificaciones en AHK usan su propia numeración interna (RN-01 a RN-25, CA-01 a CA-18); este documento la renumera en un solo listado, sin cambiar las condiciones.

## 20. Cambios respecto de la primera entrega

| Qué | Antes (fase 1) | Ahora (fase 2) | Por qué | Tipo | Fuentes afectadas |
|---|---|---|---|---|---|
| Momento del inicio de sesión | Al pulsar "Pedir" | Al entrar al carrito | Decisión de Damián (F2-D1) | Precisión | CU-02, CU-03 |
| Datos del registro | Nombre, correo, contraseña | Más teléfono obligatorio | Contactar al cliente (F2-D8) | Precisión | CU-02 |
| Acceso externo | Google/redes sociales | Solo Google | F2-D9 | Precisión | CU-02 |
| Contraseña olvidada | Sin decidir | Recuperación por correo | F2-D10 | Precisión | CU-02 |
| Pago | En línea simulado | Tarjeta real en modo de prueba; efectivo solo al retirar | Proyecto lo más real posible (F2-D6) | Alcance | CU-03 |
| Envío | Sin costo definido | Tarifa por zonas (parroquias del INEC), horarios sin delivery, bloqueo, mínimo 2.50 | Seguridad y logística | Alcance | CU-03, CU-05, CU-06 |
| Reparto | Solo servicio externo (D9) | Propios o externo, elige el personal | Damián tiene repartidores propios | Alcance | CU-03, CU-05 |
| Administrador | No existía (D7) | Gestiona catálogo, precios y zonas | Separar decisiones del negocio | Alcance | CU-05, CU-06 |
| Acceso del personal | Sin decidir | Cuenta compartida en el monitor | Simplicidad | Precisión | CU-05 |
| Estados | Recibido, en preparación, listo, entregado al repartidor | Más cancelado, retirado y no retirado | Cancelación y pedidos abandonados | Precisión | CU-03, CU-04, CU-05 |
| Número de pedido, actualización en vivo, historial | Preguntas abiertas | Decididos | Decisiones de Damián | Precisión | CU-03, CU-04, CU-05 |
| Productos que no se venden | Pregunta abierta | Quedan "Agotado"; no se eliminan ni ocultan | Decisión de Damián | Precisión | CU-06 |
| Extras | Pregunta abierta | Fijos | Decisión de Damián | Precisión | CU-06 |
| Agotado y cambio de precio | Supuestos | Confirmados | Decisión de Damián | Precisión | CU-01, CU-06 |
| `ahk health` | Fallaba | Termina bien | Parche del CLI de AHK | Comprobación | Sección 10 |

CU-01 no cambió. La versión de la fase 1 se conserva en `docs/entregas/fase-01.md`.

## 21. Stack y matriz de herramientas obligatorias

**Instalado hoy (base existente):** React 19.2.8, React DOM 19.2.8, TypeScript y Vite de la plantilla.

**Propuesto, no instalado:** react-router 8.3.1, @tanstack/react-query 5.102.8, zustand 5.0.15, zod 4.4.3 (imports desde `zod/v4`), @mantine/core 9.4.1 y @mantine/form 9.4.1 (misma versión), @supabase/supabase-js (versión pendiente). No se añade `mantine-form-zod-resolver` ni librería de notificaciones.

| Herramienta | Origen funcional | Responsabilidad concreta | Consumidor | Comprobación prevista |
|---|---|---|---|---|
| React Router | CU-01 a CU-06 | Navegar entre portada, menú, ingreso, carrito, seguimiento, historial y panel del local; leer el número de pedido de la URL | Todas las pantallas | Abrir `/pedido/123` directamente muestra ese pedido; ruta desconocida muestra «No encontrado» |
| TanStack Query | CU-01, RN-12 (F3-D5) | Consulta del menú con clave `["menu"]`; también pedidos y su estado | `/menu`, `/pedido/:numero`, `/mis-pedidos`, `/local` | Ver carga, error con reintentar y productos agotados |
| Zustand | CU-03 (F3-D2) | Store del carrito con acciones agregar, quitar, cambiar cantidad y vaciar | Menú, contador del encabezado, `/carrito`, Modal | Agregar en el menú y ver el contador y el carrito actualizados |
| Zod + Mantine Form | RN-04, RN-05, RN-06, RN-07 (F3-D3) | Validar el formulario de entrega y pago con `schemaResolver` | `/carrito` | Delivery con 2.00 muestra error; retiro con efectivo es válido |
| Mantine Modal | RN-02, RN-08 (F3-D4) | Revisión del pedido antes de enviarlo | `/carrito` | Cancelar conserva todo; cobro rechazado muestra el error en el Modal |
| Mantine Core | CU-01 a CU-06 | AppShell, Card, Button, Badge, TextInput, Select, Table | Todas | Revisión visual en navegador |

## 22. Arquitectura y responsabilidades

Piezas: páginas (una por ruta), un layout del cliente con encabezado y contador, un layout del local, componentes de presentación, hooks de casos de uso que envuelven a TanStack Query, un módulo de acceso a Supabase, los schemas de Zod y el store del carrito.

Árbol propuesto (plan, no archivos generados):

```
src/
  app/            App.tsx, router.tsx, providers.tsx
  layouts/        ClienteLayout.tsx, LocalLayout.tsx
  pages/
    inicio/       InicioPage.tsx
    menu/         MenuPage.tsx, ProductoCard.tsx
    ingresar/     IngresarPage.tsx
    carrito/      CarritoPage.tsx, EntregaPagoForm.tsx, RevisionPedidoModal.tsx
    pedido/       PedidoPage.tsx
    mis-pedidos/  MisPedidosPage.tsx
    local/        PedidosLocalPage.tsx, HistorialDiaPage.tsx, CatalogoPage.tsx, ZonasPage.tsx
    no-encontrado/ NoEncontradoPage.tsx
  hooks/          use-menu.ts, use-pedido.ts, use-mis-pedidos.ts, use-crear-pedido.ts
  services/       supabase-client.ts, menu-service.ts, pedidos-service.ts
  schemas/        entrega-pago-schema.ts
  stores/         carrito-store.ts
```

## 23. Navegación con React Router

Modo declarativo con `BrowserRouter`, sin loaders ni actions (F3-D6).

| Ruta | Pantalla | Propósito | Parámetros | Casos |
|---|---|---|---|---|
| `/` | Inicio | Imagen de entrada y botón al menú | — | CU-01 |
| `/menu` | Menú | Ver productos, precios y agotados; agregar al carrito | — | CU-01, CU-03 |
| `/ingresar` | Ingresar | Registro, inicio de sesión, Google, recuperación | — | CU-02 |
| `/carrito` | Carrito | Revisar carrito, entrega y pago, abrir el Modal | — | CU-03 |
| `/pedido/:numero` | Seguimiento | Estado del pedido en vivo y cancelación si está recibido | `numero` | CU-04 |
| `/mis-pedidos` | Historial | Pedidos del cliente con su estado final | — | CU-04 |
| `/local/*` | Panel del local | Pedidos activos, historial del día, catálogo y zonas | — | CU-05, CU-06 |
| `*` | No encontrado | Ruta desconocida con enlace al menú | — | — |

Enlaces con `Link`; tras confirmar, `useNavigate` lleva a `/pedido/:numero`; volver usa el historial del navegador. Al recargar una URL, la página vuelve a pedir sus datos a TanStack Query. `/carrito`, `/pedido/:numero`, `/mis-pedidos` y `/local` exigen sesión; la guardia visual redirige a `/ingresar`, pero la autorización real la dan las reglas de acceso de Supabase.

## 24. Propiedad del estado y uso de Zustand

| Dato | Lo administra |
|---|---|
| Carrito (líneas, cantidades, combo, extras) | Zustand (`carrito-store`) |
| Entrega, dirección, parroquia y pago | Mantine Form |
| Menú, pedidos, estado, zonas | TanStack Query (Supabase) |
| Número de pedido | URL |
| Modal abierto o cerrado | Estado local de `CarritoPage` |
| Sesión | Supabase Auth |

El store del carrito guarda líneas y expone agregar, quitar, cambiar cantidad y vaciar; lo modifican el menú y el carrito, lo leen el contador y el Modal. El precio se toma del menú de Query al mostrar, no se copia. No hay persistencia local ni store universal.

## 25. Datos, servicios y límites de integración

Fuente remota elegida: Supabase (F3-D1). **Hipótesis, no verificadas:** tabla de productos (nombre, precio, imagen, disponible), pedidos (número, cliente, líneas, entrega, pago, estado, fecha), zonas (parroquia, tarifa, horario, bloqueada). Operaciones: leer menú, crear pedido, leer pedido, cancelar, cambiar estado, gestionar catálogo y zonas. **Bloqueos:** no existe el proyecto ni el contrato; el cobro de prueba necesita un proveedor con clave secreta que no puede ir al navegador, por lo que requiere una función en el servidor aún no acordada. En el cliente solo va la clave pública de Supabase. Las reglas de acceso por rol (cliente, personal, administrador) se definen en Supabase.

## 26. Formularios, Zod y Mantine Modal

**Formulario de entrega y pago (F3-D3).** Valores iniciales: entrega «retiro», dirección vacía, parroquia vacía, pago vacío. Cadena: regla aprobada → schema de `zod/v4` → `useForm` de Mantine Form con `schemaResolver` → error visible bajo el campo.

| Regla | Válido | Inválido y mensaje |
|---|---|---|
| RN-04 | Delivery con dirección | Delivery sin dirección: «Escribe tu dirección» |
| RN-05 | Parroquia con servicio y en horario | Guasmo Sur a las 19:00: «No hay delivery a esta zona ahora; elige retiro» |
| RN-06 | Delivery con 3.00 en productos | Delivery con 2.00: «El delivery necesita al menos 2.50 en productos» |
| RN-07 | Retiro con efectivo | Delivery con efectivo: «El delivery se paga con tarjeta» |

El submit válido abre el Modal; inválido no lo abre. Derivar tipos con `z.infer` no valida nada en ejecución.

**Modal de revisión (F3-D4).** Lo abre «Confirmar pedido» con el formulario válido; muestra productos, entrega, pago y total. Cancelar o cerrar lo cierra y conserva carrito y formulario. Confirmar envía el pedido: si el cobro se rechaza, muestra el error y deja reintentar sin vaciar nada; si sale bien, vacía el carrito y navega al seguimiento.

## 27. Recorridos técnicos y sincronización con TanStack Query

**Consulta requerida, el menú:** sin entrada; clave `["menu"]`; función que lee productos de Supabase; se ejecuta al abrir `/menu`. Estados: cargando, error con reintentar, vacío («Aún no hay productos») y con datos.

**Recorrido del pedido:** agregar en `/menu` (Zustand) → `/carrito` → formulario (Zod) → Modal → mutación crear pedido → el cambio se da por confirmado cuando Supabase devuelve el número → se invalida `["pedidos", usuario]` → navegación a `/pedido/:numero` con la consulta `["pedido", numero]`.

**Sincronización:** cambiar estado en `/local` invalida `["local", "pedidos"]`; marcar agotado invalida `["menu"]`; el cliente ve el cambio sin recargar con Supabase Realtime invalidando `["pedido", numero]` (propuesta por confirmar en documentación). No se usan Effects para copiar respuestas ni disparar consultas.

## 28. Estrategia de verificación y límites de evidencia

| Criterio | Comprobación prevista | Resultado esperado | Herramienta | Límite |
|---|---|---|---|---|
| CA-01 | Prueba pura del cálculo del total | 13.50 | Vitest | No prueba la interfaz |
| CA-02, RN-06 | Prueba pura del schema con 2.00 | Error de mínimo | Vitest | No prueba el mensaje en pantalla |
| CA-04, RN-07 | Prueba del schema con delivery y efectivo | Error | Vitest | Igual |
| Carrito | Prueba pura del store | Agregar y vaciar funcionan | Vitest | No prueba consumidores |
| Menú | Recorrido en navegador | Carga, error y agotados visibles | Navegador | Necesita Supabase |
| CA-05 | Recorrido con tarjeta rechazada de prueba | Error en el Modal, carrito intacto | Navegador | Necesita proveedor de pago |
| CA-09 | Cambiar estado en `/local` y mirar el cliente | Cambio sin recargar | Dos navegadores | Necesita Realtime |
| Navegación | Abrir `/pedido/123` y una ruta inventada | Pedido o «No encontrado» | Navegador | — |

Nada de esto se ha ejecutado. El build actual de la plantilla no demuestra estas integraciones.

## 29. Plan de construcción, dependencias y riesgos

1. **Rutas y layouts.** Cubre la navegación. Cierre: todas las rutas abren su pantalla vacía y `*` muestra «No encontrado».
2. **Menú con Query.** CU-01, RN-12. Bloqueo: proyecto y tabla de productos en Supabase. Cierre: menú real con agotados.
3. **Store del carrito.** CU-03. Cierre: contador y carrito sincronizados; pruebas Vitest del store.
4. **Sesión.** CU-02. Bloqueo: Supabase Auth con Google configurado. Cierre: `/carrito` sin sesión lleva a `/ingresar`.
5. **Formulario y schema.** RN-04 a RN-07. Cierre: pruebas Vitest del schema y errores visibles.
6. **Modal y crear pedido.** RN-02, RN-08, RN-09. Bloqueo: proveedor de cobro de prueba y función de servidor. Cierre: CA-05 y CA-06.
7. **Seguimiento e historial.** CU-04. Cierre: CA-09 y CA-10.
8. **Panel del local.** CU-05, CU-06. Bloqueo: roles en Supabase. Cierre: cambiar estado y marcar agotado.

**Riesgos:** diferencia de versión de React Router documentada (confirmar la API antes de la etapa 1); clave secreta del pago (no exponerla nunca en el cliente); carga de parroquias del INEC. Publicación: no forma parte de esta entrega.

## 30. Trazabilidad técnica y cambios respecto de la segunda entrega

| Caso / regla | Spec funcional | Spec técnica | Pieza | Herramienta | Criterio |
|---|---|---|---|---|---|
| CU-01, RN-12 | spec-navegacion-y-cuenta | tech-navegacion-y-cuenta | MenuPage, use-menu | TanStack Query, Router | Menú y agotados |
| CU-02, F2-D1 | spec-navegacion-y-cuenta | tech-navegacion-y-cuenta | IngresarPage, guardia | Router, Supabase Auth | Redirección a `/ingresar` |
| CU-03, RN-02 | spec-pedido-y-seguimiento | tech-pedido-y-seguimiento | carrito-store, RevisionPedidoModal | Zustand, Modal | CA-01, CA-06 |
| RN-04 a RN-07 | spec-pedido-y-seguimiento | tech-pedido-y-seguimiento | EntregaPagoForm, entrega-pago-schema | Zod, Mantine Form | CA-02, CA-03, CA-04 |
| RN-08 | spec-pedido-y-seguimiento | tech-pedido-y-seguimiento | RevisionPedidoModal, use-crear-pedido | Modal, Query | CA-05 |
| CU-04, RN-13 | spec-pedido-y-seguimiento | tech-pedido-y-seguimiento | PedidoPage, MisPedidosPage | Router, Query | CA-09, CA-10 |
| CU-05, CU-06 | spec-operacion-del-local | tech-operacion-del-local | páginas de `/local` | Router, Query | Cambiar estado, marcar agotado |

**Cambios desde la segunda entrega:** solo nuevas decisiones técnicas (F3-D1 a F3-D6), las tres especificaciones técnicas aprobadas y los apartados 21 a 30. No hubo cambios funcionales: ningún caso ni especificación funcional se modificó en esta fase. Damián aclaró que «fue aceptada» en su recorrido equivale al estado «recibido», sin cambiar los estados aprobados.
