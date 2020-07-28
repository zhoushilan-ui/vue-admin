<template>
	<el-container>
		<el-header>
			<NavBar></NavBar>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<!-- 菜单 -->
				<LeftMenu></LeftMenu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	//引入公共组件
	import NavBar from '@/components/NavBar.vue';
	import LeftMenu from '@/components/LeftMenu.vue';
	//注册
	export default {
		components: {
			NavBar,
			LeftMenu
		}
	}
</script>

<style>
	.main {
		display: flex;
	}

	.content {
		padding: 20px;
	}
</style>
