import { z } from 'zod/v4'

// Las mismas reglas y mensajes de los formularios de la página anterior
// (pag_burguer/ts: contacto.ts, login.ts y registro.ts), ahora con Zod.

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const correo = z
  .string()
  .trim()
  .min(1, { error: 'Ingresa tu correo electrónico.' })
  .regex(CORREO, { error: 'Ingresa un correo electrónico válido (ej. nombre@correo.com).' })

export const esquemaContacto = z.object({
  nombre: z.string().trim().min(1, { error: 'Ingresa tu nombre.' }),
  email: correo,
  mensaje: z.string().trim().min(1, { error: 'Escribe tu mensaje.' }),
})

export const esquemaLogin = z.object({
  email: correo,
  password: z.string().min(1, { error: 'Ingresa tu contraseña.' }),
})

export const CONTRASENA_MINIMA = 8
export const EDAD_MINIMA = 13
const EDAD_MAXIMA = 120

export type Fuerza = 'debil' | 'media' | 'fuerte'
export const NOMBRE_FUERZA: Record<Fuerza, string> = {
  debil: 'Fuerza: débil',
  media: 'Fuerza: media',
  fuerte: 'Fuerza: fuerte',
}

export function fuerzaContrasena(valor: string): Fuerza {
  let puntos = 0
  if (valor.length >= 8) puntos++
  if (valor.length >= 12) puntos++
  if (/[a-z]/.test(valor)) puntos++
  if (/[A-Z]/.test(valor)) puntos++
  if (/[0-9]/.test(valor)) puntos++
  if (/[^A-Za-z0-9]/.test(valor)) puntos++
  if (puntos <= 2) return 'debil'
  if (puntos <= 4) return 'media'
  return 'fuerte'
}

export function edad(fecha: string, hoy = new Date()): number | null {
  const nacimiento = new Date(fecha)
  if (Number.isNaN(nacimiento.getTime())) return null
  let anios = hoy.getFullYear() - nacimiento.getFullYear()
  const meses = hoy.getMonth() - nacimiento.getMonth()
  if (meses < 0 || (meses === 0 && hoy.getDate() < nacimiento.getDate())) anios--
  return anios
}

export const esquemaRegistro = z
  .object({
    nombre: z.string().trim().min(1, { error: 'Ingresa tu nombre.' }),
    email: correo,
    nacimiento: z
      .string()
      .min(1, { error: 'Ingresa tu fecha de nacimiento.' })
      .refine((f) => {
        const a = edad(f)
        return a !== null && a >= 0 && a <= EDAD_MAXIMA
      }, { error: 'Ingresa una fecha de nacimiento válida.' })
      .refine((f) => (edad(f) ?? 0) >= EDAD_MINIMA, { error: `Debes tener al menos ${EDAD_MINIMA} años para registrarte.` }),
    password: z
      .string()
      .min(1, { error: 'Crea una contraseña.' })
      .min(CONTRASENA_MINIMA, { error: `La contraseña debe tener al menos ${CONTRASENA_MINIMA} caracteres.` })
      .refine((v) => fuerzaContrasena(v) !== 'debil', { error: 'La contraseña es débil. Combina mayúsculas, minúsculas, números y símbolos.' }),
    confirmar: z.string().min(1, { error: 'Confirma tu contraseña.' }),
  })
  .refine((v) => v.confirmar === '' || v.confirmar === v.password, {
    error: 'Las contraseñas no coinciden.',
    path: ['confirmar'],
    // que se compruebe aunque otros campos tengan errores
    when: () => true,
  })
