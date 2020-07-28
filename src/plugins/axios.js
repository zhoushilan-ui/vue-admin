import axios from 'axios';

//引入loading
import { Loading, Message } from 'element-ui';

//引入router实例
import router from '@/router/index.js';

//声明变量
let loading;

//默认的baseurl
axios.defaults.baseURL = 'http://localhost:3001';

//请求拦截器
axios.interceptors.request.use(function(config) {
	//在这里你可以判断后台返回数据携带的请求码
	//把loading开启
	loading = Loading.service({ background: 'rgba(0,0,0,0.3)' });
	//在header设置
	//判断是否携带token
	// 排除登录和注册，不需要携带token 
	//config记录请求ajax的接口
	if (config.url == '/admin/register' || config.url == '/admin/login') {
		return config;
	}
	// 获取token
	let token = sessionStorage.token;
	// 若token为空 ,提示用户没有token，请用户重新登录
	if (!token) {
		//以服务的形式调用message
		Message.error('无效的Token,请重新登录！');
		//跳转页面
		setTimeout(() => {
			//延迟1秒，在跳转页面
			loading.close();
			console.log(router);
			router.replace('/login');
		}, 1000);
		//如何跳转到原来的页面,在登录是传个参数  ,通过导航守卫的方式
	}
	// 若token不为空
	config.headers.Authorization = `Bearer ${token}`;
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function(response) {
	let { status, data } = response;
	loading.close();
	return data;
}, function(error) {
	// 对响应错误做点什么
	//检测401从这里检测
	return Promise.reject(error);
});
