import Store from "../services/Store.js";
let cache;

export class OrderPage extends HTMLElement {
  //listener = this.listenForCartChanges.bind(this);
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const section = document.createElement("section");
    this.root.appendChild(section);

    applyCSS.call(this);

    async function applyCSS() {
      const response = await fetch("/components/OrderPage.css");
      const css = await response.text();
      const styleEl = document.createElement("style");
      styleEl.textContent = css;
      this.root.appendChild(styleEl);
    }
  }

  // loadCSS() {
  //   return async () => {
  //     if (cache != null) return cache;
  //     const response = await fetch("/components/OrderPage.css");
  //     cache = await response.text();
  //     return cache;
  //   };
  // }

  connectedCallback() {
    window.addEventListener("carthaschanged", () => {
      console.log("cart changed: order page");
      this.render();
    });

    this.render();
  }

  render() {
    const cart = Store.cart;
    console.log(cart);

    let section = this.root.querySelector("section");

    if (!cart.length) {
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;
    } else {
      let orderHTML = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `;
      section.innerHTML = orderHTML;

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.appendChild(content);

      const ulEl = this.root.querySelector("ul");
      let total = 0;

      cart.forEach((item) => {
        const itemEl = document.createElement("cart-item");
        itemEl.dataset.item = JSON.stringify(item);
        ulEl.appendChild(itemEl);
        total += item.price * item.qty;
      });

      ulEl.innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>                
        `;
    }
  }
}

customElements.define("order-page", OrderPage);
