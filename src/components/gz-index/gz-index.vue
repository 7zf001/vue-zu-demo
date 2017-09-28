<template>
	<div class="wrap">
		<scroll class="content">
			<div>
				<img class="banner" src="../../assets/images/gz_banner.jpg">
				<p class="slogen">
					青年王国<small>●</small>只差一个你
				</p>
				<p class="slogen-sub">
					有你，有我，有我们的，家
				</p>
				<router-link type="button" tag="button" :to="{path: '/gz/detail'}">立即看房</router-link>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script>
	import Scroll from 'base/scroll/scroll'

	export default {
		components: {
			Scroll
		}
	}
</script>

<style scoped>
	/* scroll */
	.wrap {
	  position: fixed;
	  width: 100%;
	  top: 50px;
	  bottom: 0px;
	}
	.content {
	  height: 100%;
	  overflow: hidden;
	}
	.banner {
		width: 100%;
	}
	.slogen {
		font-size: 33px;
		font-weight: bold;
		letter-spacing: 2px;
		text-align: center;
		margin-top: 30px;		
	}
	.slogen small {
		font-size: 12px;		
		font-weight: 200px;
		vertical-align: 5px;
	}
	.slogen-sub {
		color: #999999;
		text-align: center;
		font-size: 17px;
		margin-top: 30px;		
	}
	button {
		display: block;
		width: 260px;
		height: 50px;
		border-radius: 25px;
		box-shadow: 0px 10px 50px -10px #4adcd1;
		background: #4adcd1;
		color: #fff;
		font-size: 23px;
		border: none;
		margin: 30px auto;
	}
</style>