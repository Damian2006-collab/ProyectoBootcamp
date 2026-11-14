export interface Feedback {
  type: 'success' | 'error';
  message: string;
}

// Mensaje general debajo del formulario (éxito o "revisa los campos").
export default function FormFeedback({ feedback }: { feedback: Feedback | null }) {
  const className = feedback ? `form-feedback form-feedback--${feedback.type}` : 'form-feedback';
  return (
    <div className={className} role="status" aria-live="polite">
      {feedback?.message}
    </div>
  );
}

export const INVALID_FEEDBACK: Feedback = {
  type: 'error',
  message: 'Revisa los campos marcados en rojo.',
};
