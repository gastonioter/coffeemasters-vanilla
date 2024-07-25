export class NotFoundPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = document.getElementById("error-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
  }

  render() {}
}

customElements.define("not-found", NotFoundPage);
