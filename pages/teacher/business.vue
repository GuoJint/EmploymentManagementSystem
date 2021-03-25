<template>
	<view >
		<view >
			<uni-nav-bar statusBar="true" color="white" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
			<view class="content">
				<view class="title">
					<p>招聘企业信息发布</p>
				</view>
				<view class="contentCard">
					<u-form ref="uForm" :model="form" label-width=70px>
						<u-form-item label="企业名称" prop="busName">
							<u-input v-model="form.busName" placeholder="请输入企业名称"/>
						</u-form-item>
						<u-form-item label="企业简介" prop="profiles">
							<u-input v-model="form.profiles" placeholder="请输入企业简介"/>
						</u-form-item>
						<u-form-item label="企业福利" prop="welfare">
							<u-input v-model="form.welfare" placeholder="请输入企业福利"/>
						</u-form-item>
						<u-form-item label="招聘职位" prop="jobs">
							<u-input v-model="form.jobs" type="select" @click="show = true" placeholder="请选择招聘职位"/>
							<u-action-sheet :list="list" v-model="show" @click="seletorType"></u-action-sheet>
						</u-form-item>
						<u-form-item label="咨询邮箱" prop="busEmail">
							<u-input v-model="form.busEmail" placeholder="请输入邮箱"/>
						</u-form-item>
					</u-form>
				</view>
				<view class="submit">
					<u-button type="primary" @click="submit()">提交</u-button>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				list: [
					{
						text: '前端开发',
					},
					{
						text: 'java开发工程师',
					},
					{
						text: 'Android开发工程师',
					},
					{
						text: '测试工程师',
					},
					{
						text: '产品经理',
					},
				],
				form: {
					busName: '',
					profiles: '',
					welfare: '',
					jobs: '',
					busEmail: '',
				},
				show: false
			}
		},
		components:{
			aniNavBar
		},
		onLoad() {
			
		},
		methods: {
			submit () {
				const db = uniCloud.database()
				db.collection('company')
				.add({
					...this.form
				})
				.then(() => {
					this.$refs.uToast.show({
						title: '提交成功',
						type: 'success',
						position: 'top',
						duration: 2000,
					})
					setTimeout(() => {
						this.prev()
					},300)
				})
			},
			seletorType (index) {
				this.form.jobs = this.list[index].text;
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
		width: 600rpx;
		margin: 0 auto;
		position: relative;
		top: -20px;
	}
	.submit {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
}
</style>
