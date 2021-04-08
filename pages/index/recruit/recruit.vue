<template>
	<view >
		<view >
			<uni-nav-bar statusBar="true" color="white" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
			<view class="content">
				<view class="title">
					<p>校园招聘会</p>
				</view>
				<view class="contentCard">
					<view class="shaixuan">
						<u-form ref="uForm" :model="form" label-width=70px>
							<!-- <u-form-item label="薪资" prop="money">
								<u-input v-model="form.money" type="select" placeholder="请选择薪资" @click="moneyShow = true"/>
								<u-action-sheet :list="moneyList" v-model="moneyShow" @click="moneySelect"></u-action-sheet>
							</u-form-item> -->
							<u-form-item label="单位规模" prop="jobScale">
								<u-input v-model="form.jobScale" type="select" placeholder="请选择单位规模" @click="scaleShow = true"/>
								<u-action-sheet :list="scaleList" v-model="scaleShow" @click="scaleSelect" @close="scaleClose"></u-action-sheet>
							</u-form-item>
							<u-form-item label="所属行业" prop="jobtype">
								<u-input v-model="form.jobtype" type="select" placeholder="请选择所属行业" @click="jobShow = true"/>
								<u-action-sheet :list="jobList" v-model="jobShow" @click="jobSelect" @close="jobtypeClose"></u-action-sheet>
							</u-form-item>
							<u-form-item label="招聘职位" prop="jobs">
								<u-input v-model="form.jobs" type="select" @click="jobsshow = true" placeholder="请选择招聘职位"/>
								<u-action-sheet :list="list" v-model="jobsshow" @click="seletorType" @close="jobsClose"></u-action-sheet>
							</u-form-item>
						</u-form>
					</view>
					<view v-if="companyList.length > 0">
						<view class="resumeList" v-for="(item, index) in companyList" :key="index">
							<view class="left">
								<span class="iconfont ">
									&#xe67b;
								</span>
								<span class="name">
									{{item.busName}}
								</span>
							</view>
							<span class="right" @click="showModal(item)">查看</span>
						</view>
					</view>
					<view class="noData" v-else>
						<p>暂无招聘信息，请耐心等待哦~</p>
					</view>
				</view>
			</view>
			<u-modal
			v-model="show"
			:show-cancel-button="true"
			confirm-text="投递"
			cancel-text="取消"
			title="企业信息"
			:async-close="true"
			@confirm="confirmInfo"
			@cancel="cancelInfo">
				<view class="slot-content">
					<rich-text :nodes="content" class="confirm"></rich-text>
				</view>
			</u-modal>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				form:{
					money: '',
					jobScale: '',
					jobtype: '',
					jobs: '',
				},
				companyList: [],
				show: false,
				scaleShow: false,
				jobShow: false,
				moneyShow: false,
				jobsshow: false,
				content: '',
				moneyList:[
					{
						text: '0-5000',
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
				jobList :[
					{
						text: '新能源行业',
					},
					{
						text: '互联网行业',
					},
					{
						text: '医药行业',
					},
					{
						text: '银行/金融行业',
					},
					{
						text: '教育行业',
					},
				],
				scaleList :[
					{
						text: '已上市',
					},
					{
						text: '未上市',
					}
				],
			}
		},
		computed: {
			where(){
				let obj = {}
				if (this.form.jobScale != '') {
					obj['jobScale'] = `${this.form.jobScale}` 
					// str += `jobScale=="${this.form.jobScale}"` 
				}
				if (this.form.jobtype != '') {
					obj['jobtype'] = `${this.form.jobtype}` 
					// str +=`jobtype=="${this.form.jobtype}"` 
				}
				if (this.form.jobs != '') {
					obj['jobs'] = `${this.form.jobs}` 
					// str +=`jobs=="${this.form.jobs}"` 
				}
			  return  obj
			}  
		},
		components:{
			aniNavBar
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData () {
				const db = uniCloud.database()
				db.collection('company')
				.get()
				.then((res) => {
					this.companyList = res.result.data
				})
			},
			getBusiness () {
				this.companyList = []
				const db = uniCloud.database()
				db.collection('company')
				.where(this.where)
				.get()
				.then((res) => {
					this.companyList = res.result.data
				})
			},
			scaleClose (val) {
				this.form.jobScale = ''
				this.getBusiness()
			},
			jobtypeClose (val) {
				this.form.jobtype = ''
				this.getBusiness()
			},
			jobsClose (val) {
				this.form.jobs = ''
				this.getBusiness()
			},
			scaleSelect (index) {
				this.form.jobScale = this.scaleList[index].text;
				this.getBusiness()
			},
			jobSelect (index) {
				this.form.jobtype = this.jobList[index].text;
				this.getBusiness()
			},
			seletorType (index) {
				this.form.jobs = this.list[index].text;
				this.getBusiness()
			},
			showModal (item) {
				this.show = true
				this.content = `
				<p class="info">公司名称: ${item.busName}</p>
				<p class="info">公司简介: ${item.profiles}</p>
				<p class="info">公司福利: ${item.welfare}</p>
				<p class="info">招聘岗位: ${item.jobs}</p>
				<p class="info">咨询邮件: ${item.busEmail}</p>
				`
			},
			confirmInfo (e) {
				this.$refs.uToast.show({
					title: '投递成功',
					type: 'success',
					duration: 1000,
					back: true,
				})
				this.show = false
			},
			cancelInfo (e) {
				this.show = false
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
	.shaixuan {
		display: flex;
		justify-content: space-around;
	}
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
		.resumeList {
			width: 80%;
			margin: 0 auto;
			transform: translateY(10px);
			height: 60px;
			border-radius: 15px;
			box-shadow: 5px 5px 5px 1px #51c4d3;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				margin-left: 10px;
				.iconfont {
					color: #2B79FB;
					font-size: 18px;
				}
				.name {
					font-size: 16px;
					margin: 0 10px;
				}
			}
			.right {
				margin-right: 10px;
				font-size: 16px;
				color: #A4CEFF;
			}
		}
		.noData {
			line-height: 60px;
			text-align: center;
		}
	}
}
</style>
