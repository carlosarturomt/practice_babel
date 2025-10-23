class LoadingImage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
        }

        p {
			font-size: 1.5rem;
			font-weight: bold;
			text-align: center;
			color: #555;
		}

        img {
            display: block;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        </style>

        <div class="content">
            <p>Cargando imagen...</p>
        </div>
        `;

        setTimeout(() => {
            const container = this.querySelector(".content");
            container.innerHTML = `
				<img src="https://picsum.photos/200" alt="Random Image"/>
			`;
        }, 3000)
    }
}

customElements.define('loading-image', LoadingImage);