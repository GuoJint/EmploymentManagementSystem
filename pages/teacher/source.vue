<template>
	<view >
		<view >
			<uni-nav-bar statusBar="true" color="white" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
			<view class="content">
				<view class="title">
					<p>生源地审批</p>
				</view>
				<view class="contentCard">
					<view class="job" v-if="infoList.length>0">
						<view class="job-Class" v-for="(item,index) in infoList" :key="index">
							<view class="students" @click="showModal(item)">
								<view class="job-content">
									<span>{{item.user_name}}</span>
								</view>
								<span class="noApproval">{{item.city_status}}</span>
							</view>
						</view>
					</view>
					<view class="noData" v-else>
						<p>暂无任何信息需要审批~</p>
					</view>
				</view>
			</view>
		</view>
		<u-modal
		v-model="show"
		:show-cancel-button="true"
		confirm-text="通过"
		cancel-text="驳回"
		title="确认信息"
		cancel-color="#E14700"
		:async-close="true"
		@confirm="confirmInfo"
		@cancel="cancelInfo">
			<view class="slot-content">
				<rich-text :nodes="content" class="confirm"></rich-text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				infoList: [],
				status: '未审批',
				show: false,
				content: `lalal`,
				db: '',
				nowId: ''
			}
		},
		components:{
			aniNavBar
		},
		mounted() {
			this.getInfoList()
		},
		methods: {
			confirmInfo (e) {
				this.db.collection('source')
				.where({_id: `${this.nowId}`})
				.update({
					city_status: "已审批"
				})
				.then(res => {
					this.getInfoList()
					this.show = false
				})
			},
			cancelInfo () {
				this.db.collection('source')
				.where({_id: `${this.nowId}`})
				.update({
					city_status: "已驳回"
				})
				.then(res => {
					this.getInfoList()
					this.show = false
				})
			},
			getInfoList () {
				this.db = uniCloud.database()
				this.db.collection('source')
				.where('city_status == "未审批"')
				.get()
				.then(res => {
					this.infoList = res.result.data
				})
			},
			showModal (item) {
				this.show = true
				this.nowId = item._id
				this.content = `
				<p class="info">姓名: ${item.user_name}</p>
				<p class="info">生源地: ${item.source_city}</p>
				`
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
.u-drawer-content {
	.confirm {
		.info {
			line-height: 25px;
			font-size: 16px;
			color: red;
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
		.job {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.job-Class {
				margin-top: 20px;
				width: 80%;
				.nowClass {
					font-size: 16px;
				}
				.students {
					height: 70px;
					border-radius: 15px;
					box-shadow: 5px 5px 5px 1px #51c4d3;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.noApproval {
						border: 1px solid red;
						border-radius: 20px;
						padding: 5px;
						font-size: 18px;
						color: #E5B30B;
						transform: rotate(-45deg);
					}
					.job-content {
						display: flex;
						flex-direction: column;
					}
					span {
						margin: 0 10px;
						font-size: 16px;
					}
				}
			}
		}
		.noData {
			line-height: 60px;
			text-align: center;
		}
	}
}
</style>
