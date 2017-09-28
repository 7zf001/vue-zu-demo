<template>
	<transition name="fade">
		<div class="gz-detail-wrap">
			<scroll ref="scroll" class="gz-detail">
				<div>
					<template v-if="info.image" >
						<m-slider :mediaUrl="info.media_url">
							<div v-for="item in info.image">
								<a>
	              	<img class="needsclick" @load="loadImage" :src="item">
	              </a>
	            </div>
						</m-slider>
					</template>
					<house-detail :title="info.title" :price="info.price" :tagList="info.tag_list" @showDialog="showDialog"></house-detail>
				</div>
			</scroll>

			<footer>
				<div>
					<a :href="'http://ditu.amap.com/search?query=' + info.address ">地图导航</a>
				</div>
				<i>|</i>
				<div>
					<a :href="'tel:' + info.mobile">联系管家</a>
				</div>
			</footer>
			
			<m-dialog :isShow="costShow" @on-close="closeDialog">
				<h1>费用</h1>
				<ul class="room-rent">
					<li v-for="item in info.room_list">
						<span>房间{{ item.room_sort }}</span>
						<span>￥{{ item.rent }}</span>
					</li>
				</ul>
				<p class="paragraph" v-html="info.fee_detail"></p>
			</m-dialog>
			<m-dialog :isShow="configShow" @on-close="closeDialog">
				<h1>配置</h1>
				<p class="paragraph">
					<strong>房间配置</strong>
					<br>
					<span v-html="info.config_detail"></span>
				</p>
			</m-dialog>
			<m-dialog :isShow="houseTypeShow" @on-close="closeDialog">
				<h1>户型</h1>
				<img :src="info.house_type_image" width="100%">
			</m-dialog>
			<m-dialog :isShow="doorShow" @on-close="closeDialog">
				<h1>室友</h1>
				<ul class="roomie">
					<li v-for="item in info.room_list">
						<div>
							<span>房间{{ item.room_sort }}</span>					
							<strong v-if="item.realname !== ''">{{ item.realname }}</strong>
							<strong v-else>
								<a class="canBooking">可拎包入住</a>
							</strong>
						</div>
						<ul class="tag-list">
							<li v-for="vo in item.room_parameter">{{ vo }}</li>
						</ul>
					</li>
				</ul>
			</m-dialog>

		</div>
	</transition>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import MSlider from 'base/slider/slider'
	import HouseDetail from 'components/house-detail/house-detail'

	import MDialog from 'base/dialog/dialog'

	import { getHousesDetail } from 'api/api'

	export default {
		components: {
			Scroll,
			MSlider,
			HouseDetail,
			MDialog
		},
		data () {
			return {
				info: [],
				selectOption: [],
				costShow: false,
				configShow: false,
				houseTypeShow: false,
				doorShow: false				
			}
		},
		methods: {
			closeDialog () {
				this.costShow = false
				this.configShow = false
				this.houseTypeShow = false
				this.doorShow = false
			},
			showDialog (attr) {
				this[attr] = true
			},
			loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      _getHouseDetail () {
      	let id = this.$route.params.id

      	getHousesDetail(id).then( (res) => {
      		this.info = res
      	})
      }
		},	
		mounted () {
			this._getHouseDetail()
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

	

	h1 {
		display: inline-block;
		font-size: 24px;
		border-bottom: 1px solid #eeeeee;
	}
	.room-rent {
		font-size: 15px;
		margin: 15px 0px 0px 0px;
	}
	.room-rent li {
		border-bottom: 1px solid #eeeeee;
		padding-bottom: 10px;
		margin-top: 5px;
	}
	.room-rent li span {
		margin: 0px 15px 0px 0px;
	}
	.roomie {
		font-size: 15px;
		padding: 10px 0px;
	}
	.roomie li {
		border-bottom: 1px solid #eeeeee;
		padding-bottom: 10px;
		margin-top: 5px;
	}
	.roomie li div {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}

	.tag-list {
		display: inline-flex;		
		color: #4adcd1;
		font-size: 13px;
	}
	.tag-list li {
		margin: 0px 8px 0px 0px;
		padding: 0px 2px;
		border-radius: 5px;
		border: 1px solid #4adcd1;
		height: 20px;
		line-height: 20px;
	}

	.gz-detail-wrap {
		position: absolute;
	  width: 100%;
	  top: 0;
	  bottom: 0;
	  background: white;
	  overflow-x: hidden;
	}
	.gz-detail {  
	  height: 100%;
	}
	.gz-detail >div {
		padding-bottom: 50px;
	}

	.paragraph {
		font-size: 15px;
		padding: 10px 0px; 
		border-bottom: 1px solid #eeeeee; 
		line-height: 30px;
	}

	.paragraph strong {
		font-weight: bold;
	}

	.paragraph span {
		color: #666666;
	}

	footer {
		position: fixed;
		display: inline-flex;
		flex-flow: row nowrap;
		width: 100%;
		height: 50px;
		bottom: 0px;
	}
	footer i {
		position: absolute;
		color: white;
		left: 49%;
		top: 35%;
	}
	footer div {
		width: 50%;
		font-size: 20px;
		line-height: 50px;
		color: white;
		background: #4adcd1;
		text-align: center;
	}
	footer div a {
		display: block;
		width: 100%;
		height: 100%;
	}
	.canBooking {
		font-weight: bold;
		color: #4adcd1;
	}
</style>