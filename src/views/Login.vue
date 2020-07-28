<template>
	<div class="note ">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>登录</span>
			</div>
			<el-form :model="form" :rules="rules" ref="form" label-width="60px" size="mini" class="demo-ruleForm">
				<el-form-item label="账户" prop="username">
					<el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入账户名称"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password" prefix-icon="el-icon-male" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleLogin('form')" class="formlogin">登录
					</el-button>
				</el-form-item>
				<router-link class="register" to='/register'>注册用户</router-link>
				<a href="#" class="forget">忘记密码</a>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import { Admin } from "@/api/index.js"; //拿index到api下面的
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
				},
				rules: {
					username: [{ //这个是非空验证
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
						trigger: 'change'
					}, {
						pattern: /^\d{3,}$/,
						message: '长度在至少3字符',
						trigger: 'blur'
					}],
				}
			};
		},
		methods: {
			handleLogin(formName) {
				//this.$refs.ruleForm等价于于this.$refs['ruleForm']
				//document.getElementById("ruleForm");
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//验证失败
						return false;
					}
					if (valid) {
						//发送ajax
						//使用axios库
						//await是then的语法糖
						//写页面时，往往把ajax封装成一个函数
						let { status, msg, data } = await Admin.login({ ...this.form }); //在这里调用Admin下的login
						if (status) {
							//登录成功，储存token uid role 
							//把数据放在sessionStorage
							
							sessionStorage.token = data.token
							sessionStorage.role = data.role;
							sessionStorage.id = data.id;
							//跳转页面
							//根据路由的传参，跳转到下一个页面
							//是否有重定向 redirect参数
							let { redirect } = this.$route.query;
							if (redirect) { //如果redirect有值的话，跳转到重定向的地址页面
								this.$router.replace(redirect);
							} else { //如果没有值的话，跳转到默认页面
								//默认的跳转
								this.$router.replace('/article/list');
							}
							this.$message.success(msg);
						} else {
							this.$message.error(msg);
						}
						//this.$router相当于import router from "@/router/index.js";
						//缺点：
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
	.note {
		height: 100vh;
		background: url(../assets/login-bg.jpg) top center no-repeat;
		background-size: cover;
		position: relative;
	}

	.demo-ruleForm {
		padding-top: 20px;
	}

	.el-form-item__content {
		width: 200px;
	}

	.register,
	.forget {
		display: inline-block;
		text-decoration: none;
		color: #000000;
		font-size: 14px;
	}

	.formlogin {
		margin-bottom: 30px;
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
		width: 480px;
	}

	/* card卡 */
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
		width: 310px;
		position: absolute;
		right: 30px;
		top: 150px;
	}
</style>
