//整个项目的root文件   引入模块
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'
import './plugins/axios.js';

Vue.config.productionTip = false
// 根实例
new Vue({
  router,
  store,
  render: h => h(App)        //render是把App渲染出来
}).$mount('#app')
