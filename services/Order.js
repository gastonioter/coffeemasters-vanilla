import { loadProductById } from "./Menu.js";
import Store from "./Store.js";

function findAndUpdate(currentProduct, toMatch) {
  if (currentProduct.id == toMatch.id) {
    return {
      ...currentProduct,
      qty: currentProduct.qty + 1,
    };
  } else {
    return currentProduct;
  }
}
export async function addToCart(id) {
  if (!id) return;

  const alreadyExists = Store.cart.find(function matchId(product) {
    return product.id == id;
  });

  const product = await loadProductById(id);

  if (alreadyExists) {
    Store.cart = Store.cart.map((product) =>
      findAndUpdate(product, alreadyExists)
    );
  } else {
    Store.cart = [...Store.cart, { ...product, qty: 1 }];
  }
}

export async function removeFromCart(id) {
  if (!id) return;

  Store.cart = Store.cart.filter(function notMatchId(product) {
    return product.id != id;
  });
}

export function totalItems() {
  return Store.cart.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);
}
