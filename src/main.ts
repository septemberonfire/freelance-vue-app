import { createApp } from "vue";
import { router } from "./router";
import { createPinia } from "pinia";

import "./theme.css";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
