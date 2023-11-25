import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import "./style.css";

import Home from "./pages/home/Home.vue";
import PhotoDetails from "./pages/photo-details/PhotoDetails.vue";
import App from "./App.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/photo-details/:id", component: PhotoDetails },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount("#app");
