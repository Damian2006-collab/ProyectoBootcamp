import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  /** Texto de ayuda debajo del campo (queda enlazado con aria-describedby). */
  hint?: string;
  multiline?: boolean;
  fieldRef?: Ref<HTMLInputElement & HTMLTextAreaElement>;
  /** Contenido extra entre la ayuda y el error (ej. el medidor de contraseña). */
  children?: ReactNode;
  /** Atributos extra para el <input> (ej. min, max, step). */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

// Un campo de formulario accesible: label, input, ayuda opcional y un
// <span class="field-error"> que se llena con el mensaje de error.
export default function FormField({
  id,
  label,
  value,
  onChange,
  error = '',
  type = 'text',
  autoComplete,
  hint,
  multiline = false,
  fieldRef,
  children,
  inputProps,
}: FormFieldProps) {
  const hintId = `hint-${id}`;
  const errorId = `error-${id}`;
  const common = {
    id,
    name: id,
    value,
    required: true,
    'aria-required': true,
    'aria-describedby': hint ? `${hintId} ${errorId}` : errorId,
    'aria-invalid': error ? true : false,
    ref: fieldRef,
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea {...common} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...inputProps} {...common} type={type} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && <p className="form-hint" id={hintId}>{hint}</p>}
      {children}
      <span className="field-error" id={errorId} aria-live="polite">{error}</span>
    </div>
  );
}
