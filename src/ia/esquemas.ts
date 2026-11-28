import { z } from 'zod/v4'
import { MENU_COMPLETO } from '../datos/menuCompleto'

// Contrato del recomendador con IA: qué se envía al servicio y qué se acepta
// como respuesta. El frontend valida las dos cosas; el backend también.

export const PRODUCTOS = MENU_COMPLETO.flatMap((c) => c.productos)
const IDS = PRODUCTOS.map((p) => p.id) as [string, ...string[]]

export const GUSTOS_MIN = 10
export const GUSTOS_MAX = 300
export const PRESUPUESTO_MIN = 5
export const PRESUPUESTO_MAX = 60

export const esquemaEntradaIA = z.object({
  gustos: z
    .string()
    .trim()
    .min(GUSTOS_MIN, { error: `Cuéntanos un poco más de tus gustos (mínimo ${GUSTOS_MIN} caracteres).` })
    .max(GUSTOS_MAX, { error: `Resume tus gustos en ${GUSTOS_MAX} caracteres como máximo.` }),
  presupuesto: z
    .number({ error: 'Indica tu presupuesto en dólares.' })
    .min(PRESUPUESTO_MIN, { error: `El presupuesto mínimo es $${PRESUPUESTO_MIN}.` })
    .max(PRESUPUESTO_MAX, { error: `El presupuesto máximo es $${PRESUPUESTO_MAX}.` }),
  sinCarne: z.boolean(),
})

export type EntradaIA = z.infer<typeof esquemaEntradaIA>

export const esquemaRespuestaIA = z.object({
  resumen: z.string().trim().min(1).max(400),
  recomendaciones: z
    .array(
      z.object({
        productoId: z.enum(IDS),
        motivo: z.string().trim().min(1).max(240),
        coincidencia: z.number().int().min(0).max(100),
      }),
    )
    .min(1)
    .max(3),
  consejo: z.string().trim().min(1).max(240),
})

export type RespuestaIA = z.infer<typeof esquemaRespuestaIA>
