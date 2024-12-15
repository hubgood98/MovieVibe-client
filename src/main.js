import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import routes from './router/index'

const app = createApp(App)
app.use(routes) //routes를 vue app에 연결
app.mount('#app')

