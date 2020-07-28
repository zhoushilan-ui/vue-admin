<template>
	<div class="transfer">
		<div class="transfer-noe">
			<form action="">
				<div class="tab1">
					<div>
						<input type="checkbox" id="tab1" v-model="froms.checkboxAll">
						<label for="tab1">列表1</label>
					</div>
					<div><span>0</span>/<span>{{count}}</span></div>
				</div>
				<div class="tab1-body">
					<div class="body" v-for="(item,index) in list">
						<input type="checkbox" id="tab1-input" v-model="froms.checkbox" class="tab1-box-input">
						<label for="tab1-input"> {{item.label}}</label>
					</div>
				</div>
			</form>
		</div>
		<div class="select">
			<div style="width: 50%;display: inline-block;">
				<span class="el-icon-arrow-left color" @click="handleJoin"></span>
				<span class="bg" v-if="!froms.checkbox&&!froms.checkboxAll"></span>
			</div>
			<div style="width: 50%; display: inline-block;">
				<span class="el-icon-arrow-right color" @click="handleSkip"></span>
				<span class="bg1" v-if="!forms.checkbox"></span>
			</div>
		</div>
		<div class="transfer-tow">
			<form action="">
				<div class="tab2">
					<div>
						<input type="checkbox" id="tab2" v-model="forms.checkbox">
						<label for="tab2">列表2</label>
					</div>
					<div><span>0</span>/<span>{{counts}}</span></div>
				</div>
				<div class="tab2-body">
					<div class="body" v-for="(item,index) in form">
						<input type="checkbox" id="tab2-input" v-model="forms.checkbox" :value="item.key" class="tab2-box-input">
						<label for="tab2-input">{{item.label}}</label>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['list', 'form', 'count', 'counts', 'forms', 'froms'],
		data() {
			return {

			}
		},
		methods: {
			handleSkip() {
				this.$emit("skip");
			},
			handleJoin() {
				this.$emit('join')
			}
		}
	}
</script>

<style scoped>
	.transfer {
		width: 800px;
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		position: relative;
	}

	.transfer-noe {
		border-radius: 3px;
	}

	.transfer-noe:hover {
		cursor: pointer;
	}

	.tab1,
	.tab2 {
		width: 200px;
		padding: 6px 20px;
		background-color: #edeaeb;
		display: flex;
		justify-content: space-between;
	}

	.tab1-body,
	.tab2-body {
		overflow: hidden;
		height: 200px;
		overflow-y: scroll;
	}

	.body {
		padding: 6px 20px;

	}

	.select {
		position: absolute;
		top: 50%;
		left: 44%;
		width: 150px;

	}

	.color {
		width: 20px;
		padding: 6px 16px;
		background-color: #409EFF;
		border-radius: 3px;
		color: white;
		margin: 5px;
	}

	.bg {
		width: 50px;
		height: 28px;
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		top: 5px;
		left: 5px;
	}

	.bg1 {
		position: absolute;
		right: 20px;
		top: 5px;
		background-color: rgba(0, 0, 0, 0.2);
		width: 50px;
		height: 28px;
	}
</style>
