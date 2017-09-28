<template>
	<div>
		<div v-html="GzCostDetail"></div>
	</div>
</template>

<script>
	export default {
		computed: {
			GzCostDetail () {
				return this.$store.getters.GzHouseInfo['cost_detail']
			}
		}
	}
</script>

<style scoped>

</style>