import { loadProductById } from "./Menu.js";
import Store from "./Store.js";

export async function addToCart(id) {
  if (!id) return;

  const productToUpdate = Store.cart.find(function matchId(product) {
    return product.id == id;
  });

  const product = await loadProductById(id);

  if (productToUpdate) {
    Store.cart = cartWithProductUpdated(productToUpdate);
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

export function getTotalItems() {
  return Store.cart.reduce(countItems, 0);
}

function isProduct(currentProduct, toMatch) {
  if (currentProduct.id == toMatch.id) {
    return {
      ...currentProduct,
      qty: ++currentProduct.qty,
    };
  }

  return currentProduct;
}

function cartWithProductUpdated(product) {
  return Store.cart.map((currentProduct) => isProduct(currentProduct, product));
}

function countItems(acc, item) {
  return acc + item.qty;
}
