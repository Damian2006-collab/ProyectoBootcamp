import { useCallback, useRef, useState } from 'react';
import AccountMenu from './AccountMenu';
import { useToasts } from './useToasts';

type MenuId = 'texto' | 'icono';

// Los dos toasts de ejemplo que se ven al cargar (no desaparecen solos).
const INITIAL_TOASTS = [
  { id: 1, message: 'Recurso guardado correctamente.', variant: 'success' as const },
  { id: 2, message: 'No se pudo completar la acción.', variant: 'error' as const },
];

export default function Playground() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const { toasts, showToast } = useToasts(INITIAL_TOASTS);

  // Abrir un menú cierra el otro; cerrar solo afecta al menú que lo pide.
  const toggleMenu = (id: MenuId) => setOpenMenu((current) => (current === id ? null : id));
  const closeTexto = useCallback(() => setOpenMenu((c) => (c === 'texto' ? null : c)), []);
  const closeIcono = useCallback(() => setOpenMenu((c) => (c === 'icono' ? null : c)), []);

  return (
    <div className="layout">
      <aside className="layout__sidebar">
        <span className="eyebrow">Backoffice</span>
        <h1>Componentes</h1>
        <nav aria-label="Componentes de interacción">
          <ul>
            <li><a href="#seccion-alerts">Alerts</a></li>
            <li><a href="#seccion-botones">Botones</a></li>
            <li><a href="#seccion-checkboxes-radios">Checkboxes/Radios</a></li>
            <li><a href="#seccion-dialogs">Dialogs</a></li>
            <li><a href="#seccion-menus">Menús</a></li>
            <li><a href="#seccion-toasts">Toasts</a></li>
          </ul>
        </nav>
      </aside>

      <main className="layout__main">
        {/* 1. ALERTS */}
        <section id="seccion-alerts" className="playground-section" aria-labelledby="titulo-alerts">
          <h2 id="titulo-alerts">Alerts</h2>
          <div className="playground-section__grid">
            <div className="playground-section__demo">
              <div className="c-alert c-alert--success" role="status">
                <span className="c-alert-icon" aria-hidden="true">✅</span>
                <p className="c-alert-message">Los cambios se guardaron correctamente.</p>
                <button type="button" className="c-alert-close" aria-label="Cerrar alerta de éxito">×</button>
              </div>

              <div className="c-alert c-alert--error" role="alert">
                <span className="c-alert-icon" aria-hidden="true">⛔</span>
                <p className="c-alert-message">No se pudo guardar el recurso. Intenta de nuevo.</p>
                <button type="button" className="c-alert-close" aria-label="Cerrar alerta de error">×</button>
              </div>

              <div className="c-alert c-alert--warning" role="alert">
                <span className="c-alert-icon" aria-hidden="true">⚠️</span>
                <p className="c-alert-message">Esta acción afectará a 12 registros existentes.</p>
                <button type="button" className="c-alert-close" aria-label="Cerrar alerta de advertencia">×</button>
              </div>

              <div className="c-alert c-alert--info" role="status">
                <span className="c-alert-icon" aria-hidden="true">ℹ️</span>
                <p className="c-alert-message">El mantenimiento programado inicia a las 22:00.</p>
                <button type="button" className="c-alert-close" aria-label="Cerrar alerta informativa">×</button>
              </div>
            </div>

            <div className="playground-section__behavior">
              <h3>Comportamiento de teclado y foco</h3>
              <dl>
                <dt>Foco</dt>
                <dd>El único elemento enfocable dentro de la alerta es su botón <code>c-alert-close</code>.</dd>
                <dt>Enter / Space</dt>
                <dd>Sobre el botón de cerrar, descarta la alerta.</dd>
                <dt>Anuncio</dt>
                <dd><code>role="alert"</code> (error, advertencia) interrumpe y se anuncia de inmediato; <code>role="status"</code> (éxito, informativo) se anuncia sin interrumpir lo que el usuario esté haciendo.</dd>
                <dt>Al cerrar</dt>
                <dd>No hay un trigger previo al que volver — la alerta simplemente desaparece del flujo.</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* 2. BOTONES */}
        <section id="seccion-botones" className="playground-section" aria-labelledby="titulo-botones">
          <h2 id="titulo-botones">Botones</h2>
          <div className="playground-section__grid">
            <div className="playground-section__demo">
              <p className="demo-row-label">Habilitado — idle / hover / pressed son interactivos</p>
              <div className="demo-row">
                <button type="button" className="c-btn c-btn--primary">Guardar</button>
                <button type="button" className="c-btn c-btn--secondary">Cancelar</button>
                <button type="button" className="c-btn c-btn--destructive">Eliminar</button>
                <button type="button" className="c-btn c-btn--icon" aria-label="Más opciones">⋮</button>
              </div>

              <p className="demo-row-label">Deshabilitado</p>
              <div className="demo-row">
                <button type="button" className="c-btn c-btn--primary" disabled>Guardar</button>
                <button type="button" className="c-btn c-btn--secondary" disabled>Cancelar</button>
                <button type="button" className="c-btn c-btn--destructive" disabled>Eliminar</button>
                <button type="button" className="c-btn c-btn--icon" disabled aria-label="Más opciones">⋮</button>
              </div>
            </div>

            <div className="playground-section__behavior">
              <h3>Comportamiento de teclado y foco</h3>
              <dl>
                <dt>Tab</dt>
                <dd>Mueve el foco entre los botones en el orden del DOM.</dd>
                <dt>Enter / Space</dt>
                <dd>Activa el botón que tiene el foco.</dd>
                <dt>Icon button</dt>
                <dd>No tiene texto visible, por eso depende de <code>aria-label="Más opciones"</code> para que un lector de pantalla anuncie su propósito.</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* 3. CHECKBOXES/RADIOS */}
        <section id="seccion-checkboxes-radios" className="playground-section" aria-labelledby="titulo-checkboxes-radios">
          <h2 id="titulo-checkboxes-radios">Checkboxes / Radios</h2>
          <div className="playground-section__grid">
            <div className="playground-section__demo">
              <fieldset className="c-check-group">
                <legend>Filtrar tabla</legend>
                <label className="c-check"><input type="checkbox" name="filtro" value="activos" /> Activos</label>
                <label className="c-check"><input type="checkbox" name="filtro" value="pendientes" /> Pendientes</label>
                <label className="c-check"><input type="checkbox" name="filtro" value="archivados" /> Archivados</label>
              </fieldset>

              <fieldset className="c-radio-group">
                <legend>Ordenar por</legend>
                <label className="c-radio"><input type="radio" name="orden" value="nombre" defaultChecked /> Nombre</label>
                <label className="c-radio"><input type="radio" name="orden" value="fecha" /> Fecha</label>
                <label className="c-radio"><input type="radio" name="orden" value="estado" /> Estado</label>
              </fieldset>
            </div>

            <div className="playground-section__behavior">
              <h3>Comportamiento de teclado y foco</h3>
              <dl>
                <dt>Checkboxes — Tab</dt>
                <dd>Mueve el foco a cada checkbox de forma individual.</dd>
                <dt>Checkboxes — Space</dt>
                <dd>Alterna el estado (marcado/desmarcado) del checkbox enfocado.</dd>
                <dt>Radios — Tab</dt>
                <dd>Entra al grupo una sola vez: al radio ya marcado, o al primero si ninguno lo está.</dd>
                <dt>Radios — Flechas (↑↓ / ←→)</dt>
                <dd>Mueven el foco entre las opciones del mismo grupo y las seleccionan automáticamente.</dd>
                <dt>Radios — Space</dt>
                <dd>Selecciona la opción que tiene el foco.</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* 4. DIALOGS */}
        <section id="seccion-dialogs" className="playground-section" aria-labelledby="titulo-dialogs">
          <h2 id="titulo-dialogs">Dialogs</h2>
          <div className="playground-section__grid">
            <div className="playground-section__demo">
              <button
                ref={dialogTriggerRef}
                type="button"
                className="c-btn c-btn--destructive"
                id="btn-eliminar-recurso"
                onClick={() => dialogRef.current?.showModal()}
              >
                Eliminar recurso
              </button>

              {/* onClose cubre las tres salidas (Escape, Cancelar, Eliminar): el foco vuelve al botón. */}
              <dialog
                ref={dialogRef}
                className="c-dialog"
                id="dialog-confirmar-eliminar"
                aria-labelledby="dialog-eliminar-titulo"
                onClose={() => dialogTriggerRef.current?.focus()}
              >
                <h2 className="c-dialog-title" id="dialog-eliminar-titulo">¿Eliminar este recurso?</h2>
                <p>Esta acción no se puede deshacer.</p>
                <div className="c-dialog-actions">
                  <button type="button" className="c-btn c-btn--secondary" onClick={() => dialogRef.current?.close('cancel')}>
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="c-btn c-btn--destructive"
                    onClick={() => {
                      dialogRef.current?.close('confirm');
                      showToast('Recurso eliminado correctamente.', 'success');
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </dialog>
            </div>

            <div className="playground-section__behavior">
              <h3>Comportamiento de teclado y foco</h3>
              <dl>
                <dt>Enter / Space</dt>
                <dd>Sobre "Eliminar recurso", invoca <code>.showModal()</code> y abre el diálogo como modal real.</dd>
                <dt>Mientras está abierto</dt>
                <dd>El foco queda atrapado dentro del <code>&lt;dialog&gt;</code> (comportamiento nativo del elemento).</dd>
                <dt>Escape</dt>
                <dd>Cierra el diálogo (comportamiento nativo: dispara el evento <code>cancel</code> y luego <code>close</code>).</dd>
                <dt>Cancelar / Eliminar</dt>
                <dd>Ambos botones también lo cierran explícitamente vía <code>.close()</code>.</dd>
                <dt>Al cerrar</dt>
                <dd>Por cualquiera de las tres vías, el foco vuelve al botón "Eliminar recurso" que lo abrió.</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* 5. MENÚS */}
        <section id="seccion-menus" className="playground-section" aria-labelledby="titulo-menus">
          <h2 id="titulo-menus">Menús</h2>
          <div className="playground-section__grid">
            <div className="playground-section__demo">
              <div className="demo-row">
                <AccountMenu
                  id="texto"
                  triggerLabel="Cuenta ▾"
                  isOpen={openMenu === 'texto'}
                  onToggle={() => toggleMenu('texto')}
                  onClose={closeTexto}
                />
                <AccountMenu
                  id="icono"
                  triggerLabel="⋮"
                  ariaLabel="Más opciones"
                  iconOnly
                  isOpen={openMenu === 'icono'}
                  onToggle={() => toggleMenu('icono')}
                  onClose={closeIcono}
                />
              </div>
            </div>

            <div className="playground-section__behavior">
              <h3>Comportamiento de teclado y foco</h3>
              <dl>
                <dt>Clic (o Enter / Space)</dt>
                <dd>Sobre el trigger, abre el dropdown y pone <code>aria-expanded="true"</code>. Como el trigger es un <code>&lt;button&gt;</code>, Enter/Space lo activan de forma nativa igual que un clic.</dd>
                <dt>Escape</dt>
                <dd>Cierra el menú abierto y devuelve el foco al trigger.</dd>
                <dt>Clic afuera</dt>
                <dd>También cierra el menú, sin mover el foco.</dd>
                <dt>Un solo menú abierto</dt>
                <dd>Abrir un trigger cierra cualquier otro menú que haya quedado abierto en la página.</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* 6. TOASTS */}
        <section id="seccion-toasts" className="playground-section" aria-labelledby="titulo-toasts">
          <h2 id="titulo-toasts">Toasts</h2>
          <div className="playground-section__grid">
            <div className="playground-section__demo">
              <div className="demo-row">
                <button type="button" className="c-btn c-btn--primary" onClick={() => showToast('Recurso guardado correctamente.', 'success')}>
                  Simular guardado
                </button>
                <button type="button" className="c-btn c-btn--destructive" onClick={() => showToast('No se pudo completar la acción.', 'error')}>
                  Simular error
                </button>
              </div>

              <div className="c-toast-container" aria-live="polite" aria-atomic="false">
                {toasts.map((toast) => (
                  <div className={`c-toast c-toast--${toast.variant}`} role="status" key={toast.id}>
                    <p>{toast.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="playground-section__behavior">
              <h3>Comportamiento de teclado y foco</h3>
              <dl>
                <dt>Foco</dt>
                <dd>Los toasts no son foco-interactivos: nunca reciben el foco ni se lo roban a lo que el usuario esté haciendo.</dd>
                <dt>Anuncio</dt>
                <dd>Se anuncian solos a través del <code>aria-live="polite"</code> del <code>c-toast-container</code>.</dd>
                <dt>Ciclo de vida</dt>
                <dd>Desaparecen automáticamente después de unos segundos, sin acción del usuario.</dd>
                <dt>Límite</dt>
                <dd>Máximo 3 toasts visibles a la vez — al agregar un cuarto, se quita primero el más antiguo.</dd>
              </dl>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
