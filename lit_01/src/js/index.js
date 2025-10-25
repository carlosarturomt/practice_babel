import { LitElement, html, css } from 'lit';
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export class SimpleComponent extends LitElement {
  static styles = css`
    main {
      width: 100%;
      min-height: 100vh;
    }

    button {
        background: none;
        border: none;
        width: 100%;
        height: 100%;
    }

    figure {
      width: 15%;
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

    h2 {
      font-size: 6rem;
      line-height: 1.5rem;
      text-align: center;
    }

    .container {
      width: 100%;
      max-width: 1080px;
      margin: 0 auto;
      padding: 1rem;
      font-size: 2rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      align-items: start;
    }

    .bg-gradient-blue-dodger {
      background: rgb(0,6,12);
      background: linear-gradient(180deg,rgba(0,6,12,1),rgba(0,64,128,1) 25%,rgba(30,144,255,1) 75%,rgba(30,144,255,.75));
    }

    .full {
      grid-column: 1 / -1;
    }

    .flex-center-column {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 2rem;
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

    .text-border {
      color: transparent;
      -webkit-text-stroke: 2px white;
    }

    @media (max-width: 600px) {
      .container {
        grid-template-columns: 1fr;
      }
    }
  `;

  static properties = {
    name: {
      type: String
    },
    count: {
      type: Number
    },
    disabled: {
      type: Boolean
    },
    status: {
      type: String
    },
  };

  constructor() {
    super();
    this.name = 'artur'; //prompt('Escribe tu nombre:') || 'Invitado';
    this.count = 0;
    this.disabled = false;
    this.status = 'idle'; // idle | loading | success | error
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
    const img = this.renderRoot.querySelector("figure img"); // seleccionamos la imagen
    if (!img) return;

    let time = 0;
    const animate = () => {
      time += 0.01;

      const x = 50 + Math.sin(time * 0.9) * 30; // Oscila entre 20% y 80%
      const y = 50 + Math.cos(time * 0.9) * 30; // Oscila entre 20% y 80%

      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = `scale(${1.1 + Math.sin(time) * 0.05})`; // Oscila entre 1.05 y 1.15 aprox

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

  render() {
    return html`
      <main class=${`bg-gradient-blue-dodger`}>

        <div id="tsparticles"></div>

        <section class=${`container`}>
          <aside class=${`full flex-center-column`}>
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
            </hgroup>
          </aside>

          <!-- CARD 1 -->
          <div class="card">
            <h3>Hola, <span>${this.name}</span> 👋</h3>
            <p>${this._statusMessage()}</p>

            <div class="inner-grid">
              <div class="inner-item">
                <p>Contador: <strong>${this.count}</strong></p>
              </div>
              <div class="inner-item">
                <button
                  class="button"
                  @click=${this._handleClick}
                  ?disabled=${this.disabled}
                >
                  Incrementar
                </button>
              </div>
            </div>
          </div>

          <div class="card"><p>Columna auxiliar 2</p></div>
          <div class="card"><p>Columna auxiliar 3</p></div>
        </section>
      </main>
    `;
  }
}

customElements.define('simple-component', SimpleComponent);