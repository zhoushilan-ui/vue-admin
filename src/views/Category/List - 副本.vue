<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>分类列表</span>
		</div>
		<el-tree :data="data" :props="defaultProps" default-expand-all :expand-on-click-node="false">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{ node.label }}</span>
				<span>
					<el-button type="text" size="mini" class="el-icon-edit">
						编辑
					</el-button>
					<el-button type="text" size="mini" class="el-icon-plus" @click="() => append(data)">
						添加
					</el-button>
					<el-button type="text" size="mini" class="el-icon-delete" @click="() => remove(node, data)">
						删除
					</el-button>
				</span>
			</span>
		</el-tree>
	</el-card>
</template>

<script>
	let id = 1000;
	export default {
		data() {
			return {
				data: [{
					id: 1,
					name: '全部分类',
					children: [{
						id: 2,
						name: '科技',
						children: [{
							id: 6,
							name: '人工智能',
							children: [{
								id: 13,
								name: "数字科技"
							}]
						}, {
							id: 10,
							name: '黑客技术',
							children: [{
								id: 14,
								name: "物理"
							}]
						}]
					}, {
						id: 3,
						name: '娱乐',
						children: [{
							id: 7,
							name: '唱歌'
						}]
					}, {
						id: 4,
						name: '编程',
						children: [{
								id: 8,
								name: 'JAVA',
								children: [{
									id: 15,
									name: 'java设计'
								}]
							},
							{
								id: 11,
								name: '前端',
								children: [{
									id: 16,
									name: 'html'
								}]
							}, {
								id: 12,
								name: 'PHP',
								children: [{
									id: 17,
									name: 'PHP'
								}]
							}
						]
					}, {

						id: 5,
						name: '设计',
						children: [{
							id: 9,
							name: 'UI',
							children: [{
								id: 18,
								name: 'ui设计师'
							}]
						}]
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				/* data: JSON.parse(JSON.stringify(data)),
				data: JSON.parse(JSON.stringify(data)) */
			};

		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
			},
			append(data) {
				const newChild = {
					id: id++,
					label: 'testtest',
					children: []
				};
				if (!data.children) {
					this.$set(data, 'children', []);
				}
				data.children.push(newChild);
			},

			remove(node, data) {
				const parent = node.parent;
				const children = parent.data.children || parent.data;
				const index = children.findIndex(d => d.id === data.id);
				children.splice(index, 1);
			},

		}
	};
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
