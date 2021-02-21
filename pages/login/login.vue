<template>
	<view class="content">
		<view class="title">
			毕业生就业管理
		</view>
		<view class="loginForm">
			<input class="account" type="text" value="" placeholder="账号" placeholder-style="color:#DADADA"/>
			<input class="psw" type="text" value="" placeholder="密码" placeholder-style="color:#DADADA" password="true"/>
		</view>
		<view class="items">
			<button class="login" type="default" @click="login()">登录</button>
			<view class="subItems">
				<label class="radio">
					<radio value="" /><text>记住我</text>
				</label>
				<view class="small" @click="toRegister()">
					注册账号
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			toRegister:function(){
				uni.navigateTo({
					url:'./register',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			login:function(){
				uni.switchTab({
					url:'../index/index',
				})
			}
		}
	}
</script>

<style lang="scss">
	body{
		background-image: url(../../static/img/loginIMG6.jpg);
		.content{
			margin-top: 400rpx;
			.title,.loginForm,.items{
				margin: 0 50rpx;
			}
			.title{
				color: white;
				margin-bottom: 30rpx;
				font-size: 24px;
				line-height: 30px;
			}
			.loginForm{
				.psw,.account{
					// color: #2E8CB4;
					width: 650rpx;
					border-bottom: solid #DADADA;
					margin-top: 80rpx;
				}
			}
			.items{
				margin-top: 100rpx;
				.login{
					
				}
				.subItems{
					color: #DADADA;
					margin-top: 80rpx;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
	
</style>
