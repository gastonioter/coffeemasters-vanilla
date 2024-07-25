import API from "./API.js";
import Store from "./Store.js";

export async function loadMenu() {
  // this set triggers an event in the store
  Store.menu = await API.fetchMenu();
}
export async function loadProductById(id) {
  if (!Store.menu) {
    await loadMenu();
  }

  let alls = [];

  Store.menu.forEach(function collect({ products } = {}) {
    alls.push(...products);
  });

  return alls.find(function matchId(prod) {
    return prod.id == id;
  });
}
