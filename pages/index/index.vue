<template>
	<view >
		<view v-if="this.user.userType === '学生'">
			<ani-nav-bar class="navBar" title="首页" statusBar="true" shadow="false" color="white"></ani-nav-bar>
			<view class="content">
				<view class="userInfo">
					<view class="infoFlex">
						<view class="userImg" @click="setting =true">
							<image src="../../static/img/loginIMG1.jpg" mode=""></image>
						</view>
						<view class="detailInfo">
							<p>郭晋廷</p>
							<p>2017101224</p>
							<p>山西农业大学信息学院</p>
						</view>
					</view>
				</view>
				<view class="contentCard">
					<view class="cardA" @click="clickCard('sourceCollection')">
						<p>
							生源地采集
						</p>
						<span class="iconfont ">
							&#xe704;
						</span>
					</view>
					<view class="cardB" @click="clickCard('jobRegister')">
						<p>
							就业去向登记
						</p>
						<span class="iconfont ">
							&#xe66e;
						</span>
					</view>
					<view class="cardC" @click="clickCard('resume')">
						<p>
							毕业生简历
						</p>
						<span class="iconfont ">
							&#xe67b;
						</span>
					</view>
					<view class="cardD" @click="clickCard('recruit')">
						<p>
							校园招聘会
						</p>
						<span class="iconfont ">
							&#xe612;
						</span>
					</view>
				</view>
			</view>
		</view>
		<TeacherHome v-if="this.user.userType === '教师'"></TeacherHome>
		<u-popup v-model="setting">
			<view class="content">
				<view class="userInfo">
					<view class="infoFlex">
						<view class="detailInfo">
							<p>郭晋廷</p>
							<p>2017101224</p>
							<p>山西农业大学信息学院</p>
						</view>
					</view>
				</view>
				<view class="contentSet">
					<view class="setting first" @click="outLog">
						<span>退出登录</span>
						<span>></span>
					</view>
					<view class="setting" @click="showQuestion">
						<span>问题反馈</span>
						<span>></span>
					</view>
					<view class="setting" @click="showChangePsw">
						<span>修改密码</span>
						<span>></span>
					</view>
					<view class="setting" @click="showInfo">
						<span>关于</span>
						<span>></span>
					</view>
				</view>
			</view>
		</u-popup>
		<set-info ref="setInfo"></set-info>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import TeacherHome from '../teacher/index.vue'
	import SetInfo from '../user/user.vue'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				setting: false,
			}
		},
		components:{
			aniNavBar,
			TeacherHome,
			SetInfo
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
			clickCard: function (val) {
				uni.navigateTo({
					url:`./${val}/${val}`,
				})
			},
			outLog() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			showChangePsw () {
				uni.navigateTo({
					url: '../user/password',
				});
			},
			showQuestion () {
				console.log('231')
				this.$refs.setInfo.showModal('help')
			},
			showInfo () {
				this.$refs.setInfo.showModal('info')
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
	.contentSet {
		background-color: white;
		border-radius: 15px ;
		transform: translateY(-15px);
		width: 500rpx;
		display: inline-block;
		.setting {
			height: 50px;
			font-size: 16px;
			border-bottom: 1px solid #F7F7FA;
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				margin: 0 10px;
			}
		}
		.first {
			margin-top: 20px;
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
			margin-top: 10%;
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
