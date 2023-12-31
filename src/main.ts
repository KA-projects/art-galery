import { createApp } from "vue";
import { RouterOptions, createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import "./style.css";

import Home from "./pages/home/Home.vue";
import PhotoDetails from "./pages/photo-details/PhotoDetails.vue";
import Liked from "./pages/favourites/Liked.vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const routes: RouterOptions["routes"] = [
  { path: "/", component: Home },
  { path: "/photo-details/:id", component: PhotoDetails },
  { path: "/favourites", component: Liked },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount("#app");
