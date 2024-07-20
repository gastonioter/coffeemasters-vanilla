export class DetailsPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ open: "true" });
    loadCSS();

    async function loadCSS() {
      const response = await fetch("/components/MenuPage.css");
      const css = await response.text();
      styleEl.textContent = css;
      const styleEl = document.createElement("style");
      this.root.appendChild(styleEl);
    }
  }

  // component attached to the DOM
  connectedCallback() {
    const template = document.getElementById("details-page-template");
    const toRender = template.content.cloneNode(true);
    this.root.appendChild(toRender);
  }
}

customElements.define("details-page", DetailsPage);
