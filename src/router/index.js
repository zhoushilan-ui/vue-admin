import Vue from 'vue'
import VueRouter from 'vue-router'
//页面级组件
import Layout from '@/components/Layout.vue';

import { Message } from 'element-ui';

Vue.use(VueRouter)

const routes = [
	// route level code-splitting  路由级代码拆分
	// this generates a separate chunk (about.[hash].js) for this route 这将为此路由生成一个单独的块（about.[hash].js）
	// which is lazy-loaded when the route is visited. 当访问路由时延迟加载。不访问我的首页，我就不加载
	//懒加载，按需加载js
	/* webpackChunkName: "about" */
	{
		path: '/login',
		alias: '/',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		meta: { requiresAuth: false }
	},

	// 路由的嵌套
	//文章列表的路由
	{
		path: '/article/', //父级
		name: 'Article',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{ //子级
				path: 'list',
				name: 'ArticleList',
				component: () => import('@/views/Article/List.vue'),
			},
			{ //子级
				path: 'release',
				name: 'ArticleRelease',
				component: () => import('@/views/Article/Release.vue')
			},
			{ //子级
				path: 'edit/:id',
				name: 'ArticleEdit',
				props:true, //添加一个props是解耦
				component: () => import('@/views/Article/Edit.vue')
			},
		]
	},
	//分类列表
	{
		path: '/category/', //父级
		name: 'Category',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{ //子级
			path: 'list',
			name: 'CategoryList',
			component: () => import('@/views/Category/List.vue')
		}, ]
	},
	//管理员列表
	{
		path: '/admin/', //父级
		name: 'Admin',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{ //子级
				path: 'list',
				name: 'AdminList',
				component: () => import('@/views/Admin/List.vue')
			},

			{ //编辑子级
				path: 'edit/:id', //传参数，这个参数是id，以后用的时候也是id
				name: 'AdminEdit',
				component: () => import('@/views/Admin/Edit.vue'),
				props: true,
			},
		]
	},
	//用户管理
	{
		path: '/user/', //父级
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{ //子级
				path: 'list',
				name: 'UserList',
				component: () => import('@/views/User/List.vue')
			},
			{ //子级
				path: 'edit/:id',
				name: 'UserEdit',
				component: () => import('@/views/User/Edit.vue')
			},

		]
	},
	//账户设置
	{
		path: '/account/', //父级
		name: 'Account',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{ //子级
			path: 'setting',
			name: 'AccountSetting',
			component: () => import('@/views/Account/Setting.vue')
		}, ]
	},
	//权限角色
	{
		path: '/role/', //父级
		name: 'Role',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{ //子级
			path: 'role',
			name: 'RoleRole',
			component: () => import('@/views/Role/Role.vue')
		}, ]
	},
]
//创建路由的实例
const router = new VueRouter({
	routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//全局守卫
router.beforeEach((to, from, next) => { //页面不需要跳转,直接被拦下了
	//例外,如果跳转到的路由是登录和注册时要立马放行 不进行校验
	//校验meta元信息，校验路由是否需要登录
	let isRequireAuth = to.matched.some((path) => path.meta.requiresAuth);
	//如果不需要登录，直接放行
	if (!isRequireAuth) {
		next();
		return;
	}
	//校验token
	let token = sessionStorage.token; //提取token
	//有token 放行
	if (token) {
		next();
		return;
	}
	//无token,强制跳转登录
	//提示用户
	Message.error('无效的Token，请重新登录！');
	//跳转页面
	setInterval(() => {
		next(`/login?redirect=${to.path}`); //``模板字符串
	}, 2000);
});


//把实列公开了
export default router
