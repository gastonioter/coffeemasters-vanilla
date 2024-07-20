import API from "./API.js";

export async function loadMenu() {
  app.store.menu = await API.fetchMenu();
}
