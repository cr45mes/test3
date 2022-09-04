import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import request from './utils/requesr'
import storage from './utils/storage'
import api from './api'
import store from './store'

console.log('环境变量=>', import.meta.env)

const app = createApp(App)

app.directive('has', {
  beforeMount: function (el, binding) {
    //获取按钮权限
    let actionList = storage.getItem('actionList')
    let value = binding.value
    //判断列表中是否有对应按钮权限标识
    let hasPermission = actionList.includes(value)
    if (!hasPermission) {
      el.style = 'display:none'
      setTimeout(() => {
        el.parentNode.removeChild(el)
      }, 0)
    }
  }
})
app.config.globalProperties.$request = request
app.config.globalProperties.$api = api
app.config.globalProperties.$storage = storage
app.use(router).use(store).use(Elementplus, { size: 'small' }).mount('#app')
