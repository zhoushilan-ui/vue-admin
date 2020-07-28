<template>
	<transfer :list="list" :forms='forms' :froms='froms' :count="count" :counts="counts" :form="form" @skip='handleSkip'
	 @join='handleJoin'></transfer>
</template>
<script>
	import Transfer from '@/components/Listchildren';
	export default {
		components: {
			Transfer
		},
		data() {
			return {
				list: '',
				form: '',
				count: '',
				counts: '',
				forms: {
					checkboxAll:false,
					checkbox: false,
					label: ''
				},
				froms: {
					checkbox: false
				}
			};
		},
		computed: {
			Returntab1() {
				const list = [];
				for (let i = 0; i < 15; i++) {
					list.push({
						key: i,
						label: `备选项${i}`,
						disabled: i % 4 === 0
					});
					this.count = i + 1;
				}

				this.list = list;
				return this.list, this.count;
			},
			Returntab2() {
				const form = [];
				for (let i = 0; i < 3; i++) {
					form.push({
						key: i,
						label: `备选项${i}`,
					});
					this.counts = i + 1;
				}
				this.form = form;
				return this.form, this.counts;
			}
		},
		methods: {
			_jump() {
				let temp = [];
				temp = this.list;
				this.list = this.form;
				this.form = temp;

				let sum = 0;
				sum = this.count;
				this.count = this.counts;
				this.counts = sum;
			},
			handleSkip() {
				this._jump();
				this.forms.checkbox = false;
			},
			handleJoin() {
				this._jump();
				this.froms.checkbox=false;
			}
		}
	}
</script>

<style scoped>

</style>
