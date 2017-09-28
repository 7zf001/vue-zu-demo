<template>
	<div class="multiply-chooser">
		<h2>{{ title }}</h2>
		<ul>
			<li 
			 v-for="(item, key) in chooserList"
			 @click="chosen(item.value, item.clearAll)"
			 :class="[
			  {clearMarginRight: (key + 1) % 3 === 0},
			  {active: checkChooser(item.value)}
			 ]"
			>
				{{ item.label }}
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			chooserList: {
				type: Array,
				default: []
			},
			title: {
				type: String,
				default: ''
			}
		},
		data () {
			return {
				chosenArr: []
			}
		},
		methods: {
			chosen (index, clearAllStatus) {
				let _indexOf = this.chosenArr.indexOf(index)
				
				if (_indexOf === -1) {
					if (clearAllStatus) {
						this.chosenArr.splice(0, this.chosenArr.length)
					}
					if (this.chooserList[0]['clearAll']) {
						let clearAllIndex = this.chosenArr.indexOf(0)
						// 去除不限或请选择按钮
						if (clearAllIndex !== -1) {
							this.chosenArr.splice(clearAllIndex, 1)
						}
					}
					this.chosenArr.push(index)
					
				} else {
					this.chosenArr.splice(_indexOf, 1)
				}
				
				this.$emit('getChosen', this.chosenArr)
			},
			checkChooser (index) {
				return this.chosenArr.indexOf(index) !== -1
			}
		}
	}
</script>

<style scoped>
	.multiply-chooser {
		margin-top: 30px; 
	}
	h2 {
		font-size: 16px;
		font-weight: bold;
	}	
	ul {
		display: flex;
		flex-flow: row wrap;
		font-size: 16px;
		margin-left: -7px;
	}

	ul li {
		width: 100px;
		height: 40px;
		line-height: 40px;
		border-radius: 5px;
		background: white;
		text-align: center;
		margin-top: 15px;
		margin-left: 7px;
		margin-right: 7px;
	}

	ul li.clearMarginRight {
		margin-right: 0;
	}

	ul li.active {
		background: #4adcd1;
		color: white;
	}
</style>