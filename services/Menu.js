import API from "./API.js";
import Store from "./Store.js";

export async function loadMenu() {
  Store.menu = await API.fetchMenu();
}

export async function loadProductById(id) {
  if (!Store.menu) {
    await loadMenu();
  }

  for (let category of Store.menu) {
    for (let product of category.products) {
      if (product.id == id) {
        return product;
      }
    }
  }
  
  return null;
}
