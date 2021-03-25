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
					<view class="list">
						<p class="group">学生就业信息</p>
						<view v-if="jobList.length > 0">
							<view class="stud" v-for="(item, index) in jobList" :key="index">
								<span class="name">{{item.name}}</span>
								<span class="watch" @click="showjobModal(item)">查看</span>
							</view>
						</view>
						<view class="noResult" v-else>
							<p>当前暂无学生就业数据，请选择班级或者等待审批结果。</p>
						</view>
					</view>
					<view class="list">
						<p class="group">学生生源地信息</p>
						<view v-if="infoList.length > 0">
							<view class="stud" v-for="(item, index) in infoList" :key="index">
								<span class="name">{{item.user_name}}</span>
								<span class="watch" @click="showModal(item)">查看</span>
							</view>
						</view>
						<view class="noResult" v-else>
							<p>当前暂无学生就业数据，请选择班级或者等待审批结果。</p>
						</view>
					</view>
				</view>
			</view>
			<u-modal
			v-model="infoshow"
			confirm-text="确认"
			title="信息"
			@confirm="confirmInfo">
				<view class="slot-content">
					<rich-text :nodes="content" class="confirm"></rich-text>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				actionSheetList: [],
				jobList:[],
				infoList: [],
				form: {
					classes: ''
				},
				db: '',
				infoshow: false,
				content: ``,
				show: false
			}
		},
		components:{
			aniNavBar
		},
		computed: {
			where(){  
			  return `classes=="${this.form.classes}"`  
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
			showModal (item) {
				this.infoshow = true
				this.content = `
				<p class="info">姓名: ${item.user_name}</p>
				<p class="info">班级: ${item.classes}</p>
				<p class="info">生源地: ${item.source_city}</p>
				`
			},
			showjobModal (item) {
				this.infoshow = true
				this.content = `
				<p class="info">姓名: ${item.name}</p>
				<p class="info">电话: ${item.tel}</p>
				<p class="info">籍贯: ${item.native}</p>
				<p class="info">毕业时间: ${item.outtime}</p>
				<p class="info">公司名称: ${item.busName}</p>
				<p class="info">公司编码: ${item.buscode}</p>
				<p class="info">起薪线: ${item.money}</p>
				<p class="info">工作名称: ${item.jobName}</p>
				<p class="info">公司规模: ${item.jobScale}</p>
				<p class="info">工作行业: ${item.jobtype}</p>
				`
			},
			confirmInfo () {
				this.infoshow =  false
			},
			seletorType(index) {
				this.form.classes = this.actionSheetList[index].text
				this.db.collection('job')
				.where(this.where)
				.get()
				.then(res => {
					console.log(res)
					this.jobList = res.result.data
				})
				.catch(err => {
					console.log(err)
				})
				this.db.collection('source')
				.where(this.where)
				.get()
				.then(res => {
					console.log(res)
					this.infoList = res.result.data
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
		.list {
			margin-top: 20px;
			.group {
				font-size: 16px;
				line-height: 20px;
			}
			.stud {
				margin-top: 10px;
				font-size: 14px;
				line-height: 30px;
				border-radius: 15px;
				box-shadow: 2px 2px 2px 1px #51c4d3;
				display: flex;
				justify-content: space-between;
				.name {
					margin-left: 20px;
				}
				.watch {
					margin-right: 20px;
					color: #BBDDFB;
				}
			}
		}
	}
}
</style>
