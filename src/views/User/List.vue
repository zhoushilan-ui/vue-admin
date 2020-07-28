<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>用户列表</span>
		</div>
		<el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" size style="width: 100%">
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column property="username" label="用户名" width="120">
			</el-table-column>
			<el-table-column property="nickname" label="昵称" width="120">
			</el-table-column>
			<el-table-column property="sex" label="性别">
			</el-table-column>
			<el-table-column property="tel" label="手机">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-link :href="`#/user/edit/${scope.row.id}`" class="el-link-button">
						<el-button type="primary" size="mini" icon="el-icon-edit">
							编辑
						</el-button>
					</el-link>
					<el-button type="danger" size="mini" k icon="el-icon-delete" @click="handleRemove(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { User } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			//获取数据
			this.loadingList();
		},

		methods: {
			async loadingList() {
				let { status, data } = await User.list({ data });
				if (status) {
					this.tableData = data;
				}
			},

			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			//删除信息
			handleRemove(id, index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					let { status, data } = await User.remove(id);
					if (status) {
						this.tableData.splice(index, 1);
						this.$message.success("删除成功");
					}
				}).catch(() => {
					this.$message.info("取消删除");
				});
			}
		}
	}
</script>

<style scoped>
	.el-row {
		display: flex;
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

	.el-link-button {
		display: inlne-block;
		margin-right: 5px;
	}

	.el-button--mini {
		padding: 6px 8px;
	}
</style>
