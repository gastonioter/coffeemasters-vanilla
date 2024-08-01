import { getTotalItems } from "../services/Order.js";

function BadgeView() {
  var view = document.getElementById("badge");

  function init() {
    window.addEventListener("carthaschanged", render);
  }

  function render() {
    const total = getTotalItems();

    view.hidden = total == 0;

    view.textContent = total;
  }

  init();
}

export default BadgeView();
