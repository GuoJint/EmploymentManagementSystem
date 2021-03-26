<template>
	<view >
		<u-modal
		v-model="help"
		confirm-text="关闭"
		title="问题反馈"
		@confirm="confirmHelp">
			<view class="slot-content">
				<rich-text :nodes="helpContent" class="confirm"></rich-text>
			</view>
		</u-modal>
		<u-modal
		v-model="appinfo"
		confirm-text="关闭"
		title="关于"
		@confirm="confirmappInfo">
			<view class="slot-content">
				<rich-text :nodes="appInfoContent" class="confirm"></rich-text>
			</view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'SetInfo',
		data() {
			return {
				help: false,
				appinfo: false,
				helpContent: `
				<p>...</p>
				<p>如有使用问题请咨询:13720904717</p>
				<p>...</p>
				`,
				appInfoContent: `
				<p>项目开发：</p>
				<p>山西农业大学信息学院</p>
				<p>网络工程1702</p>
				<p>郭晋廷</p>
				<p>本项目未经本人同意禁止用于商业用途或者任何活动</p>
				`
			}
		},
		computed: {
			...mapState([
				'user',
			])
		},
		methods: {
			confirmHelp () {
				this.help = false
			},
			confirmappInfo () {
				this.appinfo = false
			},
			showModal (val) {
				switch (val) {
					case 'help':
					this.help = true
					break
					case 'info':
					this.appinfo = true
					break
				}
				console.log(this.help)
			},
		}
	}
</script>
