<template>
	<view >
		<view >
			<uni-nav-bar statusBar="true" color="white" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
			<view class="content">
				<view class="title">
					<p>简历编辑</p>
				</view>
				<view class="contentCard">
					<u-steps class="process" :list="numList" :current="currentNu"></u-steps>
					<view v-show="currentNu === 0" class="formList baseInfo">
						<u-form ref="uForm" :rules="rules" :model="form" label-width=70px>
							<u-form-item label="简历名称" prop="resumeName">
								<u-input v-model="form.resumeName" placeholder="请输入姓名"/>
							</u-form-item>
							<u-form-item label="姓名" prop="name">
								<u-input v-model="form.name" placeholder="请输入姓名"/>
							</u-form-item>
							<u-form-item label="电话" prop="tel">
								<u-input v-model="form.tel" placeholder="请输入电话"/>
							</u-form-item>
							<u-form-item label="邮箱" prop="email">
								<u-input v-model="form.email" placeholder="请输入邮箱"/>
							</u-form-item>
							<u-form-item label="籍贯" prop="native">
								<u-input v-model="form.native" placeholder="请输入籍贯"/>
							</u-form-item>
							<u-form-item label="毕业时间" prop="outtime">
								<u-input v-model="form.outtime" :disabled="true" placeholder="请输入毕业时间" @click="show = true"/>
								<u-calendar v-model="show" max-date="2050-01-01" mode="range" @change="outTime">请选择毕业时间</u-calendar>
							</u-form-item>
						</u-form>
					</view>
					<view v-show="currentNu === 2" class="formList jobSelect">
						<h3>基本信息</h3>
						<view class="previewBaseInfo">
							<p>姓名：{{form.name}}</p>
							<view class="BI-second">
								<p>电话：{{form.tel}}</p>
								<p>邮箱：{{form.email}}</p>
								<p>籍贯：{{form.native}}</p>
							</view>
							<p>毕业时间：{{form.outtime}}</p>
						</view>
						<h3>专业技能</h3>
						<p>{{tform.skill}}</p>
						<h3>工作经历</h3>
						<view class="prejob">
							<p>公司名称：{{tform.busName}}</p>
							<p>职位名称：{{tform.jobName}}</p>
							<p>在职时间：{{form.jobtime}}</p>
						</view>
						<h3>项目经历</h3>
						<view class="prePoject">
							<p>项目名称：{{tform.projectName}}</p>
							<p>项目过程：{{tform.project}}</p>
						</view>
						<h3>教育经历</h3>
						<view class="preEDU">
							<span>专业：{{tform.major}}</span>
							<span>学历：{{tform.education}}</span>
							<span>学校性质：{{tform.schoolnature}}</span>
						</view>
					</view>
					<view v-show="currentNu === 1" class="formList resumeInfo">
						<u-form ref="tForm" :model="tform" label-width=85px>
							<u-form-item label="专业技能" prop="skill">
								<u-input v-model="tform.skill" placeholder="请输入专业技能"/>
							</u-form-item>
							<p class="working">工作经历</p>
							<u-form-item label="公司名称" prop="busName">
								<u-input v-model="tform.busName" placeholder="请输入公司名称"/>
							</u-form-item>
							<u-form-item label="职位名称" prop="jobName">
								<u-input v-model="tform.jobName" placeholder="请输入职位名称"/>
							</u-form-item>
							<u-form-item label="在职时间" prop="jobtime">
								<u-input v-model="form.jobtime" :disabled="true" placeholder="请输入在职时间" @click="showjobtime = true"/>
								<u-calendar v-model="showjobtime" max-date="2050-01-01" mode="range" @change="atTime">请选择在职时间</u-calendar>
							</u-form-item>
							<p class="project">项目经历</p>
							<u-form-item label="项目名称" prop="projectName">
								<u-input v-model="tform.projectName" placeholder="请输入项目名称"/>
							</u-form-item>
							<u-form-item label="项目过程" prop="project">
								<u-input v-model="tform.project" placeholder="请输入项目过程"/>
							</u-form-item>
							<p class="edu">教育经历</p>
							<u-form-item label="专业" prop="major">
								<u-input v-model="tform.major" placeholder="请输入专业"/>
							</u-form-item>
							<u-form-item label="学历" prop="education">
								<u-input v-model="tform.education" type="select" placeholder="请选择学历" @click="educationShow = true"/>
								<u-action-sheet :list="educationList" v-model="educationShow" @click="scaleSelect"></u-action-sheet>
							</u-form-item>
							<u-form-item label="学校性质" prop="schoolnature">
								<u-input v-model="tform.schoolnature" type="select" placeholder="请选择学校性质" @click="natureShow = true"/>
								<u-action-sheet :list="natureList" v-model="natureShow" @click="jobSelect"></u-action-sheet>
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
		<u-toast ref="toast"></u-toast>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		name: 'CreateResume',
		data() {
			return {
				numList: [{
					name: '基本信息'
				}, {
					name: '简历信息'
				}, {
					name: '简历预览'
				}, ],
				form: {
					name: '',
					tel: '',
					email: '',
					native: '',
					outtime: '',
					resumeName: ''
				},
				tform: {
					skill: '',
					busName: '',
					major: '',
					jobName: '',
					jobtime: '',
					projectName: '',
					project: '',
					education: '',
					schoolnature: '',
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
				},
				educationList :[
					{
						text: '本科',
					},
					{
						text: '硕士',
					},
					{
						text: '博士',
					},
					{
						text: '专科',
					}
				],
				natureList :[
					{
						text: '全日制',
					},
					{
						text: '非全日制',
					},
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				jobtype: '',
				currentNu: 0,
				show: false,
				showjobtime: false,
				natureShow: false,
				educationShow: false,
				jobShow: false,
			}
		},
		components:{
			aniNavBar
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			outTime (e) {
				this.form.outtime = `${e.startDate}-${e.endDate}`
			},
			atTime (e) {
				this.form.jobtime = `${e.startDate}-${e.endDate}`
			},
			prevStep () {
				this.currentNu -= 1
			},
			nextStep () {
				this.currentNu += 1
			},
			submit () {
				const db = uniCloud.database()
				db.collection('resume')
				.add({
					...this.form,
					...this.tform
				})
				.then(res => {
					this.$refs.toast.show({
						title: '提交成功！',
						type: 'success',
						position: 'top',
						duration: 2000,
					})
					uni.navigateBack({
						delta: 1,
						animationType: 'pop-out',
						animationDuration: 200
					});
				})
				.catch(err => {
					this.$refs.toast.show({
						title: '提交失败！',
						type: 'success',
						position: 'top',
						duration: 2000,
					})
				})
			},
			scaleSelect (index) {
				this.tform.education = this.educationList[index].text;
			},
			jobSelect (index) {
				this.tform.schoolnature = this.natureList[index].text;
			},
			prev: function() {
				this.$emit("close")
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
		.process {
			padding: 20px 0;
			border-bottom: 1px solid #b0d5df;
		}
		.baseInfo {
			margin-top: 20px;
		}
		.resumeInfo {
			.working,
			.project,
			.edu{
				margin-top: 20px;
				border-top: 1px solid #727272;
			}
		}
		.jobSelect {
			margin-left: 10px;
			h3 {
				line-height: 30px;
			}
			p {
				font-size: 14px;
				line-height: 20px;
			}
		}
		.footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			z-index: 999;
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
