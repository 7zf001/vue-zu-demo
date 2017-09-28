<template>
	<ul class="houses-list" v-if="houseslist.length">
		<router-link 
			v-for="item in houseslist"
			tag="li"
			:key="item.id"
			:to="{path: '/cq/' + item.id}"
		>
			<div class="pic-panel">
				<img :src="item.index_photo || default_photo">
			</div>
			<div class="info-panel">
				<div class="description">
					<p>{{ item.title }}</p>
					<ul class="tag-list">
						<li v-for="tag in item.tag">
							{{ tag }}
						</li>
					</ul>
				</div>
				<div class="price">
					￥{{ item.price }}
				</div>
			</div>
		</router-link>
	</ul>
</template>

<script>
	export default {
		props: {
			houseslist: {
				type: Array,
				default: []
			}
		},
		data () {
			return {
				default_photo: require('../../assets/images/cq_default.jpg')
			}
		}
	}
</script>

<style scoped>
	.houses-list {
		padding: 10px;
	}
	.pic-panel {
		width: 100%;
		min-height: 222px;
	}
	.pic-panel img {
		width: 100%;
	}
	.info-panel {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		margin: 15px 0px;
		padding-bottom: 25px;
		border-bottom: 1px solid #eeeeee;
	}
	.houses-list li .info-panel .description {
		font-size: 15px;
	}
	.tag-list {
		display: inline-flex;		
		color: #4adcd1;
		margin-top: 10px;	
	}
	.tag-list li {
		margin: 0px 8px 0px 0px;
		padding: 2px 5px;
		border-radius: 5px;
		border: 1px solid #4adcd1;
	}
	.houses-list li .info-panel .price {
		font-size: 30px;
		color: #4adcd1;
	}
</style>