<template>
	<div class="house-detail">
		<div class="header">
			<div class="title">
				{{ title || GzHouseInfo.title }}
			</div>
			<div class="price">
				￥{{ price || GzHouseInfo.price }}
			</div> 
		</div>
		<ul class="tag-list">
			<li v-for="item in tagList || GzHouseInfo['tag_list']">{{ item }}</li>
		</ul>
		<ul class="detail-list">
			<li @click="emitShowDialog('costShow')">
				<i class="icon-cost"></i>
				<span class="text">费用</span>
			</li>
			<li @click="emitShowDialog('configShow')">
				<i class="icon-config"></i>
				<span class="text">配置</span>
			</li>
			<li @click="emitShowDialog('houseTypeShow')">
				<i class="icon-house-type"></i>
				<span class="text">户型</span>
			</li>
			<li @click="emitShowDialog('doorShow')">
				<i class="icon-door"></i>
				<span class="text">室友</span>
			</li>
		</ul>
		<Loading v-if="!GzHouseInfo"></Loading>
	</div>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'

	export default {
		components: {
			Scroll,
			Loading
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			price: {
				type: Number,
				default: 0
			},
			tagList: {
				type: Array,
				default: null
			}
		},
		data () {
			return {
				costShow: false,
			}
		},
		methods: {
			emitShowDialog (attr) {
				this.$emit('showDialog', attr)
			}	
		},
		computed: {
			GzHouseInfo () {
				return this.$store.getters.GzHouseInfo
			}
		}
	}
</script>

<style scoped>
	.house-detail {	  
		padding: 15px;
	}
	.house-detail-content {
      height: 100%;
      overflow: hidden;
  }
	.header {
		display: inline-flex;
		flex-flow: row nowrap;
		width: 100%;
		justify-content: space-between;
	}
	.header .title {
		font-size: 22px;
		line-height: 38px;
		box-sizing: border-box;
	}
	.header .price {
		font-size: 33px;
		color: #4adcd1;
		box-sizing: border-box;
	}
	.tag-list {
		display: inline-flex;
		width: 100%;
		margin-top: 8px;
		padding-bottom: 20px;
		color: #4adcd1;
		border-bottom: 1px solid #eeeeee;
	}
	.tag-list li {
		margin: 0px 8px 0px 0px;
		padding: 2px 5px;
		border-radius: 5px;
		border: 1px solid #4adcd1;
	}
	.detail-list {
		display: inline-flex;
		flex-flow: row nowrap;
		width: 100%;
		margin-top: 20px;
		justify-content: space-between;
		
	}
	.detail-list li {
		margin: 0 22px;
	}
	.detail-list li i[class*=icon] {
		display: block;
		width: 36px;
		height: 38px;
	}
	.detail-list li i.icon-cost {
		background: url('../../assets/images/icon/cost.png') no-repeat;
		background-size: 36px 38px; 
	}
	.detail-list li i.icon-config {
		background: url('../../assets/images/icon/config.png') no-repeat;
		background-size: 36px 38px; 
	}
	.detail-list li i.icon-house-type {
		background: url('../../assets/images/icon/house_type.png') no-repeat;
		background-size: 36px 38px; 
	}
	.detail-list li i.icon-door {
		background: url('../../assets/images/icon/door.png') no-repeat;
		background-size: 32px 38px; 
	}
	.detail-list li span.text{
		display: block;
		width: 100%;
		text-align: center;
		font-size: 15px;
		margin-top: 10px;
	}
</style>