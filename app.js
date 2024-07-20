import { loadMenu } from "./services/Menu.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";

window.app = {};
app.store = Store;
//app.router = Router();

//const router = Router();

HTMLElement.prototype.on = (a, b, c) => this.addEventListener(a, b, c);
HTMLElement.prototype.off = (a, b) => this.removeEventListener(a, b);
HTMLElement.prototype.$ = (s) => this.querySelector(s);
HTMLElement.prototype.$ = (s) => this.querySelectorAll(s);

window.addEventListener("DOMContentLoaded", function init() {
  loadMenu();
  Router.init();
  Router.init();
});
