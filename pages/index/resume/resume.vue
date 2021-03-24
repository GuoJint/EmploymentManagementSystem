<template>
	<view>
		<view v-if="currentPage">
			<uni-nav-bar statusBar="true" color="white" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
			<view class="content">
				<view class="title">
					<p>毕业生简历</p>
				</view>
				<view class="contentCard">
					<view class="resumeList">
						<view class="left">
							<span class="iconfont ">
								&#xe67b;
							</span>
							<span class="name">
								前端开发
							</span>
						</view>
						<span class="right">删除</span>
					</view>
					<view class="file">
						<u-button type="primary" @click="create()">创建简历</u-button>
					</view>
				</view>
			</view>
		</view>
		<CreateResume v-else @close="create()"></CreateResume>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import CreateResume from './create'
	export default {
		data() {
			return {
				currentPage: true
			}
		},
		components: {
			aniNavBar,
			CreateResume
		},
		onLoad() {

		},
		methods: {
			create:function () {
				this.currentPage = !this.currentPage
			},
			prev: function() {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			},
		},
	}
</script>

<style lang="scss">
	.uni-navbar {
		.uni-navbar--border {
			border: none;
		}

		.uni-navbar--shadow {
			box-shadow: none;
		}

		.uni-navbar__content {
			.uni-navbar__header {
				background-image: linear-gradient(to right, #1677b3, #c7d2d4);
			}
		}
	}

	.content {
		.title {
			height: 300rpx;
			background-image: linear-gradient(to right, #1677b3, #b0d5df);
			display: flex;
			align-items: center;

			p {
				transform: translateY(-20px);
				color: white;
				margin: 10rpx;
				font-size: 24px;
				font-weight: 600px;
			}
		}

		.contentCard {
			background-color: white;
			border-radius: 15px;
			height: 100vh;
			width: 100%;
			margin: 0 auto;
			position: relative;
			top: -20px;
			.resumeList {
				width: 80%;
				margin: 0 auto;
				transform: translateY(10px);
				height: 60px;
				border-radius: 15px;
				box-shadow: 5px 5px 5px 1px #51c4d3;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left {
					margin-left: 10px;
					.iconfont {
						color: #2B79FB;
						font-size: 18px;
					}
					.name {
						font-size: 16px;
						margin: 0 10px;
					}
				}
				.right {
					margin-right: 10px;
					font-size: 16px;
					color: #A4CEFF;
				}
			}
			.file {
				position: fixed;
				left: 10%;
				bottom: 5px;
				width: 80%;
			}
		}
	}
</style>
