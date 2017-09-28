<template>
	<header>
		<a class="personal" href="https://mp.loveto.co/">
			<img src="../../assets/images/icon/personal.png">
		</a>
		<ul>
			<router-link 
				v-for="(item, index) in cityList" 
				:key="index" 
				:to="{path: item.href}" 
				active-class="on" 
				tag="li"
			>
				<a>{{ item.label }}</a>
			</router-link>
		</ul>
	</header>
</template>

<script>
	export default {
		data () {
			return {
				cityList: [
					{
						label: '广州',
						href: '/gz'
					},
					{
						label: '重庆',
						href: '/cq'
					}
				]
			}
		}
	}
</script>

<style scoped>
	header {
		position: relative;
		z-index: 1;
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		height: 40px;
		padding: 10px 0px 0px 0px;
		background: white;
	}

	.personal {
		margin: 5px 15px 0px 25px;
	}

	.personal img {
		width: 20px;
	}

	ul {
		display: inline-flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		width: 100%;
	}

	ul li {
		font-size: 18px;
		line-height: 30px;
	}

	ul li.on {
		border-bottom: #4adcd1 2px solid;
	}
</style>