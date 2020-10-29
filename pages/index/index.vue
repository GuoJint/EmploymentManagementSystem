<template>
	<view >
		<view class="content">
			<ani-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件" statusBar="true"></ani-nav-bar>
		</view>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				title: 'Hello',
			}
		},
		components:{
			aniNavBar
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>
