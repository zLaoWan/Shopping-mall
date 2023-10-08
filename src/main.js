import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 引入组件
import TypeNav from '@/components/TypeNav/TypeNav'
import Carousel from "@/components/Carousel/Carousel"
import Pagination from "@/components/Pagination/Pagination"
// 全局挂载组件   组件名 + 组件
app.component('TypeNav', TypeNav)
app.component('Carousel', Carousel)
app.component('Pagination', Pagination)

// element 组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// 懒加载
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/atm.gif'
app.use(VueLazyload, {
  loading: atm
})

// 自定义插件
import myPlugins from './plugins/myPlugins'
app.use(myPlugins, {
  name: 'plugins'
})

// 引入路由
import router from './router'
// 注册路由信息 这里书写router时 组件身上都会有router route属性
app.use(router)

// 引入vuex仓库
import store from '@/store'
// 注册仓库 组件实例身上会多一个store属性
app.use(store)

// 引入MockServer.js ---- mock 数据 
import '@/mock/mockServe'

import mitt from 'mitt'
const bus = mitt()
app.config.globalProperties.$bus = bus

app.mount('#app')

// 将创建过程拆分开来
// createApp(App).use(router).mount('#app')
