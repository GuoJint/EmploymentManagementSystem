<template>
	<view class="content">
		<view class="title">
			毕业生就业管理
		</view>
		<view class="loginForm">
			<u-form ref="uForm" :model="form" :labelStyle="{color:'#F8F8F2'}" label-width=70px>
				<u-form-item label="账号" prop="userNumber">
					<u-input v-model="form.userNumber" placeholder="请输入学号/工号"/>
				</u-form-item>
				<u-form-item label="密码" prop="password">
					<u-input type="password" v-model="form.password" placeholder="请输入密码"/>
				</u-form-item>
			</u-form>
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
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default{
		data(){
			return{
				form: {
					userNumber: '',
					password: ''
				}
			}
		},
		methods:{
			...mapMutations([
				'SET_USER_INFO',
				'SET_USER_NUMBER',
				'SET_USER_SCHOOL',
				'SET_USER_TYPE',
				'SET_USER_CLASS',
				'SET_USER_Semester'
			]),
			toRegister:function(){
				uni.navigateTo({
					url:'./register',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			login:function(){
				// uni.switchTab({
				// 	url:'../index/index',
				// })
				uniCloud.callFunction({
					name: 'getUserInfo',
					data: {
						"user_number": this.form.userNumber,
						"password": this.form.password
					}
				}).then(res => {
					if (res.result.status) {
						switch (res.result.data.user_type) {
							case '学生':
							uni.switchTab({
								url:'../index/index',
							})
							break
							case '教师':
							uni.switchTab({
								url:'../index/index',
							})
							break
							default:
							this.$refs.uToast.show({
								title: '错误人员',
								type: 'error',
								position: 'top',
								duration: 2000,
							})
							break
						}
						this.SET_USER_INFO(res.result.data.username)
						this.SET_USER_NUMBER(res.result.data.user_number)
						this.SET_USER_SCHOOL(res.result.data.user_school)
						this.SET_USER_TYPE(res.result.data.user_type)
						this.SET_USER_CLASS(res.result.data.classes)
						this.SET_USER_Semester(res.result.data.semester)
					} else {
						this.$refs.uToast.show({
							title: res.result.msg,
							type: 'error',
							position: 'top',
							duration: 2000,
						})
					}
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
