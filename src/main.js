import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from '@components/common/toast'

//安装toast插件
Vue.use(toast)

//安装懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('@img/common/placeholder.png')
})

//解决移动端300ms延迟
FastClick.attach(document.body)

// Vue.use(VueAwesomeSwiper)

//配置当前为开发环境
Vue.config.productionTip = false

//在原型上绑定一个Vue实例作为事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
