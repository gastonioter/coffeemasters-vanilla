const routes = [];
let routeParams = {};

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
  console.log(location.pathname);

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
  const route = routes.find(matchPathPattern);

  if (route) {
    updateParamsObj(route, pathname);

    const { view } = route;

    const previousView = mainEl.firstElementChild;

    const currentView = document.createElement(view);

    // pass in the params to the view;
    for (const param in routeParams) {
      currentView.dataset[param] = routeParams[param];
    }

    if (previousView) {
      previousView.remove();
    }

    mainEl.appendChild(currentView);
    console.dir(currentView);
  } else {
    console.log("404");
  }

  function cleanPath(path) {
    // If the path ends with '/', remove it.
    // and remove the first "/"
    if (/[\w]\/$/.test(path)) {
      path = path.slice(0, -1);
    }

    return path;
  }

  function matchPathPattern(route) {
    pathname = cleanPath(pathname);
    console.log(pathname);
    console.log();

    const urlSegments = pathname?.split("/").slice(1);
    const routeSegments = route.path?.split("/").slice(1);

    if (routeSegments.length != urlSegments.length) return false;

    // the same length and the same slots?
    return urlSegments.every((urlSegment, i) => {
      return urlSegment == routeSegments[i] || routeSegments[i].startsWith(":");
    });
  }

  function updateParamsObj(route, pathname) {
    const routeSegments = route.path.split("/").slice(1);
    const urlSegments = pathname.split("/").slice(1);
    routeSegments.forEach(function addParams(segment, index) {
      if (segment.startsWith(":")) {
        segment = segment.slice(1);
        routeParams[segment] = urlSegments[index];
      }
    });
  }
}
