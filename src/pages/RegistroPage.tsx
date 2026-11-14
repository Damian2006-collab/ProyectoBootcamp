import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import FormField from '../components/FormField';
import FormFeedback, { INVALID_FEEDBACK } from '../components/FormFeedback';
import type { Feedback } from '../components/FormFeedback';
import { useFieldRefs } from '../hooks/useFieldRefs';
import { emailError, firstInvalid, getAge, getPasswordStrength, STRENGTH_LABEL } from '../lib/validation';
import type { FieldErrors } from '../lib/validation';

const MIN_PASSWORD_LENGTH = 8;
const MIN_AGE = 13;
const MAX_AGE = 120;

type Field = 'nombre' | 'email' | 'fecha-nacimiento' | 'password' | 'confirmar-password';
const FIELDS: Field[] = ['nombre', 'email', 'fecha-nacimiento', 'password', 'confirmar-password'];
const EMPTY: Record<Field, string> = {
  nombre: '',
  email: '',
  'fecha-nacimiento': '',
  password: '',
  'confirmar-password': '',
};

function birthdateError(value: string): string {
  if (!value) return 'Ingresa tu fecha de nacimiento.';
  const age = getAge(value);
  if (age === null || age < 0 || age > MAX_AGE) return 'Ingresa una fecha de nacimiento válida.';
  if (age < MIN_AGE) return `Debes tener al menos ${MIN_AGE} años para registrarte.`;
  return '';
}

function passwordError(value: string): string {
  if (!value) return 'Crea una contraseña.';
  if (value.length < MIN_PASSWORD_LENGTH) {
    return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  if (getPasswordStrength(value) === 'weak') {
    return 'La contraseña es débil. Combina mayúsculas, minúsculas, números y símbolos.';
  }
  return '';
}

function validate(values: Record<Field, string>): FieldErrors<Field> {
  const confirm = values['confirmar-password'];
  return {
    nombre: values.nombre.trim() ? '' : 'Ingresa tu nombre.',
    email: emailError(values.email),
    'fecha-nacimiento': birthdateError(values['fecha-nacimiento']),
    password: passwordError(values.password),
    'confirmar-password': !confirm
      ? 'Confirma tu contraseña.'
      : confirm !== values.password
        ? 'Las contraseñas no coinciden.'
        : '',
  };
}

export default function RegistroPage() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const fields = useFieldRefs<Field>();

  const setField = (key: Field) => (value: string) => setValues((v) => ({ ...v, [key]: value }));

  // El medidor de fuerza se calcula en cada render a partir de la contraseña.
  const strength = values.password ? getPasswordStrength(values.password) : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const invalid = firstInvalid(FIELDS, nextErrors);
    if (invalid) {
      setFeedback(INVALID_FEEDBACK);
      fields.focus(invalid);
      return;
    }
    setFeedback({ type: 'success', message: '¡Cuenta creada correctamente! Ya puedes iniciar sesión.' });
    setValues(EMPTY);
  }

  return (
    <>
      <Seo
        title="Crear cuenta — Dami's Burguer"
        description="Crea tu cuenta en Dami's Burguer y disfruta de pedidos más rápidos y ofertas exclusivas."
      />

      <section className="auth-section" id="crear-cuenta" aria-labelledby="registro-titulo">
        <div className="container">
          <div className="auth-card animate-on-scroll">
            <h1 id="registro-titulo">Crear cuenta</h1>
            <p>Regístrate para hacer pedidos más rápido y guardar tus hamburguesas favoritas.</p>

            <form className="auth-form form-registro" aria-labelledby="registro-titulo" method="post" onSubmit={handleSubmit}>
              <FormField id="nombre" label="Nombre" autoComplete="name"
                value={values.nombre} onChange={setField('nombre')} error={errors.nombre}
                fieldRef={fields.refFor('nombre')} />

              <FormField id="email" label="Correo electrónico" type="email" autoComplete="email"
                value={values.email} onChange={setField('email')} error={errors.email}
                fieldRef={fields.refFor('email')} />

              <FormField id="fecha-nacimiento" label="Fecha de nacimiento" type="date"
                value={values['fecha-nacimiento']} onChange={setField('fecha-nacimiento')}
                error={errors['fecha-nacimiento']} fieldRef={fields.refFor('fecha-nacimiento')} />

              <FormField id="password" label="Contraseña" type="password" autoComplete="new-password"
                hint="Mínimo 8 caracteres, combinando mayúsculas, minúsculas, números y símbolos."
                value={values.password} onChange={setField('password')} error={errors.password}
                fieldRef={fields.refFor('password')}>
                <p
                  className={strength ? `password-strength password-strength--${strength}` : 'password-strength'}
                  id="password-strength"
                  aria-live="polite"
                >
                  {strength ? STRENGTH_LABEL[strength] : ''}
                </p>
              </FormField>

              <FormField id="confirmar-password" label="Confirmar contraseña" type="password" autoComplete="new-password"
                value={values['confirmar-password']} onChange={setField('confirmar-password')}
                error={errors['confirmar-password']} fieldRef={fields.refFor('confirmar-password')} />

              <button className="btn" type="submit">Crear cuenta</button>
            </form>
            <FormFeedback feedback={feedback} />

            <p className="auth-switch">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
