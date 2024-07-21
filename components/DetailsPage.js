import { loadProductById } from "../services/Menu.js";
import { addToCart } from "../services/Order.js";
import Router from "../services/Router.js";

export class DetailsPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" }); // i create the Shadow DOM
    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content); // inyect the clone of the template into de Shadow DOM

    loadCSS.call(this);

    async function loadCSS() {
      const styleEl = document.createElement("style");
      const response = await fetch("/components/MenuPage.css");
      const css = await response.text();
      styleEl.textContent = css;
      this.root.appendChild(styleEl);
    }
  }

  // component attached to the DOM
  connectedCallback() {
    this.render();
  }

  back(e) {
    e.preventDefault();
    Router.go("/");
  }
  async render() {
    if (!this.dataset.productId) return;

    const product = await loadProductById(this.dataset.productId);

    if (!product) {
      alert("invalid ID");
      return;
    }

    this.root.querySelector("a").addEventListener("click", this.back);

    const { id, name, description, price, image } = product;

    this.root.querySelector("h2").textContent = name;
    this.root.querySelector("img").src = `/data/images/${image}`;
    this.root.querySelector(".description").textContent = description;
    this.root.querySelector(".price").textContent = `$ ${price.toFixed(2)}`;
    this.root
      .querySelector("button")
      .addEventListener("click", function handleAddToCartBtn() {
        addToCart(id);
        Router.go("/order");
      });
  }
}

customElements.define("details-page", DetailsPage);
