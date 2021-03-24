<template>
	<view >
		<view >
			<uni-nav-bar statusBar="true" color="white" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
			<view class="content">
				<view class="title">
					<p>学生信息管理</p>
				</view>
				<view class="contentCard">
					<view class="classes">
						<u-form ref="uForm" :model="form" label-width=70px>
							<u-form-item label="选择班级" prop="classes">
								<u-input v-model="form.classes" type="select" @click="show = true" placeholder="请选择查看班级"/>
								<u-action-sheet :list="actionSheetList" v-model="show" @click="seletorType"></u-action-sheet>
							</u-form-item>
						</u-form>
					</view>
					<view class="studList">
						<p>学生就业信息</p>
						<view v-if="studList.length > 0">
							<view class="stud" v-for="(item, index) in studList" :key="index">
								<span>{{item.name}}</span>
								<span>查看</span>
							</view>
						</view>
						<view class="noResult" v-else>
							<p>当前暂无学生就业数据，请选择班级或者等待审批结果。</p>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				actionSheetList: [],
				studList:[],
				form: {
					classes: ''
				},
				db: '',
				show: false
			}
		},
		components:{
			aniNavBar
		},
		computed: {
			where(){  
			  return `class=="${this.form.classes}"`  
			}  
		},
		mounted() {
			this.initData()
		},
		methods: {
			initData () {
				this.db = uniCloud.database()
				this.db.collection('classes')
				.get()
				.then(res => {
					console.log(res)
					res.result.data.forEach(item => {
						this.actionSheetList.push({
							text: item.classes
						})
					})
				})
			},
			seletorType(index) {
				this.form.classes = this.actionSheetList[index].text
				this.db.collection('job')
				.where(this.where)
				.get()
				.then(res => {
					console.log(res)
					this.studList = res.result.data
				})
				.catch(err => {
					console.log(err)
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
		height: 135vw;
		width: 600rpx;
		margin: 0 auto;
		position: relative;
		top: -20px;
	}
}
</style>
