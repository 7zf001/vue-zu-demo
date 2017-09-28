<template>
	<transition name="fade">
		<div class="gz-detail-wrap">
			<scroll ref="scroll" class="gz-detail">
				<div>

					<div >
						<m-slider>
							<div v-for="item in housePhoto">
	              <img class="needsclick" :src="item">
	            </div>
						</m-slider>
					</div>
					<m-house-type @selectHouseType="selectHouseType"></m-house-type>

					<router-view @showDialog="showDialog"></router-view>
				</div>
			</scroll>

			<footer>
				<div>
					<a :href="'http://ditu.amap.com/search?query=' + this.$store.getters.GzHouseInfo.address">地图导航</a>
				</div>
				<i>|</i>
				<div>
					<a :href="'tel:' + this.$store.getters.GzHouseInfo.mobile">联系管家</a>
				</div>
			</footer>
			<m-dialog :isShow="costShow" @on-close="closeDialog">
				<cost-detail></cost-detail>
			</m-dialog>
			<m-dialog :isShow="configShow" @on-close="closeDialog">
				<config-detail></config-detail>
			</m-dialog>
			<m-dialog :isShow="houseTypeShow" @on-close="closeDialog">
				<house-type-detail></house-type-detail>
			</m-dialog>
			<m-dialog :isShow="doorShow" @on-close="closeDialog">
				<roomie-detail></roomie-detail>
			</m-dialog>
		</div>
	</transition>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import MSlider from 'base/slider/slider'
	import MHouseType from 'components/house-type/house-type'
	import MDialog from 'base/dialog/dialog'
	import CostDetail from 'components/detail/cost'
	import ConfigDetail from 'components/detail/config'
	import HouseTypeDetail from 'components/detail/house-type'
	import RoomieDetail from 'components/detail/roomie'

	export default {
		components: {
			Scroll,
			MSlider,
			MHouseType,
			MDialog,
			CostDetail,
			ConfigDetail,
			HouseTypeDetail,
			RoomieDetail
		},
		data () {
			return {
				selectOption: [],
				costShow: false,
				configShow: false,
				houseTypeShow: false,
				doorShow: false,
				housePhoto: [
					require("../../assets/images/gz_images/gz_image_1.jpg"),
					require("../../assets/images/gz_images/gz_image_2.jpg"),
					require("../../assets/images/gz_images/gz_image_3.jpg"),
					require("../../assets/images/gz_images/gz_image_4.jpg"),
					require("../../assets/images/gz_images/gz_image_5.jpg")
				],
			}
		},
		computed: {
			
		},
		methods: {
			selectHouseType () {			
				setTimeout(() => {
	        this.$refs.scroll.refresh()
	      }, 20)
			},
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
</style>