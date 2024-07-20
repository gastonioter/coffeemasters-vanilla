export class OrderPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ open: "true" });
    loadCSS();

    async function loadCSS() {
      const response = await fetch("/components/OrderPage.css");
      const css = await response.text();
      styleEl.textContent = css;
      const styleEl = document.createElement("style");
      this.root.appendChild(styleEl);
    }
  }

  connectedCallback() {
    const template = document.getElementById('')
  }
}

customElements.define("order-page", OrderPage);
