export const routes = [
  {
    path: /^\/$/,
    view: async (app) => {
      const response = await fetch("src/pages/home/index.html");
      const html = await response.text();
      app.innerHTML = html;
    },
    loadStyles: () =>
      import("../pages/home/style.css", { assert: { type: "css" } }),
    loadScripts: () => import("../pages/home/script.js"),
  },
  {
    path: /^\/signin$/,
    view: async (app) => {
      const response = await fetch("src/pages/signin/index.html");
      const html = await response.text();
      app.innerHTML = html;
    },
    loadStyles: () =>
      import("../pages/signin/style.css", { assert: { type: "css" } }),
    loadScripts: () => import("../pages/signin/script.js"),
  },
  {
    path: /^\/profile$/, 
    view: async (app) => {
      const response = await fetch("src/pages/profile/index.html");
      const html = await response.text();
      app.innerHTML = html;
    },
    loadStyles: () =>
      import("../pages/profile/style.css", { assert: { type: "css" } }),
    loadScripts: () => import("../pages/profile/script.js"),
  },
  {
    path: /^\/signup$/,
    view: async (app) => {
      const response = await fetch("src/pages/signup/index.html");
      const html = await response.text();
      app.innerHTML = html;
    },
    loadStyles: () =>
      import("../pages/signup/style.css", { assert: { type: "css" } }),
    loadScripts: () => import("../pages/signup/script.js"),
  },
  {
    path: /^\/movie$/,
    view: async (app) => {
      const response = await fetch("src/pages/movie/index.html");
      const html = await response.text();
      app.innerHTML = html;
    },
    loadStyles: () =>
      import("../pages/movie/style.css", { assert: { type: "css" } }),
    loadScripts: () => import("../pages/movie/script.js"),
  },  
  {
    path: /^\/404$/,
    view: async (app) => {
      const response = await fetch("src/pages/404/index.html");
      const html = await response.text();
      app.innerHTML = html;
    },
    loadStyles: () =>
      import("../pages/404/style.css", { assert: { type: "css" } }),
    loadScripts: () => import("../pages/404/script.js"),
  },
  {
    path: /^\/actor$/,
    view: async (app) => {
      const response = await fetch("src/pages/actor/index.html");
      const html = await response.text();
      app.innerHTML = html;
    },
    loadStyles: () =>
      import("../pages/actor/style.css", { assert: { type: "css" } }),
    loadScripts: () => import("../pages/actor/script.js"),
  }
];
