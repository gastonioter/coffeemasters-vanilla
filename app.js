import { loadMenu } from "./services/Menu.js";
import Router from "./services/Router.js";

// Link for let know the browser about my custom elements
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { ProductItem } from "./components/ProductItem.js";
import { totalItems } from "./services/Order.js";

HTMLElement.prototype.on = (a, b, c) => this.addEventListener(a, b, c);
HTMLElement.prototype.off = (a, b) => this.removeEventListener(a, b);
HTMLElement.prototype.$ = (s) => this.querySelector(s);
HTMLElement.prototype.$ = (s) => this.querySelectorAll(s);

window.addEventListener("DOMContentLoaded", async function init() {
  loadMenu();
  Router.init();
});

window.addEventListener("carthaschanged", (event) => {
  const badge = document.getElementById("badge");
  const total = totalItems();

  badge.hidden = total == 0;

  badge.textContent = totalItems();
});
