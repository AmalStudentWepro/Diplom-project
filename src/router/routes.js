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
];
