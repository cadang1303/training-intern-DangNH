import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("../layout/LayoutComponent"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../components/Home"),
      },
      {
        path: "/helloworld",
        name: "helloworld",
        component: () => import("../components/HelloWorld"),
      },
      {
        path: "/todoapp",
        name: "todoapp",
        component: () => import("../components/TodoApp"),
      },
      {
        path: "/autocomplete",
        name: "autocomplete",
        component: () => import("../components/autocomplete/FilterCities"),
      },
      {
        path: "/dropzone",
        name: "dropzone",
        component: () => import("../components/dropzone/DropZone"),
      },
    ],
  },
  {
    path: "*",
    name: "notfound",
    component: () => import("../components/layout/NotFound"),
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
