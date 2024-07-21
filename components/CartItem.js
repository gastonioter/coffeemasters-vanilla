import { removeFromCart } from "../services/Order.js";

export class CartItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("cart-item-template");
    const content = template.content.cloneNode(true);
    // reusing the template for each CartItem component
    this.innerHTML = ""; // Clear the element
    this.appendChild(content);
    this.render();
  }

  render() {
    const item = JSON.parse(this.dataset.item);

    this.querySelector(".qty").textContent = `${item.qty}x`;
    this.querySelector(".name").textContent = item.name;
    this.querySelector(".price").textContent = item.price;
    this.querySelector("a.delete-button").addEventListener("click", (e) => {
      e.preventDefault();
      removeFromCart(item.id);
    });
  }
}

customElements.define("cart-item", CartItem);
