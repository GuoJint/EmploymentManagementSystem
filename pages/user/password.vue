<template>
	<view >
		<view >
			<uni-nav-bar statusBar="true" color="white" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
			<view class="content">
				<view class="title">
					<p>修改密码</p>
				</view>
				<view class="contentCard">
					<u-form ref="uForm" :rules="rules" :model="tform" label-width=70px>
						<u-form-item label="旧密码" prop="oldPsw">
							<u-input v-model="tform.oldPsw" placeholder="请输入旧密码"/>
						</u-form-item>
						<u-form-item label="新密码" prop="newPsw">
							<u-input v-model="tform.newPsw" type="password" placeholder="请输入新密码"/>
						</u-form-item>
						<u-form-item label="确认密码" prop="confirmPsw">
							<u-input v-model="tform.confirmPsw" type="password" placeholder="请确认密码"/>
						</u-form-item>
					</u-form>
					<u-button class="button" type="primary" @click="submit">提交</u-button>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import { mapState } from 'vuex'
	export default {
		name: 'CreateResume',
		data() {
			return {
				tform: {
					oldPsw: '',
					newPsw: '',
					confirmPsw: '',
				},
				rules:{
					oldPsw: { 
						required: true, 
						message: '请输入旧密码', 
						trigger: ['blur'],
					},
					newPsw: {
						required: true, 
						message: '请输入新密码', 
						trigger: ['blur'],
					},
					confirmPsw: {
						required: true, 
						message: '请确认密码一致', 
						trigger: ['blur'],
						validator: (rule, value) => {
							if (value !== this.tform.newPsw) return false
							return true
						}
					},
				},
			}
		},
		components:{
			aniNavBar
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		computed: {
			...mapState([
				'user',
			])
		},
		methods: {
			submit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						const db = uniCloud.database()
						db.collection('user')
						.where({user_number: `${this.user.userNumber}`})
						.update({
							userpsw: this.tform.newPsw
						})
						.then(res => {
							this.$refs.uToast.show({
								title: '修改成功',
								type: 'success',
								duration: 1000,
								back: true,
							})
							setTimeout(() => {
								this.$emit('closeModal', psw)
							}, 300)
						})
					}
				})
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
		height: 110vh;
		width: 100%;
		margin: 0 auto;
		position: relative;
		top: -20px;
		.button {
			width: 100%;
		}
	}
}
</style>
