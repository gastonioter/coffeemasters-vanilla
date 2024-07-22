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
  console.log(location.pathname);

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
    const currentPage = document.querySelector("main").firstElementChild;

    if (!currentPage) {
      document.querySelector("main").appendChild(page);
    } else {
      // make a tranistion between pages

      const fadeOutKeyframes = [{ opacity: 1 }, { opacity: 0 }];
      const fadeInKeyframes = [{ opacity: 0 }, { opacity: 1 }];

      const fadeOutAnimation = currentPage.animate(fadeOutKeyframes, {
        duration: 200,
      });

      fadeOutAnimation.addEventListener("finish", () => {
        currentPage.remove();

        document.querySelector("main").appendChild(page);

        page.animate(fadeInKeyframes, {
          duration: 150,
        });
      });
    }
  }
}
