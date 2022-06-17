import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store/index'
// import router from './router/index'

const app = createApp(App).use(VueAxios,axios)
.use(ElementPlus).use(store).mount('#app')

// // // 弹窗提示
// import tips from '../config/Tips.js'
// // app.config.globalProperties.$tips = tips
// app.config.globalProperties.$tips = tips
// // // 请求地址
// import urls from '../api/api.js'
// app.config.globalProperties.$urls = urls
// // // 请求方法
// import request from '../api/request.js'
// app.config.globalProperties.$request = request