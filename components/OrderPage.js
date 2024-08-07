import { placeOrder } from "../services/Order.js";
import Store from "../services/Store.js";
import Router from "../services/Router.js";
//let cache;

export class OrderPage extends HTMLElement {
  listenerCart = this.onCartChange.bind(this);

  #user = {
    name: "",
    phone: "",
    email: "",
  };

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

  onCartChange() {
    this.render();
  }

  connectedCallback() {
    window.addEventListener("carthaschanged", this.listenerCart);
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener("carthaschanged", this.listenerCart);
  }
  render() {
    const cart = Store.cart;

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
      this.setFormBindings(this.root.querySelector("form"));
    }
  }

  setFormBindings(form) {
    // set two-way data binding

    form.addEventListener("submit", handleSubmitForm.bind(this));

    Array.from(form.elements).forEach(attachListener.bind(this));

    this.#user = new Proxy(this.#user, {
      set(target, prop, value) {
        target[prop] = value;
        form.elements[prop].value = value;
        return true;
      },
    });

    function attachListener(formElement) {
      formElement.addEventListener("change", (event) => {
        this.#user[formElement.name] = event.currentTarget.value;
      });
    }

    function handleSubmitForm(e) {
      e.preventDefault();

      if (!this.#user.email || !this.#user.phone) {
        alert(
          "Please, enter your email and phone to notify you when your order is complete"
        );
      } else {
        alert(
          `Thanks for your order ${this.#user.name}. ${
            this.#user.email
              ? "We'll notice by email you when your order is complete"
              : ""
          }`
        );
        this.#user.name = this.#user.email = this.#user.phone = "";
        placeOrder();
        Router.go("/", false);
      }
    }
  }
}

customElements.define("order-page", OrderPage);
