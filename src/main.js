import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router)
  .mount("#app");

Array.prototype.setFirstNonZeroElementToZero = function() {
  this[this.findIndex((element) => element !== 0)] = 0;
};
