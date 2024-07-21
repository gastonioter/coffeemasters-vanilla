import { loadMenu } from "./services/Menu.js";
import Router from "./services/Router.js";

// Link for let know the browser about my custom elements
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { ProductItem } from "./components/ProductItem.js";
import { CartItem } from "./components/CartItem.js";

import { getTotalItems } from "./services/Order.js";

window.addEventListener("DOMContentLoaded", init);

window.addEventListener("carthaschanged", updateBadge);

async function init() {
  loadMenu();
  Router.init();
}

function updateBadge() {
  const badge = document.getElementById("badge");

  const total = getTotalItems();

  badge.hidden = total == 0;

  badge.textContent = total;
}
