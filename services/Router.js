const Router = {
  init() {
    document.querySelectorAll(".navlink").forEach(enhanceLink.bind(this));
    this.go(location.pathname);
    listenForURLChanges();
  },

  go(route, addToHistory = true) {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    renderContent(route);
  },
};

export default Router;

function listenForURLChanges() {
  window.addEventListener("popstate", (e) => {
    Router.go(e.state.route, false);
  });
}

function renderContent(route) {
  switch (route) {
    case "/":
      var pageContent = document.createElement("h1");
      pageContent.textContent = "Menu";
      break;

    case "/order":
      var pageContent = document.createElement("h1");
      pageContent.textContent = "Order";

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

function enhanceLink(a) {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const goto = e.target.getAttribute("href");
    this.go(goto, true);
  });
}
