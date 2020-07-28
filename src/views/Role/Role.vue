<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>管理员角色</span>
			<el-tag style="float: right; padding: 3px 0" type="text" @click='openInsertModal'>添加角色</el-tag>
		</div>
		<el-table ref="singleTable" :data="tableData" style="width: 100%" size>
			<el-table-column type="index" property='id' label="#" width="100px">
			</el-table-column>
			<el-table-column property="name" label="分类" v-model="form.name">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" @click="openAdminModal(scope.row,scope.$index)">
						编辑
					</el-button>
					<el-button type="danger" icon="el-icon-delete" @click="removeRole(scope.row.id,scope.$index)">删除</el-button>

				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Role } from '@/api/index.js';
	export default {
		data() {
			return {
				tableData: [],
				form: {
					id: '',
					name: ''
				},
				dialogTableVisible: false,
				dialogFormVisible: false,
			}
		},
		created() {
			//获取数据
			this.loadingList();
		},
		methods: {
			async loadingList() {
				let { status, data, total } = await Role.list({ data });
				if (status) {
					this.tableData = data;
				}
			},
			removeRole(id, index) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let { status } = await Role.remove(id);
					console.log(status);
					if (status) {
						//更新dom
						// console.log(id);
						this.tableData.splice(index, 1);
						//提示用户
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
			},
			openInsertModal() {
				this.$prompt('请输入添加的角色名称', '添加角色', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputErrorMessage: '名称格式不正确'
				}).then(async ({ value }) => { //用来捕获点击确定时干什么的事，value是当时输入的值
					let { status, data } = await Role.insert({ name: value });

					if (status) {
						//更新dom,后台添加成功，但是页面没有更新
						this.$message.success('添加成功');
						this.tableData.push({ name: value, ...data });
					}
				}).catch(() => { //用来捕获取消时干什么事
					this.$message.info('取消输入');
				});
			},
			openAdminModal(data, index) {
				this.$prompt('请修改角色的名称', "修改角色", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputValue: data.name,
					inputErrorMessage: '名称的格式不正确'
				}).then(async ({ value }) => {
					console.log(data.id);
					console.log(value);
					let { status } = await Role.edit(data.id, value);
					console.log(123);
					if (status) {
						data.name= value;
						this.$message.info('修改成功');
					}

				}).catch(() => {
					this.$message.error("修改失败");
				});
			}
		}
	}
</script>

<style scoped>
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

	.el-row {
		display: flex;
	}
</style>
