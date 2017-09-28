<template>
	<transition name="fade">
		<div class="search-page" v-if="showSearch">
			<div class="search-header">
				<a class="back" @click="closeSearch">
					<img src="../../assets/images/icon/back.png">
				</a>
				筛选
			</div>
			<scroll ref="scroll" class="search-info">
				<form>
					<multiply-chooser 
					 :title="areaTitle"
					 :chooserList="regionList"
					 @getChosen="getRegionChosen"
					></multiply-chooser>

					<h2 class="title">价格区间</h2>
					<range 
			      v-model="rangeMaxValue"
			      :minValue="rangeMinValue"
			      :min="min"
			      :max="max"
			      :step="100"
			      :bar-height="10"
			      :isRange="true"
			      @input-minValue="getMinValue"
			    >
			    </range>
			      ￥{{ rangeMinValue }} - ￥{{ rangeMaxValue }}

					<multiply-chooser 
					 :title="favorTitle"
					 :chooserList="favorList"
					 @getChosen="getFavorChosen"
					></multiply-chooser>

				</form>
			</scroll>
			<div class="searchBtn" @click="postFrom">搜索房源</div>
		</div>
	</transition>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import MultiplyChooser from 'base/multiply-chooser/multiply-chooser'
	import Range from 'base/range/range'
	import { getSearchArea } from 'api/api'

	export default {
		components: {
			Scroll,
			MultiplyChooser,
			Range
		},
		data () {
			return {
				rangeMaxValue: 2000,
	      max: 5000,
	      min: 0,
	      rangeMinValue: 0,
	      formParam: {
					maxValue: 2000,
					minValue: 0,
				},
				areaTitle: '推荐区域',
				regionList: [
				  {
						label: '不限',
						clearAll: true
					}
				],
				favorTitle: '房间偏好',
				favorList: [
				  {
						label: '不限',
						clearAll: true
					},
					{
						label: '飘窗',
						value: 'piaochuang'
					},
					{
						label: '阳台',
						value: 'yangtai'
					},
					{
						label: '独卫',
						value: 'duwei'
					},
					{
						label: '空调',
						value: 'kongtiao'
					}
				]				
			}
		},
		props: {
			showSearch: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			closeSearch () {
				this.$emit('toDoShowSearch', false)
			},
			postFrom () {
				this.$emit('searchHouses', this.formParam)
			},
			getRegionChosen (chosen) {
				this.formParam.region = chosen
			},
			getFavorChosen (chosen) {
				this.formParam.favor = chosen
			},
			getMinValue (value) {
				this.rangeMinValue = value;
			},
			_getSearchArea() {
        getSearchArea().then((res) => {
        	this.regionList = this.regionList.concat(res)
        })
      }
		},
		created () {
			this._getSearchArea()
		},
		watch: {
			rangeMinValue (val, oldVal) {
				this.formParam.minValue = val
			},
			rangeMaxValue (val, oldVal) {
				this.formParam.maxValue = val
			},
		}
	}
</script>

<style scoped>
	/* scroll */
	.fade-enter, .fade-leave-to {
		transform: translateX(100%);
	}
	.fade-enter-to, .fade-leave-to {
		transition: all 0.5s;
	}
	.search-page {
		position: fixed;
		z-index: 1;
		width: 100%;
		top: 0;
		bottom: 0;
		background: #f3f4f8;
	}
	.search-header {
		position: fixed;
		z-index: 1;
		top: 0px;
		height: 50px;
		line-height: 50px;
		width: 100%;
		background-color: white;
		font-size: 18px;
		text-align: center;
	}
	.search-header .back {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 50px;
		height: 50px;
	}
	.search-header .back img {
		width: 10px;
	}
	h2 {
		font-size: 16px;
    font-weight: bold;
	}
	h2[class=title] {
		margin-top: 30px;
	}
	.search-info {
		position: fixed;
		top: 50px;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 6%;
		padding-top: 0;
		padding-bottom: 0;
	}
	.search-info div h2 {
		font-size: 16px;
		font-weight: bold;
	}
	.searchBtn {
		display: block;
		width: 200px;
		height: 40px;
		line-height: 40px;
		border-radius: 20px;
		box-shadow: 0px 10px 50px -10px #4adcd1;
		text-align: center;
		position: absolute;
		bottom: 20px;
		left: 50%;
		margin-left: -100px;
		background: #4adbd1;
		color: white;
		font-size: 18px;
	}
</style>