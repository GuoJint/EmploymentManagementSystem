<template>
	<view>
		<uni-nav-bar statusBar="true" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
		<view class="content">
			<view class="title">
				账号注册
			</view>
			<view class="loginForm">
				<button type="primary" @click="showSchoolPicker">{{schoolData}}</button>
				<view style="margin-top: 1rem;text-align: center;"></view>
				<!-- 学校选择组件-->
				<schoolPicker themeColor="#000" ref="schoolPicker" @onConfirm="onConfirm">
				</schoolPicker>
				<schoolPicker :onlySchool='false' themeColor="#000" ref="schoolPicker2" @onConfirm="onConfirm2">
				</schoolPicker>
				<input class="userName" type="text" value="" placeholder="请输入姓名" placeholder-style="color:#DADADA" />
				<input class="userNumber" type="text" value="" placeholder="请输入学号" placeholder-style="color:#DADADA" />
				<input class="account" type="text" value="" placeholder="请输入手机号" placeholder-style="color:#DADADA" />
				<view class="verification">
					<input class="verfCode" type="text" value="" placeholder="请输入验证码" />
					<button class="getVerfCode" type="default" :disabled="isGetCode" @click="getVerfCode">{{isGetCode?count:code}}</button>
				</view>
				<input class="psw" type="text" value="" placeholder="请输入密码" placeholder-style="color:#DADADA" password="true" />
				<input class="confirmPSW" type="text" value="" placeholder="请确认密码" placeholder-style="color:#DADADA" password="true" />
			</view>
			<view class="items">
				<button class="login" type="default" @click="register()">注册</button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import schoolPicker from '../../components/sugar-schoolPicker/schoolPicker/schoolPicker.vue';
	export default {
		components: {
			schoolPicker
		},
		data() {
			return {
				code: '获取验证码',
				isGetCode: false,
				count: 60,
				schoolData: '选择所在学校'
			}
		},
		methods: {
			/*
			获取验证码
			*/
			getVerfCode: function() {
				this.isGetCode = true
				let that = this
				let cotDown = setInterval(function() {
					console.log(that.count)
					that.count -= 1
					if (that.count == 0) {
						clearInterval(cotDown)
						that.isGetCode = false
						that.count = 60
					}
				}, 100)
			},
			prev: function() {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			},
			register:function(){
				this.$refs.uToast.show({
					title:'注册成功',
					type:'success',
					duration:1000,
					back:true,
					
				})
			},
			/**
			 * 打开学校选择器
			 */
			showSchoolPicker: function() {
				this.$refs.schoolPicker.show()
			},
			/**
			 * 确认学校选择
			 */
			onConfirm(e) {
				const school = e.label.split("-")[2];
				console.log(`源数据:${JSON.stringify(e)}`);
				if (school === '暂未收录') {
					return;
				} else {
					this.schoolData = school;
					console.log(`学校:${school}`);
				}
			},
			/**
			 * 确认 省/市/学校 选择
			 */
			onConfirm2(e) {
				this.schoolData = e.label.split("-").reverse().find(v => v != '所有');
			}

		}
	}
</script>

<style lang="scss">
	body {
		background-image: url(../../static/img/loginIMG4.jpg);
		.content {
			margin-top: 50rpx;

			.title,
			.loginForm,
			.items {
				margin: 0 50rpx;
			}

			.title {
				color: white;
				margin-bottom: 30rpx;
				font-size: 24px;
				line-height: 30px;
			}

			.loginForm {

				.psw,
				.account,
				.confirmPSW,
				.userNumber,
				.userName,
				.school {
					// color: #2E8CB4;
					width: 650rpx;
					border-bottom: 1px solid #DADADA;
					margin-top: 60rpx;
				}

				,
				.verification {

					margin-top: 60rpx;
					width: 650rpx;

					.verfCode,
					.getVerfCode {
						height: 35px;
						display: inline-block;
					}

					.verfCode {

						border-bottom: 1px solid #DADADA;
						width: 40%;

						.uni-input-placeholder {
							color: #DADADA;
						}
					}

					.getVerfCode {
						float: right;
						width: 40%;
						font-size: 15px;
					}
				}
			}

			.items {
				margin-top: 100rpx;

			}
		}
	}
</style>
