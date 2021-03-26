<template>
	<view >
		<view>
			<ani-nav-bar class="navBar" title="消息" statusBar="true" shadow="false" color="white"></ani-nav-bar>
			<view class="content">
				<view class="userInfo">
					<view class="infoFlex">
						<view class="userImg">
							<image src="../../static/img/loginIMG1.jpg" mode=""></image>
						</view>
						<view class="detailInfo">
							<p>郭晋廷</p>
							<p>2017101224</p>
							<p>山西农业大学信息学院</p>
						</view>
					</view>
				</view>
				<view class="contentCard">
					<view v-if="this.user.userType == '学生'">
						<view class="stud-message" v-for="(item, index) in studList" :key="index">
							<view class="left">
								<p>{{`您的${item.type}审批${item.status}，${item.status == '已驳回' ? '请重新提交！':''}`}}</p>
								<uni-dateformat class="time" :date="item.time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
							</view>
							<span class="delete" @click="deleteList(index)">删除</span>
						</view>
					</view>
					<view v-else>
						<view class="teacher-message" v-for="(item, index) in teacherList" :key="index">
							<view class="left">
								<p>{{`您有新的${item.type}审批${item.status}，请即时查看！`}}</p>
								<uni-dateformat class="time" :date="item.time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
							</view>
							<span class="delete" @click="deleteList(index)">删除</span>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import TeacherHome from '../teacher/index.vue'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				studList: [],
				teacherList: []
			}
		},
		components:{
			aniNavBar,
			TeacherHome
		},
		computed: {
			...mapState([
				'user',
			]),
		},
		onLoad() {
			if (this.user.userType == '学生') {
				this.initStudent()
			} else if (this.user.userType == '教师'){
				this.initTeacher()
			}
		},
		methods: {
			deleteList (index) {
				if (this.user.userType == '学生') {
					this.studList.splice(index, 1)
				} else if (this.user.userType == '教师'){
					this.teacherList.splice(index, 1)
				}
			},
			initStudent () {
				const db = uniCloud.database()
				db.collection('job')
				.where({'user_number': `${this.user.userNumber}`})
				.get()
				.then(res => {
					res.result.data.forEach(item => {
						if (item.status != '未审批') {
							this.studList.push({
								type: '就业去向',
								status: item.status,
								time: item.time
							})
						}
					})
					console.log(res)
				})
				db.collection('source')
				.where({'user_number': `${this.user.userNumber}`})
				.get()
				.then(res => {
					res.result.data.forEach(item => {
						if (item.city_status != '未审批') {
							this.studList.push({
								type: '生源地',
								status: item.city_status,
								time: item.time
							})
						}
					})
				})
			},
			initTeacher () {
				const db = uniCloud.database()
				db.collection('job')
				.get()
				.then(res => {
					res.result.data.forEach(item => {
						if (item.status == '未审批') {
							this.teacherList.push({
								type: '就业去向',
								status: item.status
							})
						}
					})
				})
				db.collection('source')
				.get()
				.then(res => {
					res.result.data.forEach(item => {
						if (item.status == '未审批') {
							this.teacherList.push({
								type: '生源地',
								status: item.city_status
							})
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.navBar{
	.uni-navbar--border{
		border: none;
	}
	.uni-navbar--shadow{
		box-shadow: none;
	}
	.uni-navbar__header{
		background-image: linear-gradient(to right, #1677b3,#c7d2d4);
	} 
}
.content{
	.userInfo{
		height: 300rpx;
		background-image: linear-gradient(to right, #1677b3,#b0d5df);
		display: flex;
		align-items: center;
		.infoFlex{
			display: flex;
			.userImg{
				display: flex;
				align-items: center;
				image{
					border-radius: 45px;
					height: 60px;
					width: 60px;
				}
			}
		}
		
		view{
			margin-left: 30rpx;
			p{
				color: white;
				font-size: 16px;
				margin-top: 10rpx;
			}
		}
		
	}
	.contentCard{
		display: inline-block;
		background-color: white;
		border-radius: 15px ;
		height: 135vw;
		width: 100%;
		transform: translateY(-15px);
		.stud-message {
			margin-top: 15px;
			height: 60px;
			font-size: 16px;
			border-bottom: 1px solid #F7F7FA;
			border-top: 1px solid #F7F7FA;
			display: flex;
			justify-content: space-between;
			.delete {
				line-height: 60px;
				margin-right: 10px;
				color: #A4CEFF;
			}
			.time {
				color: #c4cbcf;
			}
			p {
				line-height: 30px;
			}
		}
	}
}
</style>
