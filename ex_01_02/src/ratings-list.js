
import { LitElement, css, html } from 'lit';

export class RatingsList extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
    :host {
        color: blue;
    }

    .text-green {
        color: #008000;
    }
    .text-yellow {
        color: #b3b300;
    }
    .text-red {
        color: #b20000;
    }
    `;

    static properties = {
        title: { type: String },
        grades: { type: Array },
    };

    constructor() {
        super();
        this.title = 'Lista de calificaciones con LitElement';
        this.grades = [];
    }

    handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const name = formData.get('name');
        const rating = Number(formData.get('rating'));

        // Validación rápida
        if (!name || !rating) return alert('Completa ambos campos');

        // Agregamos a la lista reactiva
        this.grades = [...this.grades, { name, rating }];

        form.reset();
    }

    render() {
        return html`
        <h1>${this.title}</h1>

        <form @submit=${this.handleSubmit}>
            <input id="name" name="name" type="text" placeholder="Nombre" />
            <input id="rating" name="rating" type="number" placeholder="Calificación" />
            <button type="submit">Enviar</button>
        </form>

        <ul>
			{this.grades.map((item) =>
            html`< li class=${ item.rating >= 8 ? 'text-green' : item.rating < 6 ? 'text-red' : 'text-yellow' }> ${ item.name }: ${ item.rating }</li > `
        )}
	    </ul>
    `;
    }
}

customElements.define('ratings-list', RatingsList);
