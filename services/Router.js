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
    go(goto, true);
  });
}

function renderContent(route) {
  switch (route) {
    case "/":
      var pageContent = document.createElement("menu-page");
      break;

    case "/order":
      var pageContent = document.createElement("order-page");

      break;

    default:
      // 404 Component
      break;
  }

  if (pageContent != null) {
    //document.querySelector('main').innerHTML = ''
    document.querySelector("main").children[0]?.remove();
    document.querySelector("main").appendChild(pageContent);
  }
}
