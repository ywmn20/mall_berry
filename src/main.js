import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 事件总线  vuex也可以解决问题
Vue.prototype.$bus=new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//图片懒加载
Vue.use(VueLazyLoad)
// Vue.use(VueLazyLoad,{
//   loading:require('./assets/img/common/placeholder.png')
//老师测试出来，import导入不了
// })

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
