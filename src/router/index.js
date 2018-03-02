// 这里面负责写路由映射，便于管理


// 引入路由模块并使用它
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import home from '../App.vue'
import hello from "../pages/hello.vue";
import about from "../pages/about.vue";

Vue.use(VueRouter)
// 创建路由实例并配置路由映射
// path:'*',redirect:'/home'  重定向到path是/home的映射
const router = new VueRouter({
  mode: 'history',
  routes:[{
    path: '/hello', component: hello
  },{
    path: '/about', component: about
  },{
    path:'*',component: home
  }]
})


// 输出router
export default router;
