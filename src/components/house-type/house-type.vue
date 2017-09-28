<template>
	<div class="house-type">
		<m-marquee 
			:mainText="mainText" 
			:selectOption="selectOption"
			@getSelectOption="getHouseType"
		></m-marquee>
	</div>
</template>

<script>
	import MMarquee from 'base/marquee/marquee'
	import { getGzInfo } from 'api/api'

	export default {
		components: {
			MMarquee
		},
		data () {
			return {
				mainText: '房间类型',
				selectOption: []
			}
		},
		methods: {
			getHouseType (index) {
				// 触发sroll.refresh()
				this.$emit('selectHouseType', index)

				this.$store.commit('SET_GZ_HOUSE_INFO', this.selectOption[index])
			},
			_getGzInfo() {
        getGzInfo().then((res) => {
        	this.selectOption = res

        	this.$router.push('/gz/detail/0')

        	this.$store.commit('SET_GZ_HOUSE_INFO', this.selectOption[0] || [])
        })
      }
		},
		created() {
      this._getGzInfo()
    }
	}
</script>

<style scoped>

</style>