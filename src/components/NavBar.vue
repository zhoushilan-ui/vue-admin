<template>
	<div class="navbar">
		<div>
			<img :src="edit" alt="图片加载失败" style="width: 150px;height: 45px; margin-top: 9px;">
			<i class="el-icon-s-fold select"></i>
		</div>
		<div class="img">
			  <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" ></el-avatar>
		</div>
		<el-dropdown>
			<span class="el-dropdown-link">
				赵微<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>个人介绍</el-dropdown-item>
				<el-dropdown-item>设置密码</el-dropdown-item>
				<el-dropdown-item>个人中心</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	import edit from '@/assets/img/nav/logo.png'
	// import avater from '@/assets/img/default.jpg'
	export default {
		data() {
			return {
				edit: edit,
				// avater: avater
			};
		}
	}
</script>

<style>
	body {
		margin: 0;
		padding: 0;
	}

	.img {
		position: absolute;
		right: 90px;
		top: 15px;
	}

	.select {
		display: inline-block;
		position: absolute;
		top: 22px;
	}

	.navbar {
		position: relative;
		background-color: black;
		color: white;
		height: 60px;
		line-height: 55px;
		display: flex;
		justify-content: space-between;
		padding: 0px;
	}

	.el-header {
		padding: 0px !important;
	}

	.el-dropdown {
		width: 60px;
		padding: 6px 20px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: white;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
