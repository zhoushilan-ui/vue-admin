<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>管理员编辑</span>
		</div>
		<el-form ref="form" :model="form" label-width="80px" status-icon :rules="rules">
			<el-form-item label="用户" prop="username">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop='fullname'>
				<el-input v-model="form.fullname"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop='sex'>
				<el-radio-group v-model="form.sex">
					<el-radio label="男">男</el-radio>
					<el-radio label="女">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机号" prop='tel'>
				<el-input v-model="form.tel"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop='email'>
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<single-upload :url="form.avatar" @success='handleUpload($event)' @remove='form.avatar=""' @removesuccess="removeSuccess($event)"></single-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('form')">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>

</template>

<script>
	import { Admin } from '@/api/index';
	import img from '@/assets/img/default.jpg';
	import SingleUpload from '@/components/Updataimg.vue';
	export default {
		props:['id'],
		components: {
			SingleUpload
		},
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				form: {
					username: '',
					fullname: '',
					tel: '',
					role: '',
					sex: '',
					email: '',
					avatar: ''
				},
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
					],
					fullname: [
						{ required: true, message: '请输入昵称', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
					],
					sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
					tel: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ type: 'string', required: true, pattern: /^1[3456789]\d{9}$/, trigger: 'change' }
					],
					email: [
						{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
					],
					avatar: [{ required: true, message: '请选择一张图片', trigger: 'change' }]
				}
			}
		},
		created() {
			//获取参数
			//console.log(this.$route);//路由的对象
			//console.log(this.$router);//路由的实例
			console.log(this.$route.id);
			//如何请求数
			//调用函数
			this.loadInfo(this.id);
			//组件的参数有点长
		},
		watch: {
			//下管理员资料中把路劲改了后，下面的资料也一起改变。
			'$route': function(to, from) { //to是目的地，from是从哪里来的 from-to,地址从from改到了to
				console.log(to)
				console.log(from);
				let {id}=to.params;
				this.loadInfo(id);
			}
		},
		methods: {
			//头像上传成功
			handleUpload({ status, total, data }) {
				console.log(data);
				this.form.avatar = data;

			},
			async loadInfo(id) { //获取管理员的个人资料
				let { status, data } = await Admin.info({ id });
				if (status) {
					this.form = data;
				}
			},
			//告诉父组件删除成功
			removeSuccess(value){
				this.form.main_photo=value;
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						console.log(this.form);
						let { status, data } = await Admin.edit({ ...this.form });
						if (status) {
							this.form.avatar = '..' + this.form.avatar.slice(this.form.avatar.indexOf('/images'));
							data = this.form;
							this.$router.push('/admin/list');
						}
						if (this.form.avatar = '') {
							this.form.avatar = img;

						}
					}
					if (!valid) {
						console.log('error submit!!');
						return false;
					}
				});

			},
		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
