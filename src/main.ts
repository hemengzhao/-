import { createApp } from 'vue'
import App from './App.vue'

import router from "./router";
import { setupStore } from "./store";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/css/reset.css'
const app = createApp(App)

// app.component('expand',Expand)
app.use(router).use(ElementPlus).mount('#app')
setupStore(app)
