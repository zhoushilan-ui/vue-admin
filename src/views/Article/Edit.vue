<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>文章编辑</span>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="标题" prop="title">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="摘要">
					<el-input v-model="form.description"></el-input>
				</el-form-item>
				<el-form-item label="分类">
					<el-col :span="6">
						<el-select v-model="form.cate_1st" @change="handleCate_1stChange" placeholder="请选择文章的一级分类">
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
					<single-upload :url="form.main_photo" @success='handleUpload($event)' @remove='form.main_photo=""'></single-upload>
				</el-form-item>

				<!-- 副文本编辑器 -->
				<el-form-item label="文本编译">
					<div>
						<div ref="editor" v-model='form.content'></div>
					</div>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="handleSave">保存修改</el-button>
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
		props: ['id'],
		name: 'editor',
		components: {
			SingleUpload
		},
		data() {
			return {
				imageUrl: '',
				form: {
					title: '',
					cate_1st: '', //监听
					cate_2nd: '',
					description: '',
					content: '',
					main_photo: '',
				},
				options_1st: [], //把数据放在一个空数据里面
				options_2nd: [], //把数据放在一个空数据里面
			}
		},

		async mounted() {
			//先获取文章的一级分类
			this.options_1st = await this.loadSubcate(0);
			console.log(this.options_1st);
			//获取文章的详情
			let article = await this.loadingDetail(this.id);
			this.form = article;
			//根据artile的里面的cate_1st来获取二级的分类
			this.options_2nd = await this.loadSubcate(article.cate_1st);
			//当触发一级分类时，利用change事件来改变二级的分类

			var editor = new E(this.$refs.editor);
			editor.customConfig.onchange = (html) => {
				this.form.content = html;
				console.log(html);
			}

			//把图片上传到本地服务器
			// 配置服务器端地址
			editor.customConfig.uploadImgServer = '/upload/editor/';
			//配置上传发fileName
			editor.customConfig.uploadFileName = 'file';
			//自定义headers头 是了获取到权限
			editor.customConfig.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}`,
			}
			editor.create();

			//把从ajax中获取的数据赋值给副文本编译器
			editor.txt.html(this.form.content);

		},

		methods: {

			//一级分类的change事件，请求二级分类
			async handleCate_1stChange(val) {
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				this.form.cate_2nd = options[0].id;
			},
			//传参数
			async loadingDetail(id) {
				let { status, data } = await Article.detail({ id: id });
				console.log(status);
				if (status) {
					return data;
				}
			},

			//获取子级分类
			async loadSubcate(id) {
				console.log(id);
				let { status, data } = await Category.subcate({ id });
				if (status) {
					return data; //把数据return出去 promise对象
				}

			},
			//头像上传成功
			handleUpload({ status, total, data }) {
				console.log(data);
				this.form.main_photo = data;
			},
			//保存数据
			async handleSave() {
				let { status, data } = await Article.edit({ ...this.form });
				console.log(this.form);
				if (status) {
					data = this.form;
					let self=this;
					setTimeout(function() {
						self.$message.success("文章修改成功");
					}, 1000);

					//跳转页面
					this.$router.replace('/article/list');
				}

			},
			//告诉父组件删除成功 ,上传图片的地址为空
			removeSuccess(value) {
				this.form.main_photo = value;
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
