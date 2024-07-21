const originalStore = {
  menu: null,
  cart: [],
};

const storeHandler = {
  set(target, property, newValue) {
    target[property] = newValue;

    switch (property) {
      case "menu":
        window.dispatchEvent(new Event("menuhaschanged"));
        break;
      case "cart":
        window.dispatchEvent(new Event("carthaschanged"));
      default:
        break;
    }

    return true;

    // indica exito
  },

  get(target, property) {
    return target[property];
  },
};

const Store = new Proxy(originalStore, storeHandler);

export default Store;
