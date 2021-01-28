import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Angle from "vue3-angle";
import "vue3-angle/style/bundle.css";

createApp(App)
  .use(router)
  .use(Angle)
  .mount("#app");
