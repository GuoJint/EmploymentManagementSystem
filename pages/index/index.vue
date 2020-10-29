<template>
	<view >
		<view class="content">
			<ani-nav-bar title="首页" statusBar="true"></ani-nav-bar>
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
