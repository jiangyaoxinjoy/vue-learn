<template >
	<div>
		<div class="notify">{{msg}}</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
			    msg: 'i am handsome'
			}
		}
	}
</script>
<style scoped>
	.notify{
		display: inline-block;
		width: auto;
		height: 40px;
		background: rgba(0,0,0,.25);
		-webkit-border-radius: 15px;
		-moz-border-radius: 15px;
		border-radius: 15px;
		line-height: 40px;
		text-align: center;
		color: #fff;
		padding: 0 20px;
	}
</style>
