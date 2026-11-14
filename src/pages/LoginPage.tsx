import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import FormField from '../components/FormField';
import FormFeedback, { INVALID_FEEDBACK } from '../components/FormFeedback';
import type { Feedback } from '../components/FormFeedback';
import { useFieldRefs } from '../hooks/useFieldRefs';
import { emailError, firstInvalid } from '../lib/validation';
import type { FieldErrors } from '../lib/validation';

type Field = 'email' | 'password';
const FIELDS: Field[] = ['email', 'password'];
const EMPTY: Record<Field, string> = { email: '', password: '' };

function validate(values: Record<Field, string>): FieldErrors<Field> {
  return {
    email: emailError(values.email),
    password: values.password ? '' : 'Ingresa tu contraseña.',
  };
}

export default function LoginPage() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const fields = useFieldRefs<Field>();

  const setField = (key: Field) => (value: string) => setValues((v) => ({ ...v, [key]: value }));

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
    setFeedback({ type: 'success', message: '¡Bienvenido de vuelta! Iniciando sesión...' });
    setValues(EMPTY);
  }

  return (
    <>
      <Seo
        title="Iniciar sesión — Dami's Burguer"
        description="Inicia sesión en tu cuenta de Dami's Burguer para hacer pedidos más rápido y seguir tu historial."
      />

      <section className="auth-section" id="iniciar-sesion" aria-labelledby="login-titulo">
        <div className="container">
          <div className="auth-card animate-on-scroll">
            <h1 id="login-titulo">Iniciar sesión</h1>
            <p>Accede a tu cuenta de Dami's Burguer para agilizar tus pedidos.</p>

            <form className="auth-form form-login" aria-labelledby="login-titulo" method="post" onSubmit={handleSubmit}>
              <FormField id="email" label="Correo electrónico" type="email" autoComplete="email"
                value={values.email} onChange={setField('email')} error={errors.email}
                fieldRef={fields.refFor('email')} />

              <FormField id="password" label="Contraseña" type="password" autoComplete="current-password"
                value={values.password} onChange={setField('password')} error={errors.password}
                fieldRef={fields.refFor('password')} />

              <button className="btn" type="submit">Iniciar sesión</button>
            </form>
            <FormFeedback feedback={feedback} />

            <p className="auth-switch">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
