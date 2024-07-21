export class OrderPage extends HTMLElement {
  
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.getElementById("order-form-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    loadCSS.call(this);

    async function loadCSS() {
      const styleEl = document.createElement("style");
      const response = await fetch("/components/OrderPage.css");
      const css = await response.text();
      styleEl.textContent = css;
      this.root.appendChild(styleEl);
    }
  }

  connectedCallback() {}
}

customElements.define("order-page", OrderPage);
