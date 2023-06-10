import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toaster from '@meforma/vue-toaster';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(Toaster)

app.config.globalProperties.apiUrl = 'http://localhost:3000/'
app.config.globalProperties.jsonConfigNoAuth = {
    headers: {
    'Content-Type': 'application/json'
    }
}

app.mount('#app')
