import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'

window.$ = require('jquery')
window.JQuery = require('jquery')
const app = createApp(App).use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
import 'bootstrap/dist/js/bootstrap.js'