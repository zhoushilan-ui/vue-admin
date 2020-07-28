<template>
	<!--<div> 
		<nav>
			<router-link to='/' exact  active-class="active">首页</router-link> -->
			<!--  通过属性来更改  active-class-->
			<!-- <router-link to="/login" exact active-class="active">
				登录
			</router-link>
			<router-link to="/register" exact active-class="active">
				注册
			</router-link>
			<router-link to="/article/list" exact active-class="active">
				文章列表
			</router-link>
		</nav> -->
		<router-view></router-view>

	<!-- </div> -->

</template>

<script>
	export default {
		name: 'app',
		components: {

		}
	}
</script>

<style>
	nav {
		padding: 30px;
	}

	nav a {
		margin: 0 30px;
	}

	/*  第一种情况下，如果a链接被激活，添加一个样式 a链接高亮显示 */
	nav a.router-link-active {
		color: orange;
		font-size: bold;
	}

	/* 第二种情况下 在a连接上添加一个active-class="active"*/
	nav a.active {
		color: orange;
		font-size: bold;
	}
	/* 第三种情况  在多加一个属性exact*/
	
</style>
