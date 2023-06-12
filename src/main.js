import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toaster from '@meforma/vue-toaster'
import VueClipboard from 'vue3-clipboard'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(Toaster)
app.use(VueClipboard,{
    autoSetContainer: true,
    appendToBody: true}
)

app.config.globalProperties.apiUrl = 'http://localhost:3000/' //Local JSON SERVER API URL

app.config.globalProperties.jsonConfigNoAuth = {
    headers: {
    'Content-Type': 'application/json'
    }
}

app.mount('#app')
