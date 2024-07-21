// TODO: ACCEPT A LIST OF ROUTES

// TODO: ACCEPT COMPONENTS TO RENDER ON EACH ROUTE

//const routes = [];

const Router = {
  init,
  go,
};

export default Router;

function init() {
  document.querySelectorAll(".navlink").forEach(enhanceLink);
  go(location.pathname);
  listenForURLChanges();
}

function go(route, addToHistory = true) {
  if (addToHistory) {
    history.pushState({ route }, null, route);
  }

  renderContent(route);
}

function listenForURLChanges() {
  window.addEventListener("popstate", (e) => {
    go(e.state.route, false);
  });
}

function enhanceLink(a) {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const goto = e.target.getAttribute("href");
    go(goto);
  });
}

function renderContent(route) {
  switch (route) {
    case "/":
      var page = document.createElement("menu-page");
      break;

    case "/order":
      var page = document.createElement("order-page");

      break;

    default:
      if (route.startsWith("/product-")) {
        var page = document.createElement("details-page");
        page.dataset.productId = route.split("-")[1];
      }
  }

  if (page != null) {
    // ATTACHE ELEMENT (PAGE) TO THE DOM
    document.querySelector("main").innerHTML = "";
    document.querySelector("main").appendChild(page);
  }
}
