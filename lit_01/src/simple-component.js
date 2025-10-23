const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      box-sizing: border-box;
      max-width: 1000px;
      margin: 1rem auto;
      padding: 1rem;
      border: 1px solid rgba(0,0,0,0.08);
      border-radius: 8px;
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      transition: box-shadow 160ms ease-in-out;
      font-family: system-ui, sans-serif;
    }

    :host(:hover) {
      box-shadow: 0 6px 18px rgba(2,6,23,0.06);
    }

    button {
        background: none;
        border: none;
        width: 100%;
        height: 100%;
    }

    .container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      align-items: start;
    }

    ::slotted([slot="header"]) {
      grid-column: 1 / -1;
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
    }

    .card {
      padding: 0.75rem;
      border-radius: 6px;
      border: 1px solid rgba(0,0,0,0.04);
      background: rgba(255,255,255,0.03);
    }

    /* Mini grid demo dentro del contador */
    .inner-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
      gap: 6px;
      margin-top: 0.5rem;
    }

    .inner-item {
      background: rgba(0, 120, 255, 0.08);
      border-radius: 4px;
      text-align: center;
      font-size: 0.8rem;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background: dodgerblue;
        color: white;
        font-weight: 500;
        transition: background 0.2s ease;
    }

    .button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .button:hover:not(:disabled) {
      background: royalblue;
    }

    @media (max-width: 600px) {
      .container {
        grid-template-columns: 1fr;
      }
      ::slotted([slot="header"]) {
        font-size: 1rem;
      }
    }
  </style>

  <div class="container" part="container">
    <slot name="header"></slot>

    <!-- CARD 1: Interactiva -->
    <div class="card" id="counterCard" part="card">
      <h3>Hola, <span id="name">Invitado</span> 👋</h3>

      <p id="statusMsg"></p>

      <div class="inner-grid">
        <div class="inner-item"><p>Contador: <strong id="count">0</strong></p></div>
        <div class="inner-item"><button class="button" id="incrementBtn">Incrementar</button></div>
      </div>
    </div>

    <div class="card"><p>Columna auxiliar 2</p></div>
    <div class="card"><p>Columna auxiliar 3</p></div>
  </div>
`;

const userName = prompt('Escribe tu nombre:');

class SimpleComponent extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'count', 'disabled', 'status'];
    }

    constructor() {
        super(); // inicializa HTMLElement
        // crea shadow DOM
        this._shadow = this.attachShadow({ mode: 'open' });
        this._shadow.appendChild(template.content.cloneNode(true));

        // Propiedades internas reactivas
        this._state = {
            name: userName,
            count: 0,
            disabled: false,
            status: 'idle', // idle | loading | success | error
        };

        // cachea referencias al DOM dentro del shadow
        this.$name = this._shadow.querySelector('#name');
        this.$count = this._shadow.querySelector('#count');
        this.$statusMsg = this._shadow.querySelector('#statusMsg');
        this.$btn = this._shadow.querySelector('#incrementBtn');
        // asegura que "this" apunte al componente en los handlers
        this._onClick = this._onClick.bind(this);
    }

    connectedCallback() {
        this._btnSetup();
        this._render();
    }

    disconnectedCallback() {
        this.$btn.removeEventListener('click', this._onClick);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal === newVal) return;
        this._state[name] = this._parseAttr(name, newVal);
        this._render();
    }

    _parseAttr(name, val) {
        if (name === 'count') return Number(val) || 0;
        if (name === 'disabled') return val !== null && val !== 'false';
        return val;
    }

    _btnSetup() {
        this.$btn.addEventListener('click', this._onClick);
    }

    _onClick() {
        // protecciones
        if (this._state.disabled) return;

        // bloquea UI y pasa a loading
        this._state.disabled = true;
        this._setStatus('loading');
        this._render();

        // simula proceso async
        setTimeout(() => {
            this._state.count++;
            // sincroniza atributo (esto dispara attributeChangedCallback que llama _render)
            this.setAttribute('count', this._state.count);

            // error al llegar a 29
            const success = this._state.count < 29;

            if (success) {
                this._setStatus('success');
                // reactivar tras breve pausa y volver a idle
                setTimeout(() => {
                    this._state.disabled = false;
                    this._setStatus('idle');
                    this._render();
                }, 300);
            } else {
                // Llegó a 29 (o más): error y bloqueo permanente
                this._setStatus('error');
                this._state.disabled = true;
                this.setAttribute('disabled', '');
                this._render();
            }
        }, 200);
    }

    _setStatus(status) {
        this._state.status = status;
        this.setAttribute('status', status);
    }

    _render() {
        const { name, count, disabled, status } = this._state;

        this.$name.textContent = name;
        this.$count.textContent = count;
        this.$btn.disabled = disabled;

        let msg = '';
        switch (status) {
            case 'loading':
                msg = 'Cargando...';
                break;
            case 'success':
                msg = '✅ Contador actualizado correctamente';
                break;
            case 'error':
                msg = '⚠️ Ocurrió un error';
                break;
            default:
                msg = 'Listo para iniciar';
        }
        this.$statusMsg.textContent = msg;
    }

    // Getters/Setters reactivas
    get name() { return this._state.name; }
    set name(v) { this.setAttribute('name', v); }

    get count() { return this._state.count; }
    set count(v) { this.setAttribute('count', v); }

    get disabled() { return this._state.disabled; }
    set disabled(v) {
        if (v) this.setAttribute('disabled', '');
        else this.removeAttribute('disabled');
    }

    get status() { return this._state.status; }
    set status(v) { this.setAttribute('status', v); }
}

if (!customElements.get('simple-component')) {
    customElements.define('simple-component', SimpleComponent);
}
// npm i --S lit
// npm i @web/dev-server --save-dev
