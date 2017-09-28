<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <scroll class="dialog-content"  v-if="isShow">
        	<div class="padding5">
	          <p class="dialog-close" @click="closeMyself">
	          	<img src="../../assets/images/icon/close.png">
	          </p>
	          <slot>empty</slot>
	        </div>
        </scroll>
      </transition>
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
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
.drop-enter, .drop-leave-to {
  opacity: 0;
}

.drop-enter-to, .drop-leave-to {
  transition: all 0.3s;
}

.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .5;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 80%;
  position: fixed;
  margin: auto;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  min-height: 30%;
  max-height: 60%;
  overflow: hidden;
  background: #fff;
  z-index: 10;
  border: none;
  border-radius: 10px;
  line-height: 1.6;
}
.padding5 {
	padding: 5%;
}
.dialog-close {
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 50px;
  background: #4adcd1;
  color: #fff;
  text-align: center;
  border-left: 8px solid #a4ede8;
  border-bottom: 8px solid #a4ede8;
  border-radius: 0px 0px 0px 50px;
  text-align: center;
  cursor: pointer;
}
.dialog-close img {
	width: 15px;
	margin: 13px 10px 15px 15px;
}
</style>
