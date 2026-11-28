import { esquemaEntradaIA, esquemaRespuestaIA, type EntradaIA, type RespuestaIA } from './esquemas'
import { simularIA } from './simulador'

// Cliente del servicio de IA. Configuración pública (sin claves):
//   VITE_IA_MODO = 'api'  -> llama al backend con Gemini en VITE_IA_URL
//   VITE_IA_MODO = 'mock' -> usa el simulador local (por defecto, sitio en S3)
//   VITE_IA_URL           -> URL base del backend (por defecto '/api')
// La clave de Gemini vive solo en backend/.env, nunca en el frontend.

export const MODO_IA: 'api' | 'mock' = import.meta.env.VITE_IA_MODO === 'api' ? 'api' : 'mock'
const URL_IA = (import.meta.env.VITE_IA_URL ?? '/api').replace(/\/$/, '')
const TIEMPO_MAXIMO_MS = 30000

export type ResultadoIA =
  | { ok: true; datos: RespuestaIA; origen: 'gemini' | 'simulador' }
  | { ok: false; mensaje: string }

async function llamarBackend(entrada: EntradaIA): Promise<unknown> {
  const respuesta = await fetch(`${URL_IA}/recomendacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entrada),
    signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS),
  })
  const cuerpo: unknown = await respuesta.json().catch(() => null)
  if (!respuesta.ok) {
    const mensaje = typeof cuerpo === 'object' && cuerpo && 'error' in cuerpo ? String(cuerpo.error) : null
    throw new Error(mensaje ?? `El servicio de IA no está disponible en este momento (código ${respuesta.status}). Inténtalo más tarde.`)
  }
  return cuerpo
}

export async function pedirRecomendacion(entradaSinValidar: unknown): Promise<ResultadoIA> {
  // 1. Validar la entrada antes de enviarla
  const entrada = esquemaEntradaIA.safeParse(entradaSinValidar)
  if (!entrada.success) return { ok: false, mensaje: entrada.error.issues[0]?.message ?? 'Revisa los datos del formulario.' }

  // 2. Llamar al servicio sin dejar que un fallo rompa la página
  let cuerpo: unknown
  try {
    cuerpo = MODO_IA === 'api'
      ? await llamarBackend(entrada.data)
      : await simularIA(entrada.data, new URLSearchParams(window.location.search).get('ia'))
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      return { ok: false, mensaje: 'El servicio de IA tardó demasiado en responder. Inténtalo de nuevo en unos segundos.' }
    }
    if (error instanceof TypeError) {
      return { ok: false, mensaje: 'No pudimos conectar con el servicio de IA. Revisa tu conexión o inténtalo más tarde.' }
    }
    return { ok: false, mensaje: error instanceof Error ? error.message : 'El servicio de IA no está disponible ahora mismo.' }
  }

  // 3. Validar la respuesta antes de mostrarla
  const respuesta = esquemaRespuestaIA.safeParse(cuerpo)
  if (!respuesta.success) {
    console.warn('Respuesta de IA descartada por no cumplir el esquema:', respuesta.error.issues)
    return { ok: false, mensaje: 'La IA devolvió una recomendación con un formato inválido, así que no la mostramos. Inténtalo de nuevo.' }
  }
  return { ok: true, datos: respuesta.data, origen: MODO_IA === 'api' ? 'gemini' : 'simulador' }
}
