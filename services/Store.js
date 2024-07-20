const Store = {
  menu: null,
  cart: [],
};

const storeHandler = {
  set(target, property) {
    switch (property) {
      case "menu":
        window.dispatchEvent(new Event("menuhaschanged"));
        break;
      case "cart":
        window.dispatchEvent(new Event("carthaschanged"));
      default:
        break;
    }
    // indica exito
    return true;

  },
};
const proxiedStore = new Proxy(Store, storeHandler);
export default Store;
