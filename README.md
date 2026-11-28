# Dami's Burguer

Aplicación web de una hamburguesería artesanal hecha con React, TypeScript, Vite y Mantine. Incluye catálogo, pedidos, formularios validados con Zod y un **recomendador con IA** que sugiere productos del menú según los gustos y el presupuesto del cliente.

- Sitio publicado en Amazon S3: http://damis-burguer-damian.s3-website-us-east-1.amazonaws.com
- Repositorio: https://github.com/Damian2006-collab/ProyectoBootcamp

## Instalación

Requisitos: Node.js 22 LTS (22.18 o superior) y npm. El frontend usa pnpm, que se instala con npm.

```bash
npm install --global pnpm@11.17.0
pnpm install          # dependencias del frontend
pnpm dev              # ejecutar en local en http://localhost:5173
pnpm run lint         # validación con ESLint
pnpm build            # build de producción en dist/
```

Backend con IA (opcional, solo para usar Gemini en local), en una segunda terminal:

```bash
cd backend
npm install
cp .env.example .env  # en PowerShell: Copy-Item .env.example .env
# editar backend/.env y poner tu GEMINI_API_KEY
npm run dev           # API en http://localhost:3001
```

Para que el frontend use ese backend, crea `.env.local` en la raíz con `VITE_IA_MODO=api`. Sin ese archivo, la app usa el simulador.

## Configuración pública

Variables del frontend (ver `.env.example`). Son públicas: terminan dentro del JavaScript que se descarga el navegador, así que nunca llevan claves.

| Variable | Valores | Uso |
|---|---|---|
| `VITE_IA_MODO` | `mock` (por defecto) o `api` | `mock` usa el simulador incluido en la app; `api` llama al backend con Gemini |
| `VITE_IA_URL` | por defecto `/api` | URL base del backend. En local, Vite reenvía `/api` a `http://localhost:3001` |

Variables del backend (ver `backend/.env.example`): `GEMINI_MODEL` (por defecto `gemini-3.5-flash-lite`), `PORT` (3001) y `ORIGEN_PERMITIDO` (origen admitido por CORS). La clave `GEMINI_API_KEY` es secreta: va solo en `backend/.env`, que está en `.gitignore` y no se sube al repositorio ni llega al frontend.

En GitHub, el despliegue usa **Secrets** para las credenciales temporales de AWS Academy (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`) y **Variables** para `S3_BUCKET` (`damis-burguer-damian`) y `AWS_REGION` (`us-east-1`).

## Arquitectura

- **Frontend:** la aplicación React en `src/` (páginas, componentes Mantine, rutas con React Router y estado con Zustand). El build genera solo archivos estáticos en `dist/` (HTML, JS, CSS e imágenes); no contiene el backend.
- **Backend / API:** `backend/server.js`, un servidor Node.js con Express que expone `POST /api/recomendacion`. Valida la entrada con Zod, arma el prompt con el menú real (`src/datos/menuCompleto.ts`), llama a Gemini pidiendo JSON con un esquema fijo y vuelve a validar la respuesta antes de devolverla.
- **Proveedor de IA:** Google Gemini (API Generative Language), modelo `gemini-3.5-flash-lite`.
- **Simulador (mock):** `src/ia/simulador.ts` devuelve la misma forma de JSON a partir de reglas sobre el menú. Es lo que usa el sitio publicado en S3, que no tiene backend. Para demostrar errores: `/recomendador?ia=caida` (servicio caído) y `/recomendador?ia=invalida` (respuesta que no cumple el esquema).
- **Validación y errores:** `src/ia/esquemas.ts` define con Zod la entrada y la respuesta. `src/ia/servicio.ts` valida la entrada antes de enviarla, captura fallos de red y tiempos de espera, y descarta respuestas inválidas; la página muestra un mensaje controlado en lugar de romperse.

Del `git push` a la publicación (`.github/workflows/ci.yml`):

1. **Disparo:** cada pull request hacia `main` (al abrirlo o actualizarlo) y cada push a `main`.
2. **Instalación:** el job *Lint y build de React* descarga el código, prepara Node.js 22 y pnpm e instala las dependencias con `pnpm install --frozen-lockfile`.
3. **Validación y build:** ejecuta ESLint y `pnpm build` (`tsc -b` + `vite build`).
4. **Artifact:** sube `dist/` como artifact `dist` con `actions/upload-artifact`.
5. **Despliegue:** el job *Desplegar en Amazon S3* depende del build (`needs: build`) y solo corre en `main`, nunca en pull requests. Descarga el artifact, se autentica con `aws-actions/configure-aws-credentials` y ejecuta `aws s3 sync dist s3://$S3_BUCKET --delete`.
6. **Hosting:** el bucket tiene alojamiento de sitio web estático (`index.html` como documento de índice y de error) y una política de lectura pública.
7. **CDN:** no se usa. El sitio se sirve directamente desde el endpoint web de S3, sin CloudFront.

## Limitaciones

- El endpoint de sitio web de S3 solo sirve HTTP. Para HTTPS y caché en CDN haría falta CloudFront delante del bucket, que no se configuró.
- El backend con Gemini no está desplegado: funciona solo en local. El sitio en S3 usa el simulador, porque el backend solo corre en el equipo de desarrollo y publicarlo requeriría un servicio aparte con HTTPS (y guardar ahí la clave de Gemini).
- Las credenciales de AWS Academy Learner Lab son temporales: caducan al cerrar la sesión del laboratorio y hay que volver a copiarlas en los Secrets de GitHub; si no, el job de despliegue falla al autenticarse.
- Al abrir directamente una ruta como `/menu`, S3 devuelve `index.html` como documento de error: la app carga bien, pero la respuesta HTTP lleva código 404. Reescribir a 200 también requiere CloudFront.
- La disponibilidad de modelos de Gemini cambia con el tiempo (por ejemplo, `gemini-2.5-flash` ya no está disponible para claves nuevas); si falla, hay que cambiar `GEMINI_MODEL`.
- El recomendador solo conoce los productos de `src/datos/menuCompleto.ts`; no tiene en cuenta stock, alérgenos ni historial de pedidos.
