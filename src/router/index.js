import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index', //登录界面
      component: import('../views/main/Index.vue'),
    },
	{
	  path: '/login',
	  name: 'login', 
	  component: import('../views/login/Login.vue'),
	},
  ]
})
