<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件  default-expanded-keys="[0]"是默认展开的节点等于0的节点-->
			<el-tree ref="tree" node-key="id" lazy :load='loadNode' :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button @click.stop="openEditModal(node,data)" type="text" icon="el-icon-edit" :disabled="node.level==1" size="mini">
							编辑
						</el-button>
						<el-button @click.stop='openInsertModal(node,data)' type="text" icon="el-icon-plus" size="mini">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" size="mini" @click="handleRemove(node,data)">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow=false">取 消</el-button>
				<el-button type="primary" @click='handleInsertNode'>添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="分类名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow=false">取 消</el-button>
				<el-button type="primary" @click='handleUploadNode'>保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { Category } from '@/api/index.js';
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					parent_id: '',
				},
				editForm: {
					id: '',
					name: '',
					parent_id: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
			};
		},
		methods: {
			async loadNode(node, resolve) {
				//node节点对象
				console.log(node)
				//reslove用来把数据返回给树的
				if (node.level == 0) {
					return resolve([{ id: 0, name: '全部分类' }]); //用resolve把数据或者节点发送出去,每次点击，通过reslove拿到数据
				}
				//父级节点
				let { id } = node.data;
				let { status, data } = await Category.subcate({ id });
				console.log(data);
				if (status) {
					return resolve(data);
				}
			},
			//更新节点数
			async handleUploadNode() {
				//表单验证
				//ajax
				let { status, msg, data } = await Category.edit({ ...this.editForm });
				if (status) {
					this.$message.success(msg);
					this.editModalShow = false;
					this.node.data = this.editForm;
				}
			},
			//编辑节点
			openEditModal(node, data) {
				this.editModalShow = true;
				this.editForm = { ...data };
				this.node = data;
			},
			//插入节点
			openInsertModal(node, data) {
				//data当时你点击哪一行的数据
				//node代表是节点对象
				this.node = node;
				this.insertModalShow = true;
				//把数据转存；
				this.insertForm.parent_id = data.id;
			},
			//插入节点
			async handleInsertNode() {
				//表单校验
				//ajax
				//添加分类
				console.log("Sss");
				let { status, msg, data } = await Category.insertnode({ ...this.insertForm });
				if (status) {
					this.$message.success(msg);
					//关闭模态框
					this.insertModalShow = false;
					//插入新的树状节点
					this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);
				}
			},
			//删除
			async handleRemove(node, data) {
				let { status } = await Category.remove({ id: data.id });
				if (status) {
					this.$refs.tree.remove({ ...data });
					this.$message.success("删除数据成功");
				}

			}

		},
	}
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
