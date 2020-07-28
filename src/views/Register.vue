<template>
	<div class="note">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>注册</span>
			</div>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" size="mini">
				<el-form-item label="账户" prop="username">
					<el-input v-model="ruleForm.username" placeholder="请输入账户名称"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input v-model="ruleForm.checkPass" placeholder="请再次确认密码" show-password></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="ruleForm.fullname" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="ruleForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机号" prop="tel">
					<el-input type="text" v-model="ruleForm.tel" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="checked">同意本站用户协议</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" class="formregitter">注册</el-button>
				</el-form-item>
				<router-link class="register" to='/login'>登录用户</router-link>
				<a href="#" class="forget">忘记密码</a>
			</el-form>
		</el-card>

	</div>
</template>

<script>
	import { Admin } from "@/api/index.js";
	console.log(Admin);
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return { //return之后所有的代码都不能执行
				checked: true,
				ruleForm: {
					username: '',
					fullname: '',
					password: '',
					checkPass: '',
					sex: '',
					tel: '',
					checked: ''
				},
				rules: {
					fullname: [{
							required: true,
							type: 'string',
							message: '请输入账户',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						type: 'string',
						message: '请输入密码',
						trigger: 'blur'
					}, {
						pattern: /^\d{6,}$/,
						message: '密码至少六位数',
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					username: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请确认性别',
						trigger: 'change'
					}],
					tel: [{
						required: true,
						message: '请填写正确的手机号',
						trigger: 'blur'
					}],
					chexked: [{
						required: true,
						message: '请打勾',
						trigger: 'blur'
					}]
				}
			};

		},
		methods: {
			submitForm(formName) {
				// console.log(register);
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						// alert('注册失败 !!');
						return false;
					}
					if (valid) {
					let { status, msg,data } = await Admin.register({...this.ruleForm}); //在这里调用Admin下的login
					if (status) {
						this.$message.success(msg);
						//保存token id role
						sessionStorage.id=data.id;
						sessionStorage.token=data.token;
						sessionStorage.role=data.role;
					} else {
						this.$message.error(msg);
					}
					}

				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped>
	/* 添加scoped,写在本页面的css,不影响其它页面 */
	.note {
		height: 100vh;
		background: url(../assets/login-bg.jpg) top center no-repeat;
		background-position: cover;
		background-size: 100%;
	}

	.demo-ruleForm {
		padding-top: 20px;
	}

	.el-input__inner {
		width: 200px;
	}

	.formregitter {
		margin-bottom: 30px;
	}

	.register,
	.forget {
		margin-top: 20px;
		display: inline-block;
		text-decoration: none;
		color: #000000;
		font-size: 14px;
	}

	.register {
		position: absolute;
		left: 20px;
		bottom: 10px;
	}

	.forget {
		position: absolute;
		right: 20px;
		bottom: 10px;
	}

	/*  */
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 350px;
		position: absolute;
		right: 30px;
		top: 100px;
	}
</style>
