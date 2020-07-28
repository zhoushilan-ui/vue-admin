<template>
	<div class="counter">
		<button calss="decrease" type="button" @click="handleDecrease">-</button>
		<span class="number">{{value}}</span>
		<button calss="increase" type="button" @click='handleIncrease'>+</button>
	</div>
</template>

<script>
	export default {
		//props外部属性
		props: ['value', 'min', 'max', 'step', 'step-strictly', 'controls-position'],
		methods: {
			handleDecrease() {
				if (this.value <= this.min) {
					return;
				}
				var num = parseInt(Math.random() * 5);
				this.$emit('down', num);
			},
			handleIncrease() {
				if (this.value >= this.max) {
					return;
				}
				var num = parseInt(Math.random() * 5);
				this.$emit('up', num);
			},
		},
	}
</script>

<style>
	.counter {
		display: block;
		align-self: center;
		width: 200px;
	}

	.counter .decrease,
	.counter .increase {
		padding: 10px 20px !important;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 18px;
	}

	.counter .decrease {
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}

	.counter .increase {
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}

	.counter .number {
		box-sizing: border-box;
		padding: 6px;
		min-width: 150px !important;
		border-top: 1px solid #999999;
		border-bottom: 1px solid #999999;
	}
</style>
