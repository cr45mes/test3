import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import request from './utils/requesr'

console.log('环境变量=>', import.meta.env)
const app = createApp(App)
app.config.globalProperties.$request = request
app.use(router).use(Elementplus).mount('#app')
