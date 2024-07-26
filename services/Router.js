const routes = [];
const routeParams = {};

const Router = {
  registerRoutes,
  init,
  go,
};

export default Router;

function registerRoutes(routesToAdd) {
  routesToAdd.forEach((route) => {
    routes.push(route);
  });
}
function init() {
  document.querySelectorAll(".navlink").forEach(enhanceLink);

  go(location.pathname);
  listenForURLChanges();
}

function go(path, addToHistory = true) {
  if (addToHistory) {
    history.pushState({ path }, null, path);
  }

  renderContent(path);
}

function listenForURLChanges() {
  window.addEventListener("popstate", (e) => {
    go(e.state.path, false);
  });
}

function enhanceLink(a) {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const goto = e.target.getAttribute("href");
    go(goto);
  });
}

// function renderContent(route) {
//   switch (route) {
//     case "/":
//       var page = document.createElement("menu-page");
//       break;

//     case "/order":
//       var page = document.createElement("order-page");

//       break;

//     default:
//       if (route.startsWith("/product-")) {
//         var page = document.createElement("details-page");
//         page.dataset.productId = route.split("-")[1];
//       }
//   }

//   if (page) {
//     const currentPage = document.querySelector("main").firstElementChild;

//     if (!currentPage) {
//       document.querySelector("main").appendChild(page);
//     } else {
//       // make a tranistion between pages

//       const fadeOutKeyframes = [{ opacity: 1 }, { opacity: 0 }];

//       const fadeOutAnimation = currentPage.animate(fadeOutKeyframes, {
//         duration: 200,
//       });

//       fadeOutAnimation.addEventListener("finish", renderNewPage);
//     }

//     function renderNewPage() {
//       const fadeInKeyframes = [{ opacity: 0 }, { opacity: 1 }];
//       currentPage.remove();

//       document.querySelector("main").appendChild(page);

//       page.animate(fadeInKeyframes, {
//         duration: 150,
//       });
//     }
//   } else {
//     document
//       .querySelector("main")
//       .insertAdjacentHTML("beforeend", `<h1>Ups 404 Error: Unknow page</h1>`);
//   }
// }

const mainEl = document.querySelector("main");
function renderContent(pathname) {
  /* inject to the DOM the view attached to the given pathname */

  /* Search for a route that matches the pathname's patten */
  let route = routes.find(matchPathPattern);

  if (!route) {
    route = routes[routes.length - 1];
  }

  updateParamsObj(route, pathname);

  const { view } = route;

  const previousView = mainEl.firstElementChild;

  const currentView = document.createElement(view);

  // pass in the params to the view;
  for (const param in routeParams) {
    currentView.dataset[param] = routeParams[param];
  }

  if (previousView) {
    /* make a transition animation */

    previousView
      .animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
      })
      .addEventListener("finish", () => {
        previousView.remove();
        mainEl.appendChild(currentView);
        currentView.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 200,
        });
      });
  } else {
    mainEl.appendChild(currentView);
  }

  function matchPathPattern(route) {
    pathname = cleanPath(pathname);

    const urlSegments = pathname.split("/").slice(1);
    const routeSegments = route.path.split("/").slice(1);

    if (routeSegments.length != urlSegments.length) return false;

    // the same length and the same slots?
    const match = urlSegments.every((urlSegment, i) => {
      return urlSegment == routeSegments[i] || routeSegments[i].startsWith(":");
    });

    return match;
  }
}

function cleanPath(path) {
  // If the path ends with '/', remove it.
  // and remove the first "/"
  if (/[\w]\/$/.test(path)) {
    path = path.slice(0, -1);
  }

  return path;
}

function updateParamsObj(route, pathname) {
  if (route.path == "*") return;

  const [, ...routeSegments] = route.path.split("/");
  const [, ...urlSegments] = pathname.split("/");
  routeSegments.forEach(function addParams(segment, index) {
    if (segment.startsWith(":")) {
      segment = segment.slice(1);
      routeParams[segment] = urlSegments[index];
    }
  });
}
