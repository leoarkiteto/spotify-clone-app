import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPlugintPersistedstate from "pinia-plugin-persistedstate";
import Vue3Lottie from "vue3-lottie";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const pinia = createPinia();
pinia.use(piniaPlugintPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Vue3Lottie);

app.mount("#app");
