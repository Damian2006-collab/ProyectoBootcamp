import { useState } from 'react';
import type { FormEvent } from 'react';
import FormField from './FormField';
import FormFeedback, { INVALID_FEEDBACK } from './FormFeedback';
import type { Feedback } from './FormFeedback';
import { useFieldRefs } from '../hooks/useFieldRefs';
import { emailError, firstInvalid } from '../lib/validation';
import type { FieldErrors } from '../lib/validation';

type Field = 'nombre' | 'email' | 'mensaje';
const FIELDS: Field[] = ['nombre', 'email', 'mensaje'];
const EMPTY: Record<Field, string> = { nombre: '', email: '', mensaje: '' };

function validate(values: Record<Field, string>): FieldErrors<Field> {
  return {
    nombre: values.nombre.trim() ? '' : 'Ingresa tu nombre.',
    email: emailError(values.email),
    mensaje: values.mensaje.trim() ? '' : 'Escribe tu mensaje.',
  };
}

export default function ContactForm() {
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
    setFeedback({ type: 'success', message: '¡Gracias! Tu mensaje fue enviado correctamente.' });
    setValues(EMPTY);
  }

  return (
    <>
      <form
        className="contact-form form-contacto animate-on-scroll"
        aria-labelledby="formulario-titulo"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3 id="formulario-titulo">Envíanos un mensaje</h3>

        <FormField id="nombre" label="Nombre" autoComplete="name"
          value={values.nombre} onChange={setField('nombre')} error={errors.nombre}
          fieldRef={fields.refFor('nombre')} />

        <FormField id="email" label="Correo electrónico" type="email" autoComplete="email"
          value={values.email} onChange={setField('email')} error={errors.email}
          fieldRef={fields.refFor('email')} />

        <FormField id="mensaje" label="Mensaje" multiline hint="Cuéntanos tu pedido o consulta."
          value={values.mensaje} onChange={setField('mensaje')} error={errors.mensaje}
          fieldRef={fields.refFor('mensaje')} />

        <button className="btn" type="submit">Enviar mensaje</button>
      </form>
      <FormFeedback feedback={feedback} />
    </>
  );
}
