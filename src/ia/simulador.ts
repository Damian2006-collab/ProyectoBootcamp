import { PRODUCTOS, type EntradaIA } from './esquemas'

// Simulador (mock) del servicio de IA. Se usa en el sitio publicado en S3,
// que no tiene backend. Devuelve la misma forma de JSON que el backend con
// Gemini, a partir de reglas sencillas sobre el menú.
//
// Para demostrar el manejo de errores sin tocar el código:
//   ?ia=caida     simula que el servicio no responde
//   ?ia=invalida  simula una respuesta que no cumple el esquema

const PALABRAS: Record<string, string[]> = {
  'clasica-damis': ['clasic', 'tradicional', 'sencill', 'cheddar', 'normal'],
  'doble-queso': ['queso', 'doble', 'hambre', 'grande', 'contundente'],
  'bbq-smoke': ['bbq', 'barbacoa', 'ahumad', 'bacon', 'tocino'],
  'bacon-especial': ['bacon', 'tocino', 'picante', 'chipotle', 'aros', 'crujiente'],
  'veggie-garden': ['veggie', 'vegetarian', 'sin carne', 'aguacate', 'liger', 'saludable'],
  'portobello-grill': ['portobello', 'champiñ', 'hongo', 'vegetarian', 'pesto', 'cabra'],
  'gaseosa': ['gaseosa', 'cola', 'refresco'],
  'limonada': ['limonada', 'natural', 'fresc', 'citric'],
  'malteada': ['malteada', 'dulce', 'chocolate', 'postre', 'vainilla'],
  'papas-fritas': ['papas', 'acompañ', 'crujiente'],
  'aros-cebolla': ['aros', 'cebolla', 'crujiente'],
  'nachos-damis': ['nachos', 'picante', 'jalapeñ', 'guacamole', 'compartir'],
}

const SIN_CARNE = new Set(['veggie-garden', 'portobello-grill', 'gaseosa', 'limonada', 'malteada', 'papas-fritas', 'aros-cebolla', 'nachos-damis'])

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function simularIA(entrada: EntradaIA, modoPrueba: string | null): Promise<unknown> {
  await esperar(900)
  if (modoPrueba === 'caida') throw new TypeError('Failed to fetch')
  if (modoPrueba === 'invalida') return { resumen: '', recomendaciones: [{ productoId: 'pizza', coincidencia: 'mucha' }] }

  const texto = entrada.gustos.toLowerCase()
  const candidatos = PRODUCTOS
    .filter((p) => !entrada.sinCarne || SIN_CARNE.has(p.id))
    .filter((p) => p.precio <= entrada.presupuesto)
    .map((p) => {
      const aciertos = (PALABRAS[p.id] ?? []).filter((palabra) => texto.includes(palabra))
      const base = p.etiqueta === 'Bebida' || p.etiqueta === 'Complemento' ? 40 : 55
      return { p, aciertos, puntos: Math.min(98, base + aciertos.length * 15) }
    })
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 3)

  if (candidatos.length === 0) {
    return {
      resumen: `Con $${entrada.presupuesto} no alcanza para ningún producto que encaje con lo que pides.`,
      recomendaciones: [{ productoId: 'papas-fritas', motivo: 'Es lo más económico del menú.', coincidencia: 20 }],
      consejo: 'Sube un poco el presupuesto para ver hamburguesas.',
    }
  }

  return {
    resumen: `Según tus gustos y un presupuesto de $${entrada.presupuesto}${entrada.sinCarne ? ', sin carne' : ''}, esto es lo que mejor te va.`,
    recomendaciones: candidatos.map(({ p, aciertos, puntos }) => ({
      productoId: p.id,
      motivo: aciertos.length > 0
        ? `Coincide con lo que buscas (${aciertos.join(', ')}): ${p.descripcion}`
        : `Una opción segura dentro de tu presupuesto: ${p.descripcion}`,
      coincidencia: puntos,
    })),
    consejo: 'Acompáñala con una Limonada Natural si quieres algo fresco.',
  }
}
