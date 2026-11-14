import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import Seo from '../components/Seo';
import FormField from '../components/FormField';
import FormFeedback, { INVALID_FEEDBACK } from '../components/FormFeedback';
import OrderSummary from '../components/OrderSummary';
import type { Order } from '../components/OrderSummary';
import {
  burgerError,
  formatOrderPrice,
  MAX_QTY,
  MIN_QTY,
  nameError,
  ORDER_BURGERS,
  parseQty,
  qtyError,
} from '../data/pedido';

type Step = 'form' | 'review' | 'received';
type Field = 'hamburguesa' | 'nombre' | 'cantidad';
type Errors = Partial<Record<Field, string>>;

interface FormValues {
  burgerId: string;
  name: string;
  qty: string;
}

const EMPTY_FORM: FormValues = { burgerId: '', name: '', qty: '1' };

const CONFIRMED_KEY = 'damisburguer_pedidos';

function readConfirmed(): Order[] {
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(CONFIRMED_KEY) ?? '[]');
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

function validate(values: FormValues): Errors {
  return {
    hamburguesa: burgerError(values.burgerId),
    nombre: nameError(values.name),
    cantidad: qtyError(values.qty),
  };
}

/** Arma el pedido si los datos son válidos; si no, devuelve null. */
function buildOrder(values: FormValues): Order | null {
  const burger = ORDER_BURGERS.find((b) => b.id === values.burgerId);
  const quantity = parseQty(values.qty);
  if (!burger || quantity === null || nameError(values.name)) return null;
  return { burger, quantity, total: burger.price * quantity, name: values.name.trim() };
}

export default function MenuPage() {
  // Todo vive en el estado de la página: se conserva mientras esté abierta.
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState<Step>('form');
  // Pedidos confirmados: se guardan en sessionStorage, así siguen ahí al
  // recargar o al cambiar de página mientras la pestaña siga abierta.
  const [confirmed, setConfirmed] = useState<Order[]>(readConfirmed);

  useEffect(() => {
    sessionStorage.setItem(CONFIRMED_KEY, JSON.stringify(confirmed));
  }, [confirmed]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const reviewBtnRef = useRef<HTMLButtonElement>(null);
  const firstRadioRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const qtyRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const order = buildOrder(values);
  const selected = ORDER_BURGERS.find((b) => b.id === values.burgerId);
  const qty = parseQty(values.qty);
  const lastConfirmed = confirmed[confirmed.length - 1];

  // El cuadro de resumen es un <dialog> nativo: se abre como modal al
  // revisar y se cierra al volver al formulario.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (step !== 'form' && !dialog.open) dialog.showModal();
    if (step === 'form' && dialog.open) dialog.close();
  }, [step]);

  function setField<K extends keyof FormValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function focusFirstInvalid(nextErrors: Errors) {
    if (nextErrors.hamburguesa) firstRadioRef.current?.focus();
    else if (nextErrors.nombre) nameRef.current?.focus();
    else if (nextErrors.cantidad) qtyRef.current?.focus();
  }

  // "Revisar pedido": solo abre el resumen si todo es válido.
  function handleReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (nextErrors.hamburguesa || nextErrors.nombre || nextErrors.cantidad) {
      focusFirstInvalid(nextErrors);
      return;
    }
    setStep('review');
  }

  // "Volver": cierra el resumen sin tocar los datos del formulario.
  function backToForm() {
    setStep('form');
  }

  function confirmOrder() {
    const current = buildOrder(values);
    if (!current) {
      // No debería pasar (se validó al revisar), pero nunca se confirma algo inválido.
      setStep('form');
      return;
    }
    setConfirmed((list) => [...list, current]);
    setStep('received');
  }

  // Tras confirmar, cerrar el cuadro deja el formulario listo para otro pedido.
  function startNewOrder() {
    setValues(EMPTY_FORM);
    setErrors({});
    setStep('form');
  }

  function handleDialogClose() {
    // Cubre también Escape: en revisión equivale a "Volver".
    if (step === 'received') startNewOrder();
    else setStep('form');
    reviewBtnRef.current?.focus();
  }

  const hasErrors = Boolean(errors.hamburguesa || errors.nombre || errors.cantidad);
  const shownOrder = step === 'received' ? lastConfirmed : order;

  return (
    <>
      <Seo
        title="Menú — Dami's Burguer"
        description="Dami's Burguer — Nuestro menú: Clásica, Queso y Doble. Elige tu hamburguesa, la cantidad y tu nombre, y retírala en el local."
      />

      <section aria-labelledby="pedido-titulo">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h1 id="pedido-titulo">Nuestro menú</h1>
            <p>Tres hamburguesas a precio fijo. Elige una, cuántas quieres y tu nombre, y la retiras en el local.</p>
          </header>

          <form className="order-layout" noValidate onSubmit={handleReview} aria-labelledby="pedido-titulo">
            <fieldset className="order-catalog animate-on-scroll">
              <legend>1. Elige tu hamburguesa</legend>
              {ORDER_BURGERS.map((burger, i) => (
                <label className="order-option" key={burger.id}>
                  <input
                    ref={i === 0 ? firstRadioRef : undefined}
                    type="radio"
                    name="hamburguesa"
                    value={burger.id}
                    checked={values.burgerId === burger.id}
                    onChange={() => setField('burgerId', burger.id)}
                    aria-describedby="error-hamburguesa"
                    aria-invalid={errors.hamburguesa ? true : false}
                  />
                  <img src={burger.image} alt="" width={72} height={72} loading="lazy" />
                  <span className="order-option__text">
                    <span className="order-option__name">{burger.name}</span>
                    <span className="order-option__desc">{burger.description}</span>
                  </span>
                  <span className="order-option__price">{formatOrderPrice(burger.price)}</span>
                </label>
              ))}
              <span className="field-error" id="error-hamburguesa" aria-live="polite">{errors.hamburguesa}</span>
            </fieldset>

            <div className="contact-form order-form animate-on-scroll">
              <h2 className="order-form__title">2. Tus datos</h2>

              <FormField
                id="nombre"
                label="Tu nombre"
                autoComplete="name"
                hint="Al menos 2 caracteres. Lo usamos para llamarte al retirar."
                value={values.name}
                onChange={(v) => setField('name', v)}
                error={errors.nombre}
                fieldRef={nameRef}
              />

              <FormField
                id="cantidad"
                label={`Cantidad (de ${MIN_QTY} a ${MAX_QTY})`}
                type="number"
                hint="Un solo tipo de hamburguesa por pedido."
                value={values.qty}
                onChange={(v) => setField('qty', v)}
                error={errors.cantidad}
                fieldRef={qtyRef}
                inputProps={{ min: MIN_QTY, max: MAX_QTY, step: 1, inputMode: 'numeric' }}
              />

              <p className="order-total" aria-live="polite">
                {selected && qty !== null ? (
                  <>
                    <span className="order-total__calc">{qty} × {formatOrderPrice(selected.price)}</span>
                    Total: {formatOrderPrice(selected.price * qty)}
                  </>
                ) : (
                  'Total: —'
                )}
              </p>

              <button className="btn" type="submit" ref={reviewBtnRef}>Revisar pedido</button>
              <FormFeedback feedback={hasErrors ? INVALID_FEEDBACK : null} />
            </div>
          </form>

          {/* Sin animate-on-scroll: esa animación solo se activa al cargar la
              página, y esta lista cambia después, así que quedaría invisible. */}
          <div className="cart-summary order-history" id="pedidos-recibidos">
            <h2>Pedidos recibidos</h2>
            {confirmed.length === 0 ? (
              <p className="cart-summary__empty">Todavía no confirmaste ningún pedido.</p>
            ) : (
              <ul className="cart-summary__list" role="list">
                {confirmed.map((o, i) => (
                  <li className="cart-summary__item" key={i}>
                    <span className="cart-summary__item-name">{o.name}: {o.burger.name} × {o.quantity}</span>
                    <span className="cart-summary__item-price">{formatOrderPrice(o.total)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="order-dialog"
        aria-labelledby="order-dialog-title"
        onClose={handleDialogClose}
      >
        {shownOrder && (
          <>
            <h2
              id="order-dialog-title"
              className={step === 'received' ? 'order-dialog__received' : undefined}
              aria-live="polite"
            >
              {step === 'received' ? 'Pedido recibido en esta demostración' : 'Revisa tu pedido'}
            </h2>
            <OrderSummary order={shownOrder} />
            <div className="order-dialog__actions">
              {step === 'review' ? (
                <>
                  <button type="button" className="btn btn--outline" onClick={backToForm}>Volver</button>
                  <button type="button" className="btn" onClick={confirmOrder}>Confirmar pedido</button>
                </>
              ) : (
                <button type="button" className="btn" onClick={startNewOrder}>Hacer otro pedido</button>
              )}
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
