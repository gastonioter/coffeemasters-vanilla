import Store from "../services/Store.js";

export class MenuPage extends HTMLElement {
  listener = this.render.bind(this);

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    const template = document.getElementById("menu-page-template");
    const toRender = template.content.cloneNode(true);
    this.root.appendChild(toRender);

    loadCSS.call(this);

    async function loadCSS() {
      const styleEl = document.createElement("style");
      const response = await fetch("/components/MenuPage.css");
      const css = await response.text();
      styleEl.textContent = css;
      this.root.appendChild(styleEl);
    }
  }

  connectedCallback() {
    window.addEventListener("menuhaschanged", this.listener);
  }

  disconnectedCallback() {
    window.removeEventListener("menuhaschanged", this.listener);
  }

  render() {
    const menuEl = this.root.querySelector("#menu");

    if (Store.menu) {
      for (const category of Store.menu) {
        const liCategory = document.createElement("li");

        liCategory.innerHTML = `
        <h3>${category.name}</h3>
        <ul class="category"></ul>`;

        menuEl.appendChild(liCategory);

        category.products.forEach(function renderProductItem(product) {
          const procutItemEl = document.createElement("product-item");
          procutItemEl.dataset.product = JSON.stringify(product);
          liCategory.querySelector(".category").appendChild(procutItemEl);
        });
      }
    } else {
      menuEl.innerHTML = "Loading...";
    }
  }
}

customElements.define("menu-page", MenuPage);
