<template>
	<view >
		<view >
			<uni-nav-bar statusBar="true" color="white" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
			<view class="content">
				<view class="title">
					<p>就业去向登记</p>
				</view>
				<view class="contentCard">
					<u-steps class="process" :list="numList" :current="currentNu"></u-steps>
					<view v-show="currentNu === 0" class="formList baseInfo">
						<u-form ref="uForm" :rules="rules" :model="form" label-width=70px>
							<u-form-item label="姓名" prop="name">
								<u-input v-model="form.name" placeholder="请输入姓名"/>
							</u-form-item>
							<u-form-item label="电话" prop="tel">
								<u-input v-model="form.tel" placeholder="请输入电话"/>
							</u-form-item>
							<u-form-item label="籍贯" prop="native">
								<u-input v-model="form.native" placeholder="请输入籍贯"/>
							</u-form-item>
							<u-form-item label="毕业时间" prop="outtime">
								<u-input v-model="form.outtime" :disabled="true" placeholder="请输入毕业时间" @click="show = true"/>
								<u-calendar v-model="show" mode="range" max-date="2050-01-01" @change="outTime">请选择毕业时间</u-calendar>
							</u-form-item>
						</u-form>
					</view>
					<view v-show="currentNu === 1" class="formList jobSelect">
						<u-radio-group v-model="jobtype" size="25px" :wrap="true">
							<u-radio 
								class="radio"
								v-for="(item, index) in list" :key="index" 
								:name="item.name"
								:disabled="item.disabled">
									{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
					<view v-show="currentNu === 2" class="formList jobArea">
						<u-form ref="tForm" :model="tform" label-width=85px>
							<u-form-item label="单位名称" prop="busName">
								<u-input v-model="tform.busName" placeholder="请输入单位名称"/>
							</u-form-item>
							<u-form-item label="单位机构代码" prop="buscode">
								<u-input v-model="tform.buscode" placeholder="请输入单位组织机构代码"/>
							</u-form-item>
							<u-form-item label="起薪线" prop="money">
								<u-input v-model="tform.money" placeholder="请输入起薪线"/>
							</u-form-item>
							<u-form-item label="工作职位" prop="jobName">
								<u-input v-model="tform.jobName" placeholder="请输入工作职位"/>
							</u-form-item>
							<u-form-item label="单位规模" prop="jobScale">
								<u-input v-model="tform.jobScale" type="select" placeholder="请选择单位规模" @click="scaleShow = true"/>
								<u-action-sheet :list="scaleList" v-model="scaleShow" @click="scaleSelect"></u-action-sheet>
							</u-form-item>
							<u-form-item label="所属行业" prop="jobtype">
								<u-input v-model="tform.jobtype" type="select" placeholder="请选择所属行业" @click="jobShow = true"/>
								<u-action-sheet :list="jobList" v-model="jobShow" @click="jobSelect"></u-action-sheet>
							</u-form-item>
						</u-form>
					</view>
					<view class="footer">
						<view class="step">
							<u-button v-show="currentNu != 0" class="prev" type="primary" @click="prevStep()">上一步</u-button>
							<u-button v-show="currentNu != 2" class="next" type="primary" @click="nextStep()">下一步</u-button>
						</view>
						<view v-if="currentNu === 2" class="submit">
							<u-button type="primary" @click="submit()">提交</u-button>
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
				numList: [{
					name: '基本信息填写'
				}, {
					name: '就业类别选择'
				}, {
					name: '就业去向填报'
				}, ],
				form: {
					name: '',
					tel: '',
					native: '',
					outtime: '',
				},
				tform: {
					busName: '',
					buscode: '',
					money: '',
					jobName: '',
					jobScale: '',
					jobtype: '',
				},
				rules:{
					tel: { 
						required: true, 
						message: '请输入电话', 
						trigger: ['blur'],
					},
					name: {
						required: true, 
						message: '请输入姓名', 
						trigger: ['blur'],
					},
					native: {
						required: true, 
						message: '请输入籍贯', 
						trigger: ['blur'],
					},
					outtime: {
						required: true, 
						message: '请选择毕业时间', 
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
				},
				list: [
					{
						name: '协议',
						disabled: false
					},
					{
						name: '灵活',
						disabled: false
					},
					{
						name: '合同',
						disabled: false
					},
					{
						name: '未就业',
						disabled: false
					},
					{
						name: '项目',
						disabled: false
					},
					{
						name: '报名参加专升本考试',
						disabled: false
					}
				],
				scaleList :[
					{
						text: '已上市',
					},
					{
						text: '未上市',
					}
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
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				jobtype: '',
				currentNu: 0,
				show: false,
				scaleShow: false,
				jobShow: false,
			}
		},
		components:{
			aniNavBar
		},
		onLoad() {
			
		},
		methods: {
			outTime (e) {
				console.log(e)
			},
			prevStep () {
				this.currentNu -= 1
			},
			nextStep () {
				this.currentNu += 1
				console.log(this.currentNu)
			},
			submit () {
				console.log('提交')
			},
			scaleSelect (index) {
				this.tform.jobScale = this.scaleList[index].text;
			},
			jobSelect (index) {
				this.tform.jobtype = this.jobList[index].text;
			},
			register: function() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						uniCloud.callFunction({
							name: 'user',
							data: {
								"username": this.form.userName,
								"password": this.form.psw,
								"user_school": this.schoolData,
								"user_type": this.form.types,
								"user_number": this.form.userNumber
							}
						}).then(res => {
							this.$refs.uToast.show({
								title: '注册成功',
								type: 'success',
								duration: 1000,
								back: true,
							})
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
		height: 100vh;
		width: 100%;
		margin: 0 auto;
		position: relative;
		top: -20px;
		.process {
			padding: 20px 0;
			border-bottom: 1px solid #b0d5df;
		}
		.baseInfo {
			margin-top: 20px;
		}
		.jobSelect {
			.radio {
				display: flex;
				justify-content: space-between;
				width: 80%;
				margin: 10px;
				font-size: 18px;
			}
		}
		.footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			.prev,
			.next {
				height: 40px;
			}
			.prev {
				border-bottom: 1px solid #b0d5df;
			}
		}
	}
}
</style>
