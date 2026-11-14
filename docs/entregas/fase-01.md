# Dami's Burguer — Fase 1 · Definición funcional

> **Estado de este documento:** borrador de síntesis preparado por el agente a partir de `docs/proceso.md`, `docs/entregas/seccion-09-damian.md` y los casos de uso de AHK. Los seis casos de uso están aprobados por Damián.

## 1. Identificación del proyecto

| Campo | Valor |
|---|---|
| Producto | Dami's Burguer (nombre provisional) |
| Autor | Damián |
| Cohorte | [PENDIENTE: cohorte] |
| Fecha | 2026-10-25 |
| Versión del documento | 0.1 (borrador) |
| Entrega | **Fase 1 · Definición funcional** |

## 2. Problema y contexto

Muchas páginas web de hamburgueserías tienen interfaces confusas y poco llamativas: el cliente no las entiende y no puede comprar de forma cómoda. Pedir es lento, tanto para recibir en casa como para dejar el pedido listo y solo pasar a recogerlo. La alternativa habitual es pedir por WhatsApp, pero los clientes la ven complicada y temen un error humano al momento en que el local toma el pedido.

**Quién lo vive:** clientes de una hamburguesería que quieren pedir para su casa o para retirar; y el personal del local, que hoy toma los pedidos a mano.

**Observación o supuesto:** es una percepción propia de Damián; no se hicieron entrevistas ni se recogieron datos que la respalden.

## 3. Usuarios y objetivos

| Actor | Objetivo |
|---|---|
| **Cliente** | Ver el menú con tranquilidad, armar su pedido con combos y extras, elegir delivery o retiro, pagar y saber en qué etapa está su pedido. |
| **Personal del local** | Recibir los pedidos ya armados (sin tomarlos a mano), marcar su avance, y mantener el menú al día: hamburguesas, combos, precios y agotados. |

No hay un administrador aparte: el mismo personal atiende pedidos y gestiona el catálogo (D7). El servicio externo de delivery **no** es un actor: el local lo coordina por fuera de la app (D9).

## 4. Descripción general de la solución

Una página web de pedidos para la hamburguesería. Al entrar, el cliente ve una imagen de hamburguesa minimalista y llamativa y un botón **"Ver menú"**. Puede explorar el menú sin cuenta. Cuando decide pedir, se registra o inicia sesión, arma su pedido con combos y extras, elige delivery o retiro, paga (en esta versión, un pago en línea simulado) y confirma. El pedido llega ya armado a la pantalla del personal, que lo marca "en preparación" y luego "listo para retirar" o "entregado al repartidor"; el cliente ve esos cambios en su página.

**Recorrido breve de principio a fin:** Ana entra a la página, pulsa "Ver menú", elige una hamburguesa clásica en combo con salsa extra, inicia sesión con Google, elige retiro en el local y pago al retirar, y confirma. En el local, el personal ve el pedido de Ana, lo marca en preparación y luego "listo para retirar". Ana lo ve en su página y va a recogerlo.

## 5. Alcance inicial y exclusiones

**Comprometido para la primera versión:**

- Pantalla de entrada con imagen llamativa y botón "Ver menú" (CU-01).
- Menú visible sin cuenta, con precios, combos, extras y productos agotados señalados (CU-01).
- Registro obligatorio para pedir, con correo y contraseña o con Google/redes sociales (CU-02).
- Armar el pedido con combos (papas y bebida) y extras (aros de cebolla, salsas, lechuga, carne) (CU-03).
- Delivery o retiro en el local (CU-03).
- Pago: delivery solo en línea; retiro en línea o en el local. El pago en línea es simulado (CU-03).
- Seguimiento del estado del pedido por el cliente (CU-04).
- Pantalla del personal para atender pedidos y cambiar su estado (CU-05).
- Gestión del catálogo por el personal: añadir hamburguesas con combos, fijar precios, marcar agotados (CU-06).

**Fuera de esta versión:**

- **Cobro real.** El pago en línea es un simulacro; el cobro real queda fuera porque ya es algo externo a la aplicación (palabras de Damián).
- **Integración con el servicio de delivery.** El local lo coordina por fuera de la app; la página no le avisa directamente (D9). Motivo: es mucho más simple.
- **Administrador separado del personal.** Descartado por simplicidad (D7).

**Mejoras futuras:** cobro real en línea; aviso directo al servicio de delivery.

## 6. Secciones o pantallas previstas

| Pantalla | Propósito | Quién la usa | Información que muestra | Acciones | Casos |
|---|---|---|---|---|---|
| Entrada | Llamar la atención y llevar al menú | Cualquier visitante | Imagen de hamburguesa minimalista | "Ver menú" | CU-01 |
| Menú y detalle de producto | Conocer la oferta | Cualquier visitante | Hamburguesas, precios, combo, extras, "Agotado" | Ver detalle, agregar al pedido | CU-01, CU-03 |
| Registro / inicio de sesión | Identificar al cliente | Cliente | Formulario de correo y contraseña; acceso con Google/redes | Crear cuenta, iniciar sesión | CU-02 |
| Mi pedido (resumen y confirmación) | Armar, pagar y enviar el pedido | Cliente con sesión | Productos, extras, total, entrega, pago | Cambiar cantidades, elegir entrega y pago, pagar (simulado), confirmar | CU-03 |
| Estado del pedido | Seguir el avance | Cliente con sesión | Resumen y estado actual | Consultar | CU-04 |
| Panel del personal · Pedidos | Atender pedidos | Personal | Pedidos activos con detalle, entrega, pago y estado | Cambiar estado | CU-05 |
| Panel del personal · Catálogo | Mantener el menú | Personal | Hamburguesas, combos, precios, disponibilidad | Agregar, cambiar precio, marcar agotado/disponible | CU-06 |

## 7. Casos de uso de la versión inicial

### Catálogo

| Identificador AHK | Nombre | Actor | Objetivo | Archivo fuente | Estado |
|---|---|---|---|---|---|
| cu-01-explorar-menu | El cliente explora el menú | Cliente | Conocer hamburguesas, combos, extras y precios | docs/use-cases/cu-01-explorar-menu.md | Aprobado |
| cu-02-registro-inicio-sesion | El cliente se registra o inicia sesión | Cliente | Identificarse para poder pedir | docs/use-cases/cu-02-registro-inicio-sesion.md | Aprobado |
| cu-03-hacer-pedido | El cliente arma y confirma su pedido | Cliente | Enviar al local un pedido completo y sin errores | docs/use-cases/cu-03-hacer-pedido.md | Aprobado |
| cu-04-seguir-estado-pedido | El cliente sigue el estado de su pedido | Cliente | Saber en qué etapa está su pedido | docs/use-cases/cu-04-seguir-estado-pedido.md | Aprobado |
| cu-05-atender-pedidos | El personal atiende los pedidos | Personal | Recibir pedidos armados y marcar su avance | docs/use-cases/cu-05-atender-pedidos.md | Aprobado |
| cu-06-gestionar-catalogo | El personal gestiona el catálogo | Personal | Mantener productos, precios y agotados al día | docs/use-cases/cu-06-gestionar-catalogo.md | Aprobado |

Los seis casos fueron revisados y aprobados por Damián el 2026-10-25 y su estado en AHK es `approved`.

### CU-01 · El cliente explora el menú

1. **Identificador y nombre:** cu-01-explorar-menu · El cliente explora el menú.
2. **Actor y objetivo:** cliente (no necesita cuenta); conocer la oferta y precios antes de decidir si pide.
3. **Inicio y condiciones previas:** abre la página; hay al menos un producto cargado.
4. **Recorrido principal:** ve la imagen de entrada y el botón "Ver menú" → lo pulsa → ve hamburguesas con nombre, imagen y precio → abre el detalle con opción de combo y extras con precio → vuelve al listado o decide pedir (CU-03).
5. **Alternativas y restricciones:** producto agotado se muestra como "Agotado" y no se puede agregar; menú vacío muestra un aviso; si quiere pedir sin cuenta se le pide registrarse (CU-02).
6. **Resultado observable:** el cliente ve el menú completo con precios, combos y extras.
7. **Criterios de aceptación:** la entrada muestra imagen y "Ver menú"; cada hamburguesa disponible se ve con nombre, imagen y precio; el detalle muestra combo y extras con precio; un agotado no se puede agregar; con catálogo vacío se ve el aviso.

### CU-02 · El cliente se registra o inicia sesión

1. **Identificador y nombre:** cu-02-registro-inicio-sesion · El cliente se registra o inicia sesión.
2. **Actor y objetivo:** cliente; identificarse para poder pedir.
3. **Inicio y condiciones previas:** intenta pedir sin sesión, o entra a "Iniciar sesión".
4. **Recorrido principal:** ve las opciones (correo y contraseña, crear cuenta, Google/redes) → crea cuenta con nombre, correo y contraseña → el producto valida y crea la cuenta → queda con sesión iniciada y vuelve a su pedido. Variantes: inicio de sesión con correo; acceso con Google/redes.
5. **Alternativas y restricciones:** correo ya registrado; datos incompletos; credenciales incorrectas; cancela el acceso con Google/redes. Registro obligatorio solo para pedir, para identificar quién pide y detectar suplantación o bromas.
6. **Resultado observable:** el cliente queda identificado y sigue con su pedido.
7. **Criterios de aceptación:** sin sesión, "Pedir" lleva a las opciones de acceso; con datos válidos se crea la cuenta; un correo repetido no crea otra cuenta; con datos incorrectos no se entra y se ve el motivo; tras entrar vuelve a su pedido; se puede entrar con Google/redes.

### CU-03 · El cliente arma y confirma su pedido

1. **Identificador y nombre:** cu-03-hacer-pedido · El cliente arma y confirma su pedido.
2. **Actor y objetivo:** cliente con sesión; enviar al local un pedido completo, sin errores de toma de pedido.
3. **Inicio y condiciones previas:** decide pedir desde el menú; tiene sesión iniciada.
4. **Recorrido principal:** elige cantidad, combo y extras → se agrega y se actualiza el total → revisa el resumen → elige delivery (con dirección) o retiro → elige pago (delivery: solo en línea; retiro: en línea o en el local) → completa el pago simulado si es en línea → confirma → el pedido queda "recibido", llega al personal y el cliente ve la confirmación.
5. **Alternativas y restricciones:** pedido vacío no se confirma; producto que se agota durante el pedido debe quitarse; delivery exige dirección; abandonar el pago no confirma el pedido; retiro con pago en el local se marca "paga al retirar". El pago en línea es simulado. El reparto lo hace un servicio externo coordinado por el local.
6. **Resultado observable:** el pedido llega al local con todo su detalle y el cliente ve la confirmación.
7. **Criterios de aceptación:** el total refleja productos, combos y extras; delivery solo ofrece pago en línea y exige dirección; retiro ofrece ambos pagos; el pago en línea no pide datos bancarios reales; al confirmar, el pedido aparece "recibido" para el personal; no se confirma vacío ni con agotados.

### CU-04 · El cliente sigue el estado de su pedido

1. **Identificador y nombre:** cu-04-seguir-estado-pedido · El cliente sigue el estado de su pedido.
2. **Actor y objetivo:** cliente con sesión; saber en qué etapa está su pedido.
3. **Inicio y condiciones previas:** tiene al menos un pedido confirmado.
4. **Recorrido principal:** entra a "Mi pedido" → ve resumen, entrega y estado → al cambiar el personal el estado, ve el nuevo → estado final "listo para retirar" o "entregado al repartidor".
5. **Alternativas y restricciones:** sin pedidos se le ofrece ver el menú; solo ve sus propios pedidos. Etapas: recibido → en preparación → estado final según entrega.
6. **Resultado observable:** el cliente ve la etapa actual de su pedido.
7. **Criterios de aceptación:** tras confirmar se ve "recibido"; luego "en preparación" y el estado final que corresponde; retiro nunca muestra "entregado al repartidor" ni delivery "listo para retirar"; no se ven pedidos ajenos.

### CU-05 · El personal atiende los pedidos

1. **Identificador y nombre:** cu-05-atender-pedidos · El personal atiende los pedidos.
2. **Actor y objetivo:** personal del local; recibir pedidos ya armados y avisar su avance.
3. **Inicio y condiciones previas:** llega un pedido nuevo; el personal accede a su pantalla.
4. **Recorrido principal:** abre la pantalla de pedidos → ve cliente, productos, extras, total, entrega (dirección si es delivery), pago y estado → marca "en preparación" → marca "listo para retirar" o "entregado al repartidor" → el cliente lo ve.
5. **Alternativas y restricciones:** sin pedidos se ve un aviso; solo se ofrece el siguiente estado válido. El delivery externo se coordina fuera de la app.
6. **Resultado observable:** cada pedido muestra el estado asignado y el cliente lo ve.
7. **Criterios de aceptación:** un pedido confirmado aparece "recibido" con todo su detalle; se puede pasar a "en preparación" y al estado final correcto; se ve si está pagado o se paga al retirar; el cambio se refleja para el cliente.

### CU-06 · El personal gestiona el catálogo

1. **Identificador y nombre:** cu-06-gestionar-catalogo · El personal gestiona el catálogo.
2. **Actor y objetivo:** personal del local; mantener productos, combos, precios y agotados al día.
3. **Inicio y condiciones previas:** el local agrega un producto, cambia un precio o se queda sin stock; el personal accede a su pantalla.
4. **Recorrido principal:** abre el catálogo → ve hamburguesas con precio, combo y disponibilidad → agrega una con nombre, descripción, imagen, precio y precio de combo → se valida y guarda → aparece en el menú. Variantes: cambiar precio; marcar agotado o disponible.
5. **Alternativas y restricciones:** sin nombre o precio no se guarda; el precio debe ser mayor que cero; un agotado no se puede pedir.
6. **Resultado observable:** el menú del cliente refleja lo cargado por el personal.
7. **Criterios de aceptación:** una hamburguesa agregada aparece en el menú; un cambio de precio se ve en el menú y en pedidos nuevos; un agotado se ve "Agotado" y no se puede pedir, y al marcarlo disponible vuelve a poder pedirse; no se guardan productos sin nombre o con precio inválido.

## 8. Decisiones y preguntas pendientes

**Decisiones confirmadas por Damián** (detalle en `docs/proceso.md`): D1 botón "Ver menú"; D2 actores cliente y personal; D3 delivery y retiro; D4 todo lo hablado entra en la primera versión; D5 el personal marca el estado y el cliente lo ve; D6 registro obligatorio solo para pedir, con correo o Google/redes, para identificar quién pide; D7 el personal gestiona el catálogo y marca agotados, sin administrador aparte; D8 pago (delivery solo en línea, retiro en línea o en el local, en línea simulado); D9 delivery por servicio externo coordinado fuera de la app; D10 etapas del pedido; D11 separación en seis casos de uso.

**Supuestos por validar:**

- Un producto agotado se muestra marcado en vez de ocultarse (CU-01).
- Cambiar un precio no afecta a pedidos ya confirmados (CU-06).

**Preguntas abiertas** (ninguna afecta a quién usa el producto ni a su objetivo central; no impiden cerrar el alcance, pero conviene resolverlas):

| Pregunta | Casos afectados |
|---|---|
| ¿Qué datos se piden al registrarse (teléfono, dirección)? ¿Qué redes además de Google? ¿Recuperar contraseña? | CU-02, CU-03 |
| ¿La confirmación muestra número de pedido? ¿Se puede cancelar un pedido? ¿Hay costo de envío? | CU-03, CU-04, CU-05 |
| ¿El estado se actualiza solo en pantalla? ¿Hay historial de pedidos? | CU-04 |
| ¿Cómo entra el personal a su pantalla? ¿Los pedidos terminados quedan en historial? | CU-05, CU-06 |
| ¿Se pueden eliminar productos? ¿El personal gestiona también los extras y sus precios? | CU-06, CU-01, CU-03 |

## 9. Decisiones propias y uso de IA

*Texto de Damián (fuente: `docs/entregas/seccion-09-damian.md`).*

**Agente utilizado:** Utilicé Claude (Claude Code) como agente. Antes de trabajar, el agente comprobó en el proyecto `ahk --version` (3.0.0), `ahk doctor`, la skill `ahk-use-case` y una llamada real al MCP (`specs.list`); los resultados están en la sección 10.

**Decisiones y por qué:** Todo lo que definí lo quiero así porque la página web tiene que manejarse de esa forma para que el usuario sienta conformidad y tranquilidad. Los motivos de cada decisión concreta están registrados en `docs/proceso.md` y resumidos en la sección 8.

**Exclusión:** El cobro real queda fuera de esta versión porque ya es algo que está fuera de la aplicación. Lo que se trata de validar es la compra en línea realizando un simulacro, y nada más.

**Propuesta del agente que modifiqué o rechacé:** No le cambié ni rechacé ninguna propuesta al agente. Sí evalué alternativas que me presentó: para administrar el catálogo comparé un administrador aparte frente al mismo personal del local, y elegí al personal por ser lo más simple. También corregí una decisión mía: primero dije que el delivery lo haría personal del local y luego lo cambié a un servicio externo.

**Un recorrido principal y una situación alternativa:** [PENDIENTE: escribe Damián con sus palabras.]

**Qué sigue sin validar y qué ayuda recibí de la IA:** Siguen sin validar las preguntas abiertas de la sección 8 y el fallo de `ahk health` de la sección 10. La IA me ayudó siendo una guía: corroboró lo que yo decía, me ayudó a redactar mejor y a pensar mejor mis ideas, y me dio mejores opciones para elegir.

## 10. Fuentes y comprobaciones de esta fase

**Archivos fuente:** `docs/use-cases/cu-01-explorar-menu.md` … `cu-06-gestionar-catalogo.md` (identificadores en la sección 7); `docs/proceso.md` (decisiones D1–D11); `docs/entregas/seccion-09-damian.md`. Referencia previa: el sitio estático `pag_burguer` de Damián (idea, no código).

| Comprobación | Resultado | Límite |
|---|---|---|
| `ahk --version` | 3.0.0 | Solo confirma la versión del CLI. |
| Node / pnpm | Node v22.23.4 (portable), pnpm 11.17.0 | Solo versiones. |
| Plantilla en el navegador | [PENDIENTE: abrir `pnpm dev` y comprobarlo] `pnpm build` sí compila sin errores. | El build no prueba que se vea en el navegador. |
| `ahk doctor` | Archivos del agente y skills presentes; aviso de versión 3.2.0 ignorado por la consigna. | No prueba decisiones del producto. |
| MCP `specs.list` | Llamada real: respondió sin error (lista vacía al empezar; luego seis casos). | Disponibilidad del flujo, no calidad del contenido. |
| `specs.validate` tras cada escritura | `valid: true`, sin errores. | Comprueba formato y relaciones, no la conveniencia del producto. |
| `ahk health` | **Falla.** AHK 3.0.0 invoca `cmd.exe` con la ruta entre comillas escapadas y cmd no encuentra `health.bat`; ocurre con y sin espacios en la ruta. Ejecutado a mano, `health.bat` (`pnpm build`) termina con código 0. No se modificó el harness. | Pendiente de consultar al docente. |
| Lectura final del documento | [PENDIENTE: revisión de Damián] | — |
