<template>
	<div>
		<div v-html="roomieDetail"></div>
	</div>
</template>

<script>
	export default {
		computed: {
			roomieDetail () {
				return this.$store.getters.GzHouseInfo['roomie_detail']
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
	em {
		color: #4adcd1;
	}
</style>