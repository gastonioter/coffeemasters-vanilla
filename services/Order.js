import { loadProductById } from "./Menu.js";
import Store from "./Store.js";

export async function addToCart(id) {
  if (!id) return;

  const productToUpdate = Store.cart.find(function matchId(product) {
    return product.id == id;
  });

  const product = await loadProductById(id);

  if (productToUpdate) {
    Store.cart = updateCart(productToUpdate);
  } else {
    Store.cart = [...Store.cart, { ...product, qty: 1 }];
  }
}

export async function removeFromCart(id) {
  if (!id) return;

  const product = Store.cart.find((product) => product.id == id);

  if (product.qty > 1) {
    // Decrement the qty in the cart
    Store.cart = Store.cart.map((currentProduct) =>
      findProductAndUpdateQty(currentProduct, product, (qty) => --qty)
    );
  } else {
    // Remove that item from the cart
    Store.cart = Store.cart.filter(function notMatchId(product) {
      return product.id != id;
    });
  }
}

export function getTotalItems() {
  return Store.cart.reduce(countItems, 0);
}

function findProductAndUpdateQty(product, toMatch, update) {
  if (product.id == toMatch.id) {
    return {
      ...product,
      qty: update(product.qty),
    };
  }

  return product;
}

function updateCart(productToFind) {
  return Store.cart.map((currentProduct) =>
    findProductAndUpdateQty(currentProduct, productToFind, (qty) => ++qty)
  );
}

function countItems(acc, item) {
  return acc + item.qty;
}
