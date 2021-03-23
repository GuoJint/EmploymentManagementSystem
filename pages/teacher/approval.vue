<template>
	<view >
		<view >
			<uni-nav-bar statusBar="true" color="white" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
			<view class="content">
				<view class="title">
					<p>就业登记审批</p>
				</view>
				<view class="contentCard">
					<view class="job">
						<view class="job-Class">
							<p class="nowClass">网络工程1701:</p>
							<view class="students" @click="showModal">
								<span>郭晋廷</span>
								<span class="noApproval">{{status}}</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal v-model="show" :title-style="{color: 'red'}">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				status: '未审批',
				show: false,
				content: `lalal`
			}
		},
		components:{
			aniNavBar
		},
		onLoad() {
			
		},
		methods: {
			showModal () {
				this.show = true
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
.uni-navbar{
	.uni-navbar--border{
		border: none;
	}
	.uni-navbar--shadow{
		box-shadow: none;
	}
	.uni-navbar__content{
		.uni-navbar__header {
			background-image: linear-gradient(to right, #1677b3,#c7d2d4);
		}
	} 
}
.content{
	.title{
		height: 300rpx;
		background-image: linear-gradient(to right, #1677b3,#b0d5df);
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
	.contentCard{
		background-color: white;
		border-radius: 15px ;
		height: 100vh;
		width: 100%;
		margin: 0 auto;
		position: relative;
		top: -20px;
		.job {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.job-Class {
				width: 80%;
				.nowClass {
					font-size: 16px;
					margin: 20px 0 10px 5px;
				}
				.students {
					height: 60px;
					border-radius: 15px;
					box-shadow: 5px 5px 5px 1px #51c4d3;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.noApproval {
						border: 1px solid red;
						border-radius: 20px;
						padding: 5px;
						font-size: 18px;
						color: #E5B30B;
						transform: rotate(-45deg);
					}
					span {
						margin: 0 10px;
						font-size: 16px;
					}
				}
			}
		}
	}
}
</style>
