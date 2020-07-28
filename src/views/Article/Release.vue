<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>文章发布</span>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="标题">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="摘要">
					<el-input v-model="form.description"></el-input>
				</el-form-item>
				<el-form-item label="分类">
					<el-col :span="6">
						<el-select v-model="form.cate_1st" placeholder="请选择文章的一级分类">
							<!-- @change="handleOptionChange" -->
							<el-option v-for="option in options_1st" :key="option.id" :label="option.name" :value="option.id"> </el-option>
						</el-select>
					</el-col>
					<el-col :span="6">
						<el-select v-model="form.cate_2nd" placeholder="请文章的分类">
							<el-option v-for="option in options_2nd" :key="option.id" :label="option.name" :value="option.id"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="主图">
					<single-upload :url="form.main_photo" @success='handleUpload($event)' @remove='form.avatar=""' @removesuccess="removeSuccess($event)"></single-upload>
				</el-form-item>

				<!-- 副文本编辑器 -->
				<el-form-item label="文本编译">
					<div>
						<div ref="editor" v-model='form.content'></div>
					</div>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="handleSave">保存修改</el-button>
					<!-- <el-button>取消</el-button> -->
				</el-form-item>
			</el-form>
		</div>
	</el-card>
</template>

<script>
	import E from 'wangeditor';
	import SingleUpload from '@/components/Updataimg.vue';
	import { Category } from '@/api/index';
	import { Article } from '@/api/index.js';
	export default {
		name: 'editor',
		components: {
			SingleUpload
		},
		data() {
			return {
				imageUrl: '',
				form: {
					title: '',
					cate_1st: '',
					cate_2nd: '',
					description: '',
					content: '',
					main_photo: '',
				},
				options_1st: [], //把数据放在一个空数据里面
				options_2nd: [], //把数据放在一个空数据里面
			}
		},
		mounted() {
			var editor = new E(this.$refs.editor);
			//同步form数据
			editor.customConfig.onchange = (html) => {
				this.form.content = html
			}
			//如果不配置图片，wangeedit值能上传网络图片
			//配置图片上传

			//第一种
			//使用base64保存图片 缺点：代码很长，小图片适合base64
			//	editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片

			//第二种
			//把图片上传到本地服务器
			// 配置服务器端地址
			editor.customConfig.uploadImgServer = '/upload/editor/';
			//配置上传发fileName
			editor.customConfig.uploadFileName = 'file';
			//自定义headers头 是了获取到权限
			editor.customConfig.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}`,
			}



			//把图片上传到
			editor.create();
		},
		async created() {
			/* let options = this.loadSubcate(0).then((options) => { //用then方法捕获
				this.options_1st = options; //把值赋给了以及分类
			}); */
			//获取一级分类
			let options = await this.loadSubcate(0);
			this.options_1st = options;

		},
		watch: {
			"form.cate_1st": async function(val) {
				//获取二级分类
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				//默认选择第一项
				this.form.cate_2nd = options[0].id;
			}
		},
		methods: {
			//获取子级分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				return data; //把数据return出去 promise对象
			},
			//第二个select，根据value的值请求下一级的菜单
			/* handleOptionChange(value) {
				console.log(value);
				this.loadSubcate(value).then((options) => {
					this.options_2nd = options;
					//赋值，赋上子分类的第一项的id
					console.log(options);
					this.form.cate_2nd = this.options_2nd[1].id;
				});
			}, */
			//头像上传成功
			handleUpload({ status, total, data }) {
				
				this.form.main_photo = data;
			},
			//告诉父组件删除成功
			removeSuccess(value) {
				this.form.main_photo = value;
			},
			//保存数据
			async handleSave() {
				let { status, data } = await Article.add({ ...this.form });
				console.log(this.form);
				if (status) {
					data = this.form;
					this.$message.success("文章发布成功");
					this.$router.replace('/article/list');
				}
			}
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
