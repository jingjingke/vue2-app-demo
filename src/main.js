//引入vue + router + resource
import Vue from 'vue';
import VueRouter from "vue-router";
import VueResource from "vue-resource";

import store from './store';

//Vue使用router、vuex插件
Vue.use(VueRouter);



//引入home根
import home from './components/home';
//引入routes路由配置文件
import routes from './config/routes';
//创建路由
var router = new VueRouter({
//	mode: 'history',
//	base: __dirname,
	hashbang: false,
	history:true,
	routes:routes,
	scrollBehavior:function(to,from,savedPosition){
		return { "x":0 , "y": 0 }
	}
})
//创建实例
var app = new Vue({
	store,
	router,
	render: h => h(home)
}).$mount('#app')


//Vue使用resource插件
Vue.use(VueResource);
//启用emulateJSON选项[否则发送post-json可能会不成功]
Vue.http.options.emulateJSON = true;
//引入封装的ajax文件[方便处理登录过期等问题]
import ajax from './config/ajax';
//将ajax方法挂到全局
Vue.prototype.$ajax = ajax.common;


//通过components下的index.js文件导入组件
import components from './components/';
//对导入的组件进行全局组件注册
Object.keys(components).forEach((key)=>{
	Vue.component(key,components[key])
})


//通过filters.js导入自定义用于过滤的函数
import filters from './config/filters';
//对导入的函数进行全局过滤器注册
Object.keys(filters).forEach((key)=>{
	Vue.filter(key,filters[key])
})


//methods.js导入自定义方法用于全局方法
import methods from './config/methods';
//方法挂靠全局
Object.keys(methods).forEach((key)=>{
	Vue.prototype[key] = methods[key];
})


//如果页面全局获取不到私钥(或浏览器不支持localStorage)
//则路由直接跳转到首页[主要解决刷新页面时私钥丢失的情况]
if(Vue.prototype.appInfo.secret === null) router.push('/');