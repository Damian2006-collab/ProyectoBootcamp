// Reglas de validación compartidas por los formularios (contacto, login, registro).

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Mensaje de error del email, o '' si es válido. */
export function emailError(value: string): string {
  if (!value.trim()) return 'Ingresa tu correo electrónico.';
  if (!isValidEmail(value)) return 'Ingresa un correo electrónico válido (ej. nombre@correo.com).';
  return '';
}

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export const STRENGTH_LABEL: Record<PasswordStrength, string> = {
  weak: 'Fuerza: débil',
  medium: 'Fuerza: media',
  strong: 'Fuerza: fuerte',
};

export function getPasswordStrength(value: string): PasswordStrength {
  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[a-z]/.test(value)) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
}

export function getAge(dobValue: string): number | null {
  const dob = new Date(dobValue);
  if (Number.isNaN(dob.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

/** Devuelve el primer campo con error (en el orden dado), para enfocarlo. */
export function firstInvalid<K extends string>(order: K[], errors: FieldErrors<K>): K | undefined {
  return order.find((key) => Boolean(errors[key]));
}
