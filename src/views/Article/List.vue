<template>

	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>文章列表</span>
		</div>
		<el-table ref="singleTable" :data="tableData" style="width: 100%">
			<el-table-column type="index" property='id' width="50" label="#">
			</el-table-column>
			<el-table-column property="cate_1st_name" label="一级分类" width="120">
			</el-table-column>
			<el-table-column property="cate_2nd_name" label="二级分类" width="120">
			</el-table-column>
			<el-table-column label="主题" property="fullname">
				<template scope="scope">
					<!-- scope.row当前这一行数据里图片 -->
					<img :src="scope.row.main_photo" alt="图片加载失败" width="60px" height="60px">
				</template>
			</el-table-column>
			<el-table-column property="title" label="标题">
			</el-table-column>
			<el-table-column property="create_time" label="发布时间">
			</el-table-column>
			<el-table-column property="update_time" label="更新时间">
			</el-table-column>
			<el-table-column property="" label="操作">
				<template slot-scope="scope">
					<el-link :href="`#/article/edit/${scope.row.id}`" class="el-link-button">
						<el-button type="primary" size="mini " icon="el-icon-edit">
							编辑
						</el-button>
					</el-link>
					<el-button type="danger" size="mini" icon="el-icon-delete" @click="open(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Article } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [], //用来存放从ajax中获取的数据
				//isLoading: false, //判断是否加载数据
				// loading:'',
			}
		},
		created() {
			//获取列表的数据,调用
			this.loadingList();
			//服务方式调用loading 缺陷：只能用到vue的实例中，只能用在new里面，组件内部适用，外部不能使用
			// this.loading= this.$loading();
		},
		methods: {
			async loadingList() {
				//加载数据
				//this.isLoading = true;
				//加载成功
				//把要传参的数传进来,解构
				//把loading交给拦截器
				let { status, total, data } =
				await Article.list({ pagesize: 100, pageindex: 1 });
				if (status) {
					//this.isLoading = false;
					//关闭loading
					// this.loading.close();
					//赋值
					this.tableData = data;
				}
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			open(id, index) {
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {

					let { status, data } = await Article.remove({ id });
					if (status) {
						this.tableData.splice(index, 1);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	}
</script>
<style scoped>
	.type {
		color: white;
		text-decoration: none;
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
		width: 100%;
	}

	.el-button--mini {
		padding: 6px 8px;
	}

	.el-link-button {
		display: inlne-block;
		margin-right: 5px;
	}
</style>
