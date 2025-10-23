
import { LitElement, css, html } from 'lit';
export class SimpleComponent extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
    :host {
        color: blue;
    }
    `;
    static properties = {
        holamundo: { type: String },
    };
    constructor() {
        super();
        // Declare reactive properties
        this.holamundo = 'World';
    }
    // Render the UI as a function of component state
    render() {
        return html`
        <p>${this.holamundo}</p>
    `;
    }
}
customElements.define('simple-component', SimpleComponent);
