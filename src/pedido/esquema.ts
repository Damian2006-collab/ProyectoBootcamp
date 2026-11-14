import { z } from 'zod/v4'
import { buscarHamburguesa, IDS_HAMBURGUESAS, type Hamburguesa } from '../catalogo'

export const CANTIDAD_MINIMA = 1
export const CANTIDAD_MAXIMA = 5
export const ENTREGA = 'Retiro en el local'

// Reglas del formulario: una hamburguesa del catálogo, nombre de al menos
// dos caracteres y cantidad entera de 1 a 5.
export const esquemaPedido = z.object({
  hamburguesa: z.enum(IDS_HAMBURGUESAS, { error: 'Elige una hamburguesa del catálogo' }),
  nombre: z.string().trim().min(2, { error: 'Escribe tu nombre (al menos 2 caracteres)' }),
  cantidad: z
    .number({ error: `Elige una cantidad de ${CANTIDAD_MINIMA} a ${CANTIDAD_MAXIMA}` })
    .int({ error: 'La cantidad debe ser un número entero' })
    .min(CANTIDAD_MINIMA, { error: `La cantidad mínima es ${CANTIDAD_MINIMA}` })
    .max(CANTIDAD_MAXIMA, { error: `La cantidad máxima es ${CANTIDAD_MAXIMA}` }),
})

// Valores tal como los guarda el formulario (vacíos al empezar).
export interface ValoresPedido {
  hamburguesa: string
  nombre: string
  cantidad: number | string
}

export const VALORES_INICIALES: ValoresPedido = { hamburguesa: '', nombre: '', cantidad: 1 }

export interface ResumenPedido {
  hamburguesa: Hamburguesa
  cantidad: number
  nombre: string
  total: number
  entrega: typeof ENTREGA
}

// Devuelve el resumen solo si el pedido cumple todas las reglas.
export function armarResumen(valores: ValoresPedido): ResumenPedido | null {
  const resultado = esquemaPedido.safeParse(valores)
  if (!resultado.success) return null
  const hamburguesa = buscarHamburguesa(resultado.data.hamburguesa)
  if (!hamburguesa) return null
  const { cantidad, nombre } = resultado.data
  return { hamburguesa, cantidad, nombre, total: hamburguesa.precio * cantidad, entrega: ENTREGA }
}
