// API del recomendador con IA de Dami's Burguer.
// Recibe los gustos del cliente, pide a Gemini una recomendación en JSON
// usando solo productos del menú y valida la respuesta antes de devolverla.
// La clave GEMINI_API_KEY vive solo en backend/.env (fuera del repositorio).
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { z } from 'zod/v4'
import { MENU_COMPLETO } from '../src/datos/menuCompleto.ts'

const PRODUCTOS = MENU_COMPLETO.flatMap((c) => c.productos)
const IDS = PRODUCTOS.map((p) => p.id)

const esquemaEntrada = z.object({
  gustos: z.string().trim().min(10).max(300),
  presupuesto: z.number().min(5).max(60),
  sinCarne: z.boolean(),
})

const esquemaRespuesta = z.object({
  resumen: z.string().trim().min(1).max(400),
  recomendaciones: z.array(z.object({
    productoId: z.enum(IDS),
    motivo: z.string().trim().min(1).max(240),
    coincidencia: z.number().int().min(0).max(100),
  })).min(1).max(3),
  consejo: z.string().trim().min(1).max(240),
})

// Esquema de salida que se le exige a Gemini (formato OpenAPI de la API de Gemini)
const ESQUEMA_GEMINI = {
  type: 'OBJECT',
  properties: {
    resumen: { type: 'STRING' },
    recomendaciones: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          productoId: { type: 'STRING', enum: IDS },
          motivo: { type: 'STRING' },
          coincidencia: { type: 'INTEGER' },
        },
        required: ['productoId', 'motivo', 'coincidencia'],
      },
    },
    consejo: { type: 'STRING' },
  },
  required: ['resumen', 'recomendaciones', 'consejo'],
}

function construirPrompt({ gustos, presupuesto, sinCarne }) {
  const menu = PRODUCTOS.map((p) => `- ${p.id}: ${p.nombre} (${p.etiqueta}, $${p.precio}) — ${p.descripcion}`).join('\n')
  return `Eres el asistente de Dami's Burguer, una hamburguesería artesanal. Recomienda entre 1 y 3 productos del menú para este cliente.

Menú (usa solo estos productoId):
${menu}

Cliente:
- Gustos: ${gustos}
- Presupuesto por persona: $${presupuesto} (el producto principal debe costar eso o menos)
- Sin carne: ${sinCarne ? 'sí, no recomiendes nada con carne ni bacon' : 'no'}

Responde en español con un JSON con: "resumen" (una o dos frases sobre lo que busca el cliente), "recomendaciones" (lista de 1 a 3 con "productoId", "motivo" de una frase y "coincidencia" de 0 a 100) y "consejo" (una frase corta). Sin texto fuera del JSON.`
}

const app = express()
app.use(cors({ origin: process.env.ORIGEN_PERMITIDO || 'http://localhost:5173' }))
app.use(express.json({ limit: '10kb' }))

app.get('/api/salud', (_req, res) => res.json({ ok: true, modelo: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite' }))

app.post('/api/recomendacion', async (req, res) => {
  const entrada = esquemaEntrada.safeParse(req.body)
  if (!entrada.success) return res.status(400).json({ error: 'Los datos enviados no son válidos.', issues: entrada.error.issues })
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'El servidor no tiene configurada la clave de Gemini.' })

  try {
    const modelo = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'
    const respuesta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelo)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: construirPrompt(entrada.data) }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: ESQUEMA_GEMINI, temperature: 0.5 },
      }),
      signal: AbortSignal.timeout(25000),
    })
    const cuerpo = await respuesta.json()
    if (!respuesta.ok) return res.status(502).json({ error: `El servicio de IA rechazó la solicitud (código ${respuesta.status}). Inténtalo de nuevo.` })

    const texto = cuerpo.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || ''
    let json
    try { json = JSON.parse(texto) } catch { return res.status(502).json({ error: 'La IA devolvió un texto que no es JSON.' }) }

    const valida = esquemaRespuesta.safeParse(json)
    if (!valida.success) return res.status(422).json({ error: 'La IA devolvió una recomendación que no cumple el formato esperado.' })
    return res.json(valida.data)
  } catch (error) {
    return res.status(502).json({ error: error.name === 'TimeoutError' ? 'La IA tardó demasiado en responder.' : 'No se pudo contactar con el servicio de IA.' })
  }
})

const PUERTO = Number(process.env.PORT || 3001)
app.listen(PUERTO, () => console.log(`API de Dami's Burguer en http://localhost:${PUERTO}`))
