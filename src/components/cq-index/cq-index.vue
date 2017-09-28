<template>
	<div class="wrap">
		<scroll class="content" :data="houseslist">
			<div>
				<div class="banner">
					<img src="../../assets/images/cq_banner.jpg">
				</div>
				<div class="search" @click="toDoShowSearch">
					<div class="left">
						<div class="pic-panel">
							<img src="../../assets/images/filtrate.png">
						</div>
						<p>筛选</p>
					</div>
					<div class="right">
						你想住哪儿?
						<img src="../../assets/images/search.png">
					</div>
				</div>
				<div class="content-text">
					<p>乐窝租房，安逸得很</p>
					<span>小娃儿，搞快！耍麻将次串串去哦</span>
				</div>
				<houses-list :houseslist="houseslist"></houses-list>
				<loading v-if="!houseslist.length"></loading>
				<footer>--我是有底线的--</footer>
			</div>
		</scroll>
		<search-page :showSearch="showSearch" @toDoShowSearch="toDoShowSearch" @searchHouses="searchHouses"></search-page>
		<router-view></router-view>
	</div>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import HousesList from 'components/houses-list/houses-list'
	import SearchPage from 'components/search/search'
	import { getHouses } from 'api/api'

	export default {
		components: {
			Scroll,
			HousesList,
			SearchPage,
			Loading
		},
		data () {
			return {
				showSearch: false,
				houseslist: []
			}
		},
		methods: {
			toDoShowSearch () {
				this.showSearch = !this.showSearch
			},
			searchHouses (param) {
				this.showSearch = !this.showSearch

				getHouses(param).then( (res) => {
					this.houseslist = res
				})

			},
			_getHouses () {
				getHouses().then( (res) => {
					this.houseslist = res
				})
			}
		},
		created () {
			this._getHouses()
		}
	}
</script>

<style scoped>
	/* scroll */
	.wrap {
	  position: fixed;
	  z-index: 2;
	  width: 100%;
	  top: 50px;
	  bottom: 0px;
	  background: white;
	}
	.content {
	  height: 100%;
	  overflow: hidden;
	}
	.banner {
		position: relative;
		z-index: 0;
	}
	.banner img {
		width: 100%;
	}
	.search {
		display: flex;
		flex-flow: row nowrap;
		position: relative;
		width: 80%;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		box-shadow: 0px 5px 10px 2px #eee;
		background: white;
		margin: 0 auto;
		margin-top: -25px;
		z-index: 1;
		font-size: 15px;
		color: #999999;
	}
	.search .left {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		position: relative;
		width: 75px;
		text-align: center;
	}
	.pic-panel {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}
	.search .right {
		padding-left: 20px;
	}
	.search .right img {
		position: absolute;
		right: 16px;
		top: 13px;
		width: 23px;
	}
	.search .left:after {
		content: '';
		position: absolute;
		right: -15px;
		top: 0px;
		display: block;
		width: 15px;
		height: 100%;
		background: linear-gradient(90deg, #f7f7f7 0%, #fff 100%);
	}
	.search .left img {
		width: 9px;
		margin-right: 3px;
		vertical-align: middle;
	}
	.content-text {
		margin: 30px;
		text-align: center;
	}
	.content-text p {
		font-size: 28px;
		margin-bottom: 15px;
	}
	.content-text span {
		color: #999;
	}
	footer {
		color: #b5b5b5;
		margin: 10px 0px;
		padding-bottom: 20px;
		text-align: center;
	}
</style>