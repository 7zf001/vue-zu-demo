<template>
	<div class="wrap">
		<div class="left-text">
			{{ mainText }}
		</div>
		<div class="right-wrap">
			<scroll>
				<ul class="right-text">
					<router-link 
						v-for="(item, index) in selectOption" 
						:key="index"
						:class="[{on: index === nowIndex}]"
						tag="li"
						:to="{path: '' + index}"
						@click.native="getSelectOption(index)"
					>
						{{ item.label }}
					</router-link>
				</ul>
			</scroll>
		</div>
	</div>
</template>

<script>
	import Scroll from 'base/scroll/scroll'

	export default {
		components: {
			Scroll
		},
		props: {
			mainText: {
				type: String,
				default: '选择项'
			},
			selectOption: {
				type: Array,
				default: [
					{
						label: '请选择',
						href: '#'
					}
				]
			}
		},
		data () {
			return {
				nowIndex: 0
			}
		},
		methods: {
			getSelectOption (index) {
				this.$emit('getSelectOption', index)
				this.nowIndex = index
			}
		}
	}
</script>

<style scoped>
	.wrap {
		display: inline-flex;
		flex-flow: row nowrap;
		width: 100%;
		height: 50px;
		border: 1px solid #eeeeee;
	}
	.left-text {
		position: relative;
		width: 84px;
		text-align: center;
		font-size: 15px;
		font-weight: bold;
		line-height: 50px;
		box-shadow: 5px 0px 20px #eee;
		z-index: 2;
		background: white;
		white-space: nowrap;
		padding: 0 10px;
	}
	.right-wrap {
		width: 80%;
		height: 100%;
		z-index: 1;
	}
	.right-text {
		display: inline-flex;
		flex-flow: row nowrap;
		font-size: 15px;
		line-height: 50px;
	}
	.right-text li.on {
		font-weight: bold;
		color: black;
		border-bottom: 2px solid #4adcd1;
	}
	.right-text li {
		position: relative;
		box-sizing: border-box;
		white-space: nowrap;
		padding: 0 20px;
		color: #666666;
	}
	.right-text li:after {
		position: absolute;
		right: 0px;
		content: '|';
		font-size: 10px;
		font-weight: normal;
	}
	.right-text li:last-child:after {
		content: '';
	}
</style>