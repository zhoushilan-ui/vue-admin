<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>用户编辑</span>
		</div>
		<el-form ref="form" :model="form" label-width="80px" :rules="rules" he>
			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="nicname">
				<el-input v-model="form.nickname"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="form.sex">
					<el-radio label="男">男</el-radio>
					<el-radio label="女">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机号" prop="tel">
				<el-input v-model="form.tel"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('form')">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { User } from '@/api/index.js';
	export default {
		data() {
			return {
				form: {
					username: '',
					nickname: '',
					sex: '',
					tel: '',
				},
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
					],
					nickname: [
						{ required: true, message: '请输入昵称', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
					],
					sex:[{ required: true, message: '请选择一个性别', trigger: 'blur' }],
					tel:[
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ type:'string',required: true , pattern:/^1[3456789]\d{9}$/,trigger:'change' }
					]
				}
			}
		},
		created() {
			//获取数据
			// console.log(this.$route.params.id)
			this.loadEdit(this.$route.params.id);
			console.log(this.$route.params.id);
		},
		methods: {
			async loadEdit(id) {
				let { status, data } = await User.info({ id: id });
				if (status) {
					this.form = data;
				}
			},
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status,data} = await User.edit(this.$route.params.id, { ...this.form });
						if (status) {
							data = this.form;
							//跳转页面
							this.$router.replace('/user/list');
						}
					}
					if (!valid) {
						this.$message.error("数据保存失败");
						return false;
					}
				});
			},
		}

	}
</script>

<style>

</style>
