export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    loadCSS();

    async function loadCSS() {
      const response = await fetch("/components/MenuPage.css");
      const css = await response.text();
      styleEl.textContent = css;
      const styleEl = document.createElement("style");
      this.root.appendChild(styleEl);
    }
  }

  connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const toRender = template.content.cloneNode(true);
    this.root.appendChild(toRender);
  }
}

customElements.define("menu-page", MenuPage);
