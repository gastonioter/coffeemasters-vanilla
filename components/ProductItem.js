import { addToCart } from "../services/Order.js";
import Router from "../services/Router.js";

export class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("product-item-template");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    this.render();
  }

  render() {
    const data = JSON.parse(this.dataset.product);
    const { id, name, price, image } = data;

    this.querySelector("h4").textContent = name;
    this.querySelector("p.price").textContent = price;
    this.querySelector("img").src = `data/images/${image}`;
    this.querySelector("a").addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.tagName.toLowerCase() == "button") {
        addToCart(id);
      } else {
        Router.go(`/product/${id}`);
      }
    });
  }
}

customElements.define("product-item", ProductItem);
