<template>
	<view >
		<view >
			<ani-nav-bar class="navBar" title="首页" statusBar="true" shadow="false" color="white"></ani-nav-bar>
			<view class="content">
				<view class="userInfo">
					<view class="infoFlex">
						<view class="userImg">
							<image src="../../static/img/loginIMG1.jpg" mode=""></image>
						</view>
						<view class="detailInfo">
							<p>{{this.user.userName}}</p>
							<p>{{this.user.userNumber}}</p>
							<p>{{this.user.userSchool}}</p>
						</view>
					</view>
				</view>
				<view class="contentCard">
					<view class="cardA" @click="clickCard2('approval')">
						<p>
							就业登记审批
						</p>
						<span class="iconfont ">
							&#xe704;
						</span>
					</view>
					<view class="cardB" @click="clickCard2('manage')">
						<p>
							学生信息管理
						</p>
						<span class="iconfont ">
							&#xe66e;
						</span>
					</view>
					<view class="cardD" @click="clickCard2('business')">
						<p>
							招聘企业发布
						</p>
						<span class="iconfont ">
							&#xe612;
						</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import { mapState } from 'vuex'
	export default {
		name: 'TeacherHome',
		data() {
			return {
				title: 'Hello',
			}
		},
		components:{
			aniNavBar
		},
		computed: {
			...mapState([
				'user',
			])
		},
		mounted() {
			this.test()
		},
		methods: {
			clickCard2: function (val) {
				uni.navigateTo({
					url: `../teacher/${val}`,
				})
			},
			test () {
				console.log(this.user)
			}
		}
	}
</script>

<style lang="scss">
.navBar{
	.uni-navbar--border{
		border: none;
	}
	.uni-navbar--shadow{
		box-shadow: none;
	}
	.uni-navbar__header{
		background-image: linear-gradient(to right, #1677b3,#c7d2d4);
	} 
}
.content{
	.userInfo{
		height: 300rpx;
		background-image: linear-gradient(to right, #1677b3,#b0d5df);
		display: flex;
		align-items: center;
		.infoFlex{
			display: flex;
			.userImg{
				display: flex;
				align-items: center;
				image{
					border-radius: 45px;
					height: 60px;
					width: 60px;
				}
			}
		}
		
		view{
			margin-left: 30rpx;
			p{
				color: white;
				font-size: 16px;
				margin-top: 10rpx;
			}
		}
		
	}
	.contentCard{
		background-color: white;
		border-radius: 15px ;
		height: 135vw;
		width: 600rpx;
		margin: 0 auto;
		position: relative;
		top: -20px;
		view{
			border-radius: 15px;
			box-shadow: 5px 5px 5px 1px #51c4d3;
			height: 20%;
			margin-top: 20%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			p{
				// margin-left: 10px;
				font-size: 16px;
			}
			span{
				
				border-radius: 10px;
				font-size: 25px;
				text-align: center;
				color: white;
				line-height: 50px;
				width: 50px;
				height: 50px;
			}
		}
		.cardA{
			margin-top: 0;
			span{
				background-color: #5cb3cc;
			}
		}
		.cardB{
			span{
				background-color: #FE9D1F;
			}
		}
		.cardC{
			span{
				background-color: #1DCCC9;
			}
		}
		.cardD{
			span{
				background-color: #8F46EB;
			}
		}
	}
}
</style>
