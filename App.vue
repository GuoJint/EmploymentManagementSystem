<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let userID = uni.getStorage({
				key:'userID',
				fail: () => {
					uni.redirectTo({
						url:'pages/login/login'
					})
				}
			}) 
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	/*导入字体图标*/
	@font-face {
	    font-family: 'iconfont';
	    src: url('~@/static/iconfont/iconfont.ttf') format('truetype');
	}
	/*设置字体图标*/
	.iconfont {
	    font-family: "iconfont" !important;
	}
</style>
