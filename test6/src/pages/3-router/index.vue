<!-- 一个组件就是一个对象 -->
<template >
	<div>
		<!-- <router-view></router-view> -->
		<button @click="notify">notify</button>
		<test></test>
	</div>
</template>
<!-- template自动编译到组件的template里 -->

<script>
    import Vue from 'vue';
	export default {
		data() {
			return {}
		},
		components: {},
		methods: {
		    notify() {
		        //1.在Vue的原型上添加方法
		        this.$notigy('i am so happy',{delay: 2000});

		        //2.直接在Vue的构造函数上添加方法
		        Vue.say();
			}
		},
		created() {},
		computed: {},
		watch: {}
	}
</script>
<style scoped>

</style>
