import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 引入重置样式
import './assets/css/reset.css'
// 引入公共样式文件
import './assets/css/common.css'
// 引入iconfont 字体图标样式
import './assets/fonts/iconfont.css'

import './utils/req.js'


new Vue({
  router,
  render: createDOM => createDOM(App)
}).$mount('#app')
/* new Vue({
  router,
  render: h => h(App)
}).$mount('#app') */
