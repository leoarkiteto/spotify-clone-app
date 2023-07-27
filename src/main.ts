import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPlugintPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const pinia = createPinia();
pinia.use(piniaPlugintPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
