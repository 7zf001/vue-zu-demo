<template>
	<div>
		<div v-html="HouseTypeDetail"></div>
	</div>
</template>

<script>
	export default {
		computed: {
			HouseTypeDetail () {
				return this.$store.getters.GzHouseInfo['house_type_detail']
			}
		}
	}
</script>

<style scoped>
	h1 {
		display: inline-block;
		font-size: 24px;
		border-bottom: 1px solid #eeeeee;
	}
	strong {
		font-weight: bold; 
	}
	p {
		font-size: 15px;
		padding: 10px 0px;
		border-bottom: 1px solid #eeeeee;	
		line-height: 30px;
	}
	span {
		color: #666666;
	}
</style>