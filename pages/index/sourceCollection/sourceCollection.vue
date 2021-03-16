<template>
	<view >
		<view >
			<uni-nav-bar statusBar="true" color="white" left-icon="back" left-text="返回" @clickLeft="prev()"></uni-nav-bar>
			<view class="tacontent">
				<view class="title">
					<p>生源地采集</p>
				</view>
				<view class="contentCard">
					<u-select v-model="show" :list="list" mode="mutil-column-auto" @confirm="cityConfirm"></u-select>
					<view class="content">
						<span class="prv">省</span>
						<view class="city" @click="showList">
							<span>{{ province }}</span>
						</view>
					</view>
					<view class="content">
						<span class="prv">市</span>
						<view class="city" @click="showList">
							<span>{{ city }}</span>
						</view>
					</view>
					<view class="content">
						<span class="prv">县(区)</span>
						<view class="city" @click="showList">
							<span>{{ area }}</span>
						</view>
					</view>
					<u-button class="button" type="primary" @click="submit">确认</u-button>
				</view>
				<view class="tip">
					<p>温馨提示：</p>
					<p>1.生源所在地信息为毕业生派遣的重要信息，务必由本人亲自填写确认</p>
					<p>2.生源所在地是指：高考被我校录取时的常住户籍所在地</p>
					<p>3.特殊情况(生源地变更等)请务必于本学期离校前联系就业知道中心</p>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import aniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import { CITY } from '../../../static/constant.js'
	export default {
		data() {
			return {
				list: [],
				show: false,
				province: '',
				city: '',
				area: ''
			}
		},
		components:{
			aniNavBar
		},
		mounted() {
			this.initList()
		},
		methods: {
			initList () {
				CITY["jw-city"].data.forEach(item => {
					let obj = {
						label: item.name,
						value: item.name,
						children: []
					}
					if (item.city) {
						let cityArry = []
						item.city.forEach(item => {
							let cityObj = {
								label: item.name,
								value: item.name,
								children: []
							}
							if (item.area) {
								let areaArry = []
								item.area.forEach(item => {
									areaArry.push({
										label: item,
										value: item
									})
								})
								cityObj.children = areaArry
							}
							cityArry.push(cityObj)
						})
						obj.children = cityArry
					}
					this.list.push(obj)
				})
			},
			cityConfirm (val) {
				val.forEach((item,index) => {
					switch(index) {
						case 0:
						this.province = item.value
						break
						case 1:
						this.city = item.value
						break
						case 2:
						this.area = item.value
						break
					}
				})
			},
			showList () {
				this.show = true
			},
			submit () {
				this.$refs.uToast.show({
					title: '提交成功！',
					type: 'success',
					position: 'top',
					duration: 2000,
				})
				setTimeout(()=> {
					uni.navigateBack({
						delta: 1,
						animationType: 'pop-out',
						animationDuration: 200
					})
				},500)
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
.tacontent{
	background-color: #F0F5F8;
	height: 100vh;
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
		background-color: #FFFFFF;
		border-radius: 15px ;
		height: 400px;
		width: 600rpx;
		margin: 0 auto;
		position: relative;
		top: -20px;
		.content {
			.prv {
				display: inline-block;
				font-size: 16px;
				margin: 30px 0 0 10px;
				width: 100%;
			}
			.city {
				span {
					display: inline-block;
					width: 90%;
					margin-left: 10px;
					font-size: 20px;
					line-height: 35px;
					color: #7fa1fe;
					border-bottom: 1px solid #F4F3F4;
					&::after {
						float: right;
						color: #AEB9C0;
						content: '>';
					}
				}
			}
		}
		.button {
			margin-top: 30px;
			height: 60px;
			width: 80%;
			border-radius: 45px;
			background-color: #299FFB;
		}
	}
	.tip {
		margin: 0 auto;
		width: 600rpx;
		color: #AFB0B1;
	}
}
</style>
