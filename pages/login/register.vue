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
				<u-form ref="uForm" :model="form" :labelStyle="{color:'#F8F8F2'}" label-width=70px>
					<u-form-item label="注册类型" prop="types">
						<u-input v-model="form.types" type="select" @click="show = true" placeholder="请选择注册类型"/>
						<u-action-sheet :list="actionSheetList" v-model="show" @click="seletorType"></u-action-sheet>
					</u-form-item>
					<u-form-item label="选择班级" v-if="form.types == '学生'" prop="userclasses">
						<u-input v-model="form.userclasses" type="select" @click="classShow = true" placeholder="请选择查看班级"/>
						<u-action-sheet :list="classList" v-model="classShow" @click="classType"></u-action-sheet>
					</u-form-item>
					<u-form-item label="姓名" prop="userName">
						<u-input v-model="form.userName" placeholder="请输入姓名"/>
					</u-form-item>
					<view>
						<u-form-item label="学号/工号"  prop="userNumber">
							<u-input v-model="form.userNumber" placeholder="请输入学号/工号"/>
						</u-form-item>
						<!-- <u-form-item label="手机号"  prop="phone">
							<u-input v-model="form.phone" placeholder="请输入手机号"/>
						</u-form-item>
						<u-form-item class="verfCode" label="验证码"  prop="verfCode">
							<u-input v-model="form.verfCode" placeholder="请输入验证码"/>
							<button class="getVerfCode" size="mini" type="default" :disabled="isGetCode" @click="getVerfCode">{{isGetCode?count:code}}</button>
						</u-form-item> -->
					</view>
					<u-form-item label="密码" prop="psw">
						<u-input type="password" v-model="form.psw" placeholder="请输入密码"/>
					</u-form-item>
					<u-form-item label="确认密码" prop="confirmPSW">
						<u-input type="password" v-model="form.confirmPSW" placeholder="请确认密码"/>
					</u-form-item>
				</u-form>
				<!-- <input class="userName" type="text" value="" placeholder="请输入姓名" placeholder-style="color:#DADADA" />
				<input class="userNumber" type="text" value="" placeholder="请输入学号/工号" placeholder-style="color:#DADADA" />
				<input class="account" type="text" value="" placeholder="请输入手机号" placeholder-style="color:#DADADA" />
				<view class="verification">
					<input class="verfCode" type="text" value="" placeholder="请输入验证码" />
					
				</view>
				<input class="psw" type="text" value="" placeholder="请输入密码" placeholder-style="color:#DADADA" password="true" />
				<input class="confirmPSW" type="text" value="" placeholder="请确认密码" placeholder-style="color:#DADADA" password="true" /> -->
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
				schoolData: '选择所在学校',
				show:false,
				classShow: false,
				classList: [],
				actionSheetList:[
					{
						text:'学生',
					},
					{
						text:'教师',
					}
				],
				form:{
					userName:'',
					userNumber:'',
					userclasses:'',
					phone:'',
					verfCode:'',
					psw:'',
					confirmPSW:'',
					types:'',
				},
				rules:{
					userName: { 
						required: true, 
						message: '请输入姓名', 
						trigger: ['blur'],
					},
					userNumber: {
						required: true, 
						message: '请输入学号/工号', 
						trigger: ['blur'],
					},
					psw: {
						required: true, 
						message: '请输入密码', 
						trigger: ['blur'],
					},
					confirmPSW: {
						required: true, 
						message: '请确认密码一致', 
						trigger: ['blur'],
						validator: (rule, value) => {
							if (value !== this.form.psw) return false
							return true
						}
					},
					types: {
						required: true, 
						message: '请选择注册类型', 
						trigger: ['change'],
					},
					
				}
			}
		},
		mounted() {
			const db = uniCloud.database()
			db.collection('classes')
			.get()
			.then(res => {
				res.result.data.forEach(item => {
					this.classList.push({
						text: item.classes
					})
				})
			})
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
			register: function() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uniCloud.database().collection('user')
						.where({user_number: `${this.form.userNumber}`})
						.get()
						.then(res => {
							if (res.result.data.length == 0) {
								if (this.schoolData == '选择所在学校') {
									this.$refs.uToast.show({
										title: '请选择学校',
										type: 'warning',
										duration: 1000,
									})
									return
								}
								uniCloud.callFunction({
									name: 'user',
									data: {
										"username": this.form.userName,
										"password": this.form.psw,
										"user_school": this.schoolData,
										"user_type": this.form.types,
										"user_number": this.form.userNumber,
										"classes": this.form.userclasses
									}
								}).then(res => {
									this.$refs.uToast.show({
										title: '注册成功',
										type: 'success',
										duration: 1000,
										back: true,
									})
								})
								.catch(err => {
									console.log(err)
								})
							} else {
								this.$refs.uToast.show({
									title: '该学号已存在',
									type: 'warning',
									duration: 1000,
								})
							}
						})
						.catch(err => {
							console.log(err)
						})
					}
				})
				
			},
			classType (index) {
				this.form.userclasses = this.classList[index].text
				console.log(this.form.userclasses)
			},
			/*
			学生或者老师的选择值返回回调
			*/
			seletorType:function(index){
				this.form.types = this.actionSheetList[index].text
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
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	body {
		background-image: url(../../static/img/loginIMG6.jpg);
		.content {
			margin-top: 50rpx;
			.title,
			.loginForm,
			.items {
				margin: 0 50rpx;
			}
			.loginForm{
				.deepColor{
					.uni-input-input{
						color: #4CCFFF;
					}
					.verfCode{
						.getVerfCode{
							width: 250rpx;
						}
					}
				}
				.uni-input-input{
					font-size: 40rpx;
				}
			}
			.title {
				color: white;
				margin-bottom: 30rpx;
				font-size: 24px;
				line-height: 30px;
			}
			.items {
				margin-top: 100rpx;

			}
		}
	}
</style>
