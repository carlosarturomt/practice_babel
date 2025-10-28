import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { guard } from "lit/directives/guard.js";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import emailjs from '@emailjs/browser';

export class SimpleComponent extends LitElement {
  static styles = css`
    main {
      width: 100%;
      min-height: 100vh;
    }

    button, input {
        background: none;
        border: none;
        width: 100%;
        height: 100%;
        outline: none;
    }

    textarea {
        background: none;
        border: none;
        width: 95%;
        height: 75%;
        outline: none;
    }

    figure {
      min-width: 150px;
      width: 12.5%;
      margin: 0 auto;
    }

    figure picture {
      width: 100%;
      display: block;
    }

    figure img {
      width: 100%;
      display: block;
      object-fit: cover;
    }

    hgroup {
      color: white;
    }

    h2 {
      font-size: 7rem;
      line-height: 1.5rem;
      text-align: center;
    }

    label {
      position: absolute;
      top: -0.75rem;
      left: 2rem;
      color: #54abff;
    }

    a {
      text-decoration: none;
      color: #fff;
    }

    a:hover {
      text-decoration: underline;
    }

    .text-sm {
      font-size: 1.5rem;
      text-align: center;
      line-height: 1.75rem;
    }

    .text-base {
      font-size: 2rem;
      line-height: 2rem;
    }

    .text-lg {
      font-size: 2.5rem;
      text-align: center;
      line-height: 3rem;
    }

    .text-xl {
      font-size: 4rem;
      line-height: 2rem;
    }

    .text-center {
      text-align: center;
    }

    .container {
      width: 100%;
      max-width: 1080px;
      margin: 0 auto;
      padding: 8rem 1rem;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 6rem;
      align-items: start;
      justify-items: stretch;
    }

    .bg-gradient-blue-dodger {
      background: rgb(0,6,12);
      background: linear-gradient(180deg,rgba(0,6,12,1),rgba(0,64,128,1) 25%,rgba(30,144,255,1) 75%,rgba(30,144,255,.75));
    }

    .bg-white {
      background: #fff;
    }

    .text-white {
      color: #fff;
    }

    .w-full {
      grid-column: 1 / -1;
    }

    .h-screen {
      height: 100vh;
    }

    .m-auto {
      margin: 0 auto;
    }

    .flex-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .flex-col {
      flex-direction: column;
    }

    .gap-1 {
      gap: 1rem;
    }

    .gap-2 {
      gap: 2rem;
    }

    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 240px;
      width: 100%;
      height: 100%;
      padding: 2rem;
      border-radius: 6px;
      border-radius: 2rem;
      background: #fff;
      box-shadow: 0 0 #000, 0 0 #000, 0 0 15px -3px rgb(0 0 0/0.1),0 4px 6px -4px rgb(0 0 0/0.1);
      overflow: auto;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .inner-grid {
      position: relative;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
      gap: 6px;
    }

    .inner-item {
      border-radius: 4px;
      text-align: center;
      border-radius: 2rem;
      background: rgba(0, 120, 255, 0.08);
    }

    .p-1 {
      padding: 1rem;
    }

    .p-2 {
      padding: 2rem;
    }

    .w-80 {
      width: 80%;
    }

    .w-100 {
      width: 100%;
    }

    .overflow-auto {
      overflow: auto;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        color: white;
        transition: background 0.2s ease;
        border-radius: 2rem;
        background: #000;
    }

    .button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .button:hover:not(:disabled) {
      background: #1e90ff;
    }

    .text-border {
      color: transparent;
      -webkit-text-stroke: 2px white;
    }

    .col-2 {
      grid-column: span 2;
    }

    .row-2 {
      grid-row: span 2;
    }

    .bg-blue {
      background: #1e90ff;
    }

    @media (max-width: 900px) {
      .container {
        grid-template-columns: 2fr;
        gap: 2rem;
      }

      .card {
        width: 88%;
        height: auto;
        aspect-ratio: auto;
      }
    }

    @media (max-width: 600px) {
      h2 {
        font-size: 3rem;
        line-height: 1rem;
      }

      .text-xl {
        font-size: 2.5rem;
        line-height: 1rem;
      }

      .text-lg {
        font-size: 1.8rem;
        line-height: 2rem;
      }

      .text-base {
        font-size: 1.4rem;
        line-height: 1.6rem;
      }

      .text-border {
        -webkit-text-stroke:1px white;
      }

      .container {
        grid-template-columns: 1fr;
      }

      .col-2 {
        grid-column: span 1;
      }

      .row-2 {
        grid-row: span 1;
      }

      .card {
        width: 84.5%;
        height: auto;
        aspect-ratio: auto;
      }
    }
  `;

  static properties = {
    /* V1 */
    name: { type: String },
    count: { type: Number },
    disabled: { type: Boolean },
    status: { type: String },
    /* V2 */
    items: { type: Array },
    filterText: { type: String },
    /* V3 */
    formData: { type: Object },
    /* V4 */
    loggedIn: { type: Boolean },
    /* V5 */
    silentFlag: { type: Boolean },
    countV5: { type: Number },
    /* V6 */
    useLightDOM: { type: Boolean },
    /* V7 */
    weatherData: { type: Object },
    weatherError: { type: String },
    weatherLoading: { type: Boolean }
  };

  constructor() {
    super();
    /* V1 */
    this.name = 'artur'; //prompt('Escribe tu nombre:') || 'Invitado';
    this.count = 0;
    this.disabled = false;
    this.status = 'idle'; // idle | loading | success | error\
    /* V2 */
    this.items = [];
    this.filterText = '';
    /* V3 */
    this.formData = null;
    /* V4 */
    this.loggedIn = false;
    /* V5 */
    this.silentFlag = false;
    this.countV5 = 0;
    /* V6 */
    this.useLightDOM = false;
    /* V7 */
    this.weatherData = null;
    this.weatherError = null;
    this.weatherLoading = false;
  }

  firstUpdated() {
    this._initParticles();
    this._animateImage();
    this._fetchWeather();
  }

  async _initParticles() {
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 64,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          move: {
            enable: true,
            speed: 0.5,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 16,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: 2,
          },
        },
        detectRetina: true,
      },
    });
  }

  _animateImage() {
    const img = this.renderRoot.querySelector("figure img");
    if (!img) return;

    let time = 0;
    const animate = () => {
      time += 0.01;

      const x = 50 + Math.sin(time * 0.9) * 30;
      const y = 50 + Math.cos(time * 0.9) * 30;

      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = `scale(${1.1 + Math.sin(time) * 0.05})`;

      this._imgAnimationId = requestAnimationFrame(animate);
    };

    animate();
  }

  _statusMessage() {
    switch (this.status) {
      case 'loading':
        return 'Cargando...';
      case 'success':
        return '✅ Contador actualizado correctamente';
      case 'error':
        return '⚠️ Ocurrió un error';
      default:
        return 'Listo para iniciar';
    }
  }

  _handleClick() {
    if (this.disabled) return;

    this.disabled = true;
    this.status = 'loading';

    setTimeout(() => {
      this.count++;
      const success = this.count < 29;

      if (success) {
        this.status = 'success';
        setTimeout(() => {
          this.disabled = false;
          this.status = 'idle';
        }, 300);
      } else {
        this.status = 'error';
        this.disabled = true;
      }
    }, 200);
  }

  /* V2 */
  _addItem(newItem) {
    this.items = [...this.items, newItem];
  }

  _renderFilteredItems() {
    const text = this.filterText.toLowerCase().trim();
    return this.items.filter(i => i.name.toLowerCase().includes(text));
  }

  /* V3 */
  async _handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    this.status = 'loading';
    this.disabled = true;

    try {
      const templateParams = {
        userEmail: data.email, // o this.name si quieres
        emailTitle: data.title,  // asunto del formulario
        emailDetails: data.details + `\nEmail: ${data.email}\nFecha: ${new Date().toLocaleString()}`
      };

      const emailjsResponse = await emailjs.send(
        'default_service',
        'template_8pklheb',
        templateParams,
        '8pzvfG97iPDmCIJGz'
      );

      if (emailjsResponse.status === 200) {
        this.formData = data;
        this.status = 'success';
        form.reset();
        setTimeout(() => {
          this.status = 'idle';
          this.disabled = false;
        }, 3000);
      }
    } catch (error) {
      console.error('Error enviando email:', error);
      this.status = 'error';
      this.formData = data;
      setTimeout(() => {
        this.status = 'idle';
        this.disabled = false;
      }, 3000);
    }
  }

  /* V4 */
  _toggleLogin() {
    this.loggedIn = !this.loggedIn;
  }

  /* V5 */
  shouldUpdate(changedProps) {
    if (changedProps.has('silentFlag') && changedProps.size === 1) {
      console.log('❌ No se actualiza el DOM (solo cambió silentFlag)');
      return false;
    }
    console.log('✅ Se actualiza el DOM');
    return true;
  }

  _incrementV5() {
    this.countV5++;
  }

  _toggleSilentFlag() {
    this.silentFlag = !this.silentFlag;
    console.log(`silentFlag cambiado a: ${this.silentFlag}`);
  }

  /* V6 */
  /* createRenderRoot() {
    return this.useLightDOM ? this : super.createRenderRoot();
  } */

  createRenderRoot() {
    if (this.useLightDOM) {
      const style = document.createElement('style');
      style.textContent = SimpleComponent.styles.cssText;
      this.appendChild(style);
      return this;
    } else {
      return super.createRenderRoot();
    }
  }

  /* V7 */
  async _fetchWeather() {
    this.weatherLoading = true;
    this.weatherError = null;

    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=19.43&longitude=-99.13&current_weather=true'
      );

      // Manejar códigos de estado
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Error 401: No autorizado');
        } else if (response.status === 301) {
          throw new Error('Error 301: Redirección permanente');
        } else {
          throw new Error(`Error HTTP: ${response.status}`);
        }
      }

      const data = await response.json();
      this.weatherData = data;

    } catch (error) {
      // Manejar errores de CORS y otros
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        this.weatherError = 'Error de CORS: No se puede acceder a la API desde este dominio';
      } else {
        this.weatherError = error.message;
      }
    } finally {
      this.weatherLoading = false;
    }
  }

  render() {
    return html`
      <main class=${``}>

        <div id="tsparticles"></div>

        <section class=${`bg-gradient-blue-dodger`}>
          <aside class=${`h-screen flex-center flex-col gap-1`}>
            <figure>
              <picture>
                <img
                    src=${`https://bitsletras.com/astronaut_falling_down.webp`}
                    alt="starman"
                />
              </picture>
            </figure>
            <hgroup>
                <slot name="header"></slot>
                <h2 class=${`text-border`}>by Carlos Miranda</h2>
                <p class=${`text-lg`}>Práctica completa correspontiente al curso de BABEL CELLS, del 15 al 29 de octubre.</p>
            </hgroup>
          </aside>
        </section>

        <section class=${`bg-white`}>
          <article class=${`container`}>

          <h3 class=${`w-full text-xl`}>Hola, <span>${this.name}</span> 👋</h3>

          <!-- V1 -->
          <aside class="card flex-center flex-col gap-1 text-base text-center">
            <h3>Versión 1 - Propiedades reactivas y estilos</h3>
            <p>${this._statusMessage()}</p>

            <div class="inner-grid">
              <div class="inner-item">
                <p class=${`text-sm`}>Contador: <strong>${this.count}</strong></p>
              </div>
              <div class="inner-item">
                <button
                  class ="w-100 button text-sm"
                  @click=${this._handleClick}
                  ?disabled=${this.disabled}
                >
                  Incrementar
                </button>
              </div>
            </div>
          </aside>

          <!-- V2 -->
          <aside class="card flex-center flex-col gap-1 text-base text-center ">
            <h3>Versión 2 - Listas y rendimiento</h3>

            <div class="inner-grid">
              <div class=${`w-full inner-item flex-center p-1`}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.99.99 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12z"/></svg>
                </span>
                <input
                  class=${`text-base text-center`}
                  type="text"
                  placeholder="Filtrar..."
                  .value=${this.filterText}
                  @input=${e => this.filterText = e.target.value}
                />
              </div>
            </div>

            <div class="inner-grid">
              <div class="inner-item">
                  ${guard([this.items, this.filterText], () => {
      const filtered = this._renderFilteredItems();
      return html`
                    <p class=${`text-sm`}>Total: <strong>${filtered.length}</strong></p>
                    `;
    })}
              </div>
              <div class="inner-item">
                <button
                  class="w-100 button text-sm"
                  @click=${() => {
        const name = prompt('Nuevo item:')?.trim();
        if (!name) return null;
        this._addItem({ id: crypto.randomUUID(), name });
      }}
                >
                  Agregar Item
                </button>
              </div>
            </div>
          </aside>

          <aside class="card flex-center flex-col gap-1 text-base text-center">
            <h3>Versión 2 - Lista</h3>
              ${guard([this.items, this.filterText], () => {
        const filtered = this._renderFilteredItems();
        return filtered.length > 0
          ? html`
          <div class="inner-grid">
            <ul class="w-full">
              ${repeat(filtered, item => item.id, item => html`<li>${item.name}</li>`)}
            </ul>
          </div>
        `
          : html``;
      })}
          </aside>

          <!-- V3 -->
          <aside class="col-2 row-2 card text-base text-center">
            <h3>Versión 3 - Formularios accesibles</h3>
            <form @submit=${this._handleFormSubmit} class="w-100 flex-col flex-center gap-2" action="#" method="POST" >
              <div class="inner-grid">
                <label class="text-sm" for="title">Asunto (Selecciona un asunto de la lista o escribe tu objetivo):</label>
                <div class="inner-item w-full p-1">
                  <input
                    list="titles"
                    id="title"
                    name="title"
                    required
                    aria-describedby="title-help"
                    class="text-base"
                  >
                  <datalist id="titles">
                    <option value="Asesoría">
                    <option value="Cotización">
                    <option value="Agendar un Meet">
                    <option value="Trabajar juntos">
                  </datalist>
                </div>
              </div>

              <div class="inner-grid">
                <label class="text-sm" for="details">Detalle:</label>
                <div class="inner-item">
                  <textarea id="details"
                    class="text-base p-1"
                    name="details" rows="4" cols="40" ></textarea>
                </div>
              </div>

              <div class="inner-grid">
                <div class="inner-item">
                  <label class="text-sm" for="email">Tu email:</label>
                  <div class="p-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="tu@email.com"
                      aria-describedby="email-help"
                      class="text-base"
                    >
                  </div>
                </div>
                <div class="inner-item">
                  <button type="submit" class="w-100 button text-sm">Enviar Formulario</button>
                </div>
              </div>
            </form>

            ${this.formData ? html`
              <div>
                <p>Valores enviados:</p>
                <ul>
                  <li>
                    <strong>Asunto:</strong> ${this.formData.title}
                  </li>
                  <li>
                    <strong>Detalle:</strong> ${this.formData.details}
                  </li>
                  <li>
                    <strong>Email:</strong> ${this.formData.email}
                  </li>
                  <li>
                    <strong>Fecha:</strong> ${new Date().toLocaleString()}
                  </li>
                </ul>
              </div>
              ` : ''}
          </aside>

          <!-- V4 -->
          <aside class="card flex-center flex-col gap-1 text-base text-center">
            <slot name="header_v4"></slot>

            <p class="text-base">
              ${this.loggedIn
        ? html`<span>Bienvenido de nuevo, ${this.name} 👋</span>`
        : html`<span>Por favor inicia sesión para continuar</span>`}
            </p>

            <div class="inner-grid">
              <div class="inner-item">
                <p class=${`text-sm`}>${this.loggedIn ? 'Login ✅' : ' Logout ❌'}</p>
              </div>
              <div class="inner-item">
                <button
                  class ="w-100 button text-sm"
                  @click=${this._toggleLogin}
                >
                  ${this.loggedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
                </button>
              </div>
            </div>
          </aside>

          <!-- V5 -->
          <aside class="card flex-center flex-col gap-1 text-base text-center">
            <h3>Versión 5 — shouldUpdate</h3>
            <p class="text-base">Control del renderizado manual con propiedades reactivas</p>

            <div class="inner-grid">
              <div class="inner-item">
                <p class="text-sm">Contador:<strong>${this.countV5}</strong></p>
              </div>
              <div class="inner-item">
                <button class="w-100 button text-sm" @click=${this._incrementV5}>
                  Incrementar
                </button>
              </div>
            </div>

            <div class="inner-grid">
              <div class="inner-item">
                <button class="w-100 button text-sm" @click=${this._toggleSilentFlag}>
                  Alternar SilentFlag
                </button>
              </div>
              <div class="inner-item">
                <p class="text-sm">SilentFlag: <strong>${this.silentFlag}</strong></p>
              </div>
            </div>

            <p class="text-sm">
              Abre la consola para ver cuándo el DOM se actualiza o se ignora.
            </p>
          </aside>

          <!-- V6 -->
          <aside class="card flex-center flex-col gap-1 text-base text-center">
            <h3>Versión 6 — Light DOM</h3>

            <div class="inner-grid">
              <div class="inner-item">
                <p class="text-sm">useLightDOM: <strong>${this.useLightDOM}</strong></p>
              </div>
              <div class="inner-item">
                <button class="w-100 button text-sm" @click=${() => {
        this.useLightDOM = !this.useLightDOM;
        const newComponent = document.createElement('simple-component');
        newComponent.useLightDOM = this.useLightDOM;
        this.replaceWith(newComponent); // reemplazas el componente actual
      }}>
                Alternar LightDOM
                </button>
              </div>
            </div>
          </aside>

          <!-- V7 -->
          <aside class="col-2 card flex-center flex-col gap-1 text-base text-center">
            <h3>Versión 7 — Fetch y red</h3>

            <div class="inner-grid">
              <div class=${`w-full flex-center`}>
                <span class=${`flex-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="6rem" height="6rem" viewBox="0 0 512 512"><defs><linearGradient id="IconifyId19a2bda0a1ab4d333104" x1="96" x2="168" y1="-2.4" y2="122.3" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".5" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="IconifyId19a2bda0a1ab4d333105" x2="168" y1="-50.4" y2="74.3" href="#IconifyId19a2bda0a1ab4d333104"/><linearGradient id="IconifyId19a2bda0a1ab4d333106" x1="150" x2="234" y1="119.2" y2="264.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".5" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><symbol id="IconifyId19a2bda0a1ab4d333107" viewBox="0 0 384 384"><circle cx="192" cy="192" r="84" fill="url(#IconifyId19a2bda0a1ab4d333106)" stroke="#f8af18" stroke-miterlimit="10" stroke-width="6"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="24" d="M192 61.7V12m0 360v-49.7m92.2-222.5l35-35M64.8 319.2l35.1-35.1m0-184.4l-35-35m254.5 254.5l-35.1-35.1M61.7 192H12m360 0h-49.7"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="0 192 192; 45 192 192"/></path></symbol><symbol id="IconifyId19a2bda0a1ab4d333108" viewBox="0 0 264 72"><path fill="none" stroke="url(#IconifyId19a2bda0a1ab4d333104)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="24" d="M12 60h240"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="translate" values="-24 0; 24 0; -24 0"/></path><path fill="none" stroke="url(#IconifyId19a2bda0a1ab4d333105)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="24" d="M12 12h240"><animateTransform additive="sum" attributeName="transform" dur="6s" repeatCount="indefinite" type="translate" values="24 0; -24 0; 24 0"/></path></symbol><clipPath id="IconifyId19a2bda0a1ab4d333109"><path fill="none" d="M0 0h512v306H0z"/></clipPath></defs><g clip-path="url(#IconifyId19a2bda0a1ab4d333109)"><use width="384" height="384" href="#IconifyId19a2bda0a1ab4d333107" transform="translate(64 100)"/></g><use width="264" height="72" href="#IconifyId19a2bda0a1ab4d333108" transform="translate(124 336)"/></svg>
                </span>
                <p class="text-base">Clima en CDMX</p>
              </div>
            </div>

            ${this.weatherError ? html`
              <div class="inner-item w-full">
                <p class="text-sm" style="color: red;">Error: ${this.weatherError}</p>
              </div>
            ` : ''}

            ${this.weatherData ? html`
              <div class="inner-grid w-full">
                <div class="inner-item">
                  <p class="text-sm">Temperatura: <strong>${this.weatherData.current_weather.temperature}°C</strong></p>
                </div>
                <div class="inner-item">
                  <p class="text-sm">Viento: <strong>${this.weatherData.current_weather.windspeed} km/h</strong></p>
                </div>
              </div>

              <div class="inner-grid w-full">
                <div class="inner-item">
                  <p class="text-sm">Condición: <strong>${this.weatherData.current_weather.weathercode}</strong></p>
                </div>
                <div class="inner-item">
                <button
                  class="w-100 button text-sm"
                  @click=${this._fetchWeather}
                  ?disabled=${this.weatherLoading}
                >
                  ${this.weatherLoading ? 'Cargando...' : 'Obtener Clima'}
                </button>
              </div>
              </div>

              <div class="inner-grid w-full">
                <details class="inner-item flex-center flex-col">
                  <summary class="text-sm">Ver JSON completo</summary>
                  <pre class="text-sm w-80 m-auto overflow-auto">
                    ${JSON.stringify(this.weatherData, null, 2)}
                  </pre>
                </details>

                <div class="inner-item p-1 flex-center">
                  <p class="text-sm">  <strong>¿Qué pasa sin CORS?</strong><br>
                  Si la API no tiene CORS habilitado, el navegador bloqueará la petición y verás un error de CORS en la consola.</p>
                </div>
              </div>

            ` : ''}
            </aside>
          </article>

        </section>

        <footer class=${`bg-blue flex-center p-1`}>
          <p class=${`text-center text-white text-base`}>
            2025 - Desarrolaldo por <a href=${`https://github.com/carlosarturomt`}>@carlosarturomt</a>
          </p>
        </footer>
      </main>
    `;
  }
}

customElements.define('simple-component', SimpleComponent);