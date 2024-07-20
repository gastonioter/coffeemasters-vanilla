import { loadMenu } from "./services/Menu.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";

// Link for let know the browser about my custom elements
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { DetailsPage } from "./components/DetailsPage.js";

window.app = {};
app.store = Store;

HTMLElement.prototype.on = (a, b, c) => this.addEventListener(a, b, c);
HTMLElement.prototype.off = (a, b) => this.removeEventListener(a, b);
HTMLElement.prototype.$ = (s) => this.querySelector(s);
HTMLElement.prototype.$ = (s) => this.querySelectorAll(s);

window.addEventListener("DOMContentLoaded", function init() {
  loadMenu();
  Router.init();
});
