import Vue from 'vue'
import App from './App.vue'

import store from './config/store/store'; //状态管理
import axios from './config/axios'; //网络请求
import router from './config/router'; //路由
Vue.prototype.$axios = axios
import  ELEMENT  from  'element-ui'; //ui
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css'; //icon
import './components/icon' ;// icon
import vuescroll from 'vuescroll'; //滚动条

//import  dev from  './config/dev.js'; //引入设备相关js
Vue.config.productionTip = false;
//注册element组建
Vue.use(ELEMENT);

//取消警告

Vue.config.productionTip = false;

//滚动条插件
Vue.use(vuescroll, {
  ops: {}, // 在这里设置全局默认配置
  name: 'vueScroll' // 在这里自定义组件名字，默认是vueScroll
});
new Vue({
  router,
  axios,
 store,
  render: h => h(App)
}).$mount('#app')
