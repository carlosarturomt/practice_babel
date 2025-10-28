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

    button, input, textarea {
        background: none;
        border: none;
        width: 100%;
        height: 100%;
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
      top: -1rem;
      left: 2rem;
      color: #54abff;
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
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      align-items: start;
    }

    .bg-gradient-blue-dodger {
      background: rgb(0,6,12);
      background: linear-gradient(180deg,rgba(0,6,12,1),rgba(0,64,128,1) 25%,rgba(30,144,255,1) 75%,rgba(30,144,255,.75));
    }

    .bg-whiter {
      background: #fff;
    }

    .w-full {
      grid-column: 1 / -1;
    }

    .h-screen {
      height: 100vh;
    }

    .flex-center {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }

    .flex-col {
      flex-direction: column;
    }

    .card {
      height: 240px;
      overflow: auto;
      padding: 2rem;
      border-radius: 6px;
      border-radius: 2rem;
      background: #fff;
      box-shadow: 0 0 #000, 0 0 #000, 0 0 15px -3px rgb(0 0 0/0.1),0 4px 6px -4px rgb(0 0 0/0.1);
    }

    /* Mini grid demo dentro del contador */
    .inner-grid {
      position: relative;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
      gap: 6px;
      margin-top: 0.5rem;
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

      .card {
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
  }

  firstUpdated() {
    this._initParticles();
    this._animateImage();
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



  render() {
    return html`
      <main class=${``}>

        <div id="tsparticles"></div>

        <section class=${`bg-gradient-blue-dodger`}>
          <aside class=${`h-screen flex-center flex-col`}>
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
          <aside class="card flex-center flex-col text-base text-center">
            <h3>Versión 1 - Propiedades reactivas y estilos</h3>
            <p>${this._statusMessage()}</p>

            <div class="inner-grid">
              <div class="inner-item">
                <p class=${`text-sm`}>Contador: <strong>${this.count}</strong></p>
              </div>
              <div class="inner-item">
                <button
                  class="button text-sm"
                  @click=${this._handleClick}
                  ?disabled=${this.disabled}
                >
                  Incrementar
                </button>
              </div>
            </div>
          </aside>

          <!-- V2 -->
          <aside class="card flex-center flex-col text-base text-center ">
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
                  class="button text-sm"
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

          <aside class="card flex-center flex-col text-base text-center">
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
          : html``; // nada se muestra si filtered está vacío
      })}
          </aside>

          <!-- V3 -->
          <aside class="w-full card  text-base text-center">
            <h3>Versión 3 - Formularios accesibles</h3>
            <form @submit=${this._handleFormSubmit} class="flex-col flex-center" style="gap: 1rem; width: 100%;" action="#" method="POST" >
              <div class="inner-grid">
                <label for="title">Asunto (Selecciona un asunto de la lista o escribe tu objetivo):</label>
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
                <label for="details">Detalle:</label>
                <div class="inner-item" style="padding: 0.5rem; width: 100%;">
                  <textarea id="details"
                    class="text-base p-1"
                    name="details" rows="4" cols="40" ></textarea>
                </div>
              </div>

              <div class="inner-grid">
                <div class="inner-item">
                  <label for="email">Tu email:</label>
                  <div class="p-1" style="padding: 0.5rem; width: 100%;">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="tu@email.com"
                      aria-describedby="email-help"
                      class="text-base p-1"
                    >
                  </div>
                </div>
                <div class="inner-item">
                  <button type="submit" class="button text-sm">Enviar Formulario</button>
                </div>
              </div>
            </form>

            ${this.formData ? html`
              <div style="margin-top: 1rem; padding: 1rem; background: rgba(0, 120, 255, 0.08); border-radius: 1rem; width: 100%;">
                <p style="font-weight: bold; margin-bottom: 0.5rem;">Valores enviados:</p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 0.25rem;">
                    <strong>Asunto:</strong> ${this.formData.title}
                  </li>
                  <li style="margin-bottom: 0.25rem;">
                    <strong>Detalle:</strong> ${this.formData.details}
                  </li>
                  <li style="margin-bottom: 0.25rem;">
                    <strong>Email:</strong> ${this.formData.email}
                  </li>
                  <li style="margin-bottom: 0.25rem;">
                    <strong>Fecha:</strong> ${new Date().toLocaleString()}
                  </li>
                </ul>
              </div>
              ` : ''}
            </aside>
          </article>

        </section>
      </main>
    `;
  }
}

customElements.define('simple-component', SimpleComponent);