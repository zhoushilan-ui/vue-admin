<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>账户资料</span>
		</div>
		<el-form ref="form" :model="form" label-width="80px" status-icon >
			<el-form-item label="用户" prop="username">
				<el-input v-model="form.username" :disabled="true" placeholder="admin"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="fullname">
				<el-input v-model="form.fullname" placeholder="赵薇"></el-input>
			</el-form-item>
			<el-form-item label="角色" prop="role">
				<div>
					<el-select v-model="form.role" slot="prepend" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<template>
					<el-radio v-model="radio" label="1">男</el-radio>
					<el-radio v-model="radio" label="2">女</el-radio>
				</template>
			</el-form-item>
			<el-form-item label="手机号" prop="tel">
				<el-input v-model="form.tel" placeholder="18569325687"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="form.email" placeholder='42578758@qq.com'></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
			
				<single-upload :url="form.avatar" @success='handleUpload($event)' @remove='form.avatar=""'></single-upload>
				
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('form')">保存资料</el-button>
			</el-form-item>
		</el-form>
	</el-card>

</template>

<script>
	import imageUrl from '@/assets/img/default.jpg';
	import SingleUpload from '@/components/Updataimg.vue';
	export default {
		components: {
			SingleUpload
		},
		data() {
			return {
				imageUrl: imageUrl,
				options: [{
					value: '超级管理员',
					label: '超级管理员'
				}, {
					value: '会员级管理员',
					label: '会员级管理员'
				}, {
					value: '普通管理员',
					label: '普通管理员'
				}],
				rullName: [{
					username: '赵薇',
					name: '超级管理员',
					tel: '18795642356',
					email: '1244445@qq.com'
				}],
				form: {
					username: '',
					fullname: '',
					sex: '',
					role: '',
					tel: '',
					email: '',
					avatar: ''
				},
				radio: '1',
				dialogImageUrl: '',
				dialogVisible: false,
				// rules: {
				// 	username: [
				// 		{ required: true, message: '请输入账户', trigger: 'blur' },
				// 		{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				// 	],
				// 	fullname: [
				// 		{ required: true, message: '请输入用户名', trigger: 'blur' },
				// 		{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				// 	],
				// 	sex: [{ required: true, message: '请选择一个性别', trigger: 'change' }],
				// 	role: [{ required: true, message: '请选择一个角色', trigger: 'change' }],
				// 	tel: [{
				// 		pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
				// 		message: '请输入正确的手机号',
				// 		trigger: 'blur'

				// 	}],
				// 	email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
				// 		{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
				// 	],
				// 	avatar: [{
				// 		validator: validateAvatar,
				// 		trigger: 'blur'
				// 	}]
				// },
			}
		},
		methods: {
			
			
			//头像上传成功
			handleUpload({ status, total, data }) {
				console.log(data);
				this.form.avatar = data;
			
			},
			// //上傳圖片
			// handleAvatarSuccess(res, file, filelist) {
			// 	this.imageUrl = URL.createObjectURL(file.raw);
			// 	//	console.log(filelist) //处理图片上传成功的
			// 	//当res回来
			// 	if (res.status) {
			// 		//赋值，是图片的地址
			// 		this.form.avatar = res.data;
			// 	} else {
			// 		//上传一个大的图片
			// 	}
			// },
			// beforeAvatarUpload(file) { //为了检测，如果上传的不是jpg，或者是大于2MB，图片不能上传
			// 	const isJPG = file.type === 'image/jpeg';
			// 	const isLt2M = file.size / 1024 / 1024 < 2;
			// 	if (!isJPG) {
			// 		this.$message.error('上传头像图片只能是 JPG 格式!');
			// 	}
			// 	if (!isLt2M) {
			// 		this.$message.error('上传头像图片大小不能超过 2MB!');
			// 	}
			// 	return isJPG && isLt2M;
			// },
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

		}
	}
</script>

<style scoped>
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

	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.el-main {
		margin: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
	}

	/* 下来框 */
	.el-select .el-input {
		width: 130px;
	}

	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
</style>
