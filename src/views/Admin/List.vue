<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>管理员列表</span>
		</div>
		<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column property="username" label="用户名" width="120">
			</el-table-column>
			<el-table-column property="fullname" label="昵称" width="100">
			</el-table-column>
			<el-table-column property="sex" label="性别">
			</el-table-column>
			<el-table-column property="tel" label="手机">
			</el-table-column>
			<el-table-column property="email" label="邮箱">
			</el-table-column>
			<el-table-column label="头像">
				<template scope="scope">
					<img :src="scope.row.avatar" alt="图片加载失败" width="50px" height="50px">
				</template>
			</el-table-column>
			<el-table-column property="" label="操作">
				<template slot-scope="scope">
					<!-- <router-link class="type" v-bind:to='{name:"AdminUpdataimg",params:{id:scope.row.id}}'>
						<el-button type="primary" size="mini " icon="el-icon-edit">
							编辑
						</el-button>
					</router-link> -->

					<el-link :href="`#/admin/edit/${scope.row.id}`" class="el-link-button">
						<el-button type="primary" size="mini " icon="el-icon-edit">
							编辑
						</el-button>
					</el-link>
					<el-button type="danger" size="mini " icon="el-icon-delete" @click="handleRemove(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Admin } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],
			};
		},
		created() {
			//获取数据
			this.loadingList();
		},
		methods: {
			async loadingList() {
				let { status, data, total } = await Admin.list({ data });
				if (status) {
					this.tableData = data;
					this.tableData.forEach(function(item) {
						item.avatar = "http://localhost:3001/" + item.avatar.slice(item.avatar.indexOf('/images'));
					});
				}
			},
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			//删除数据
			handleRemove(id, index) {
				console.log(id, index);
				this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let { status, data } = await Admin.remove({ id: id });

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
			}
		}
	}
</script>

<style scoped>
	.el-row {
		display: flex;
	}

	.el-main {
		margin: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
	}

	.el-link-button {
		display:inlne-block;
		margin-right: 5px;
	}
	.el-button--mini{
		padding:6px 8px;
	}
</style>
