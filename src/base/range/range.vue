<template>
  <div class="my-range" :class="{ 'my-range--disabled': disabled }">
    <slot name="start"></slot>
    <div class="my-range-content" ref="content">
      <div class="my-range-runway" :style="{ 'border-top-width': barHeight + 'px' }"></div>
      <div class="my-range-progress" :style="{ width: progress + '%', height: barHeight + 'px' }"></div>

      <template v-if="isRange">
        <div class="my-range-prev-progress" :style="{ width: prevProgress + '%', height: barHeight + 'px' }"></div>
        <div class="my-range-prev-thumb" ref="prevThumb" :style="{ left: prevProgress + '%' }"></div>
      </template>

      <div class="my-range-thumb" ref="thumb" :style="{ left: progress + '%' }"></div>
      
    </div>
    <slot name="end"></slot>
  </div>
</template>

<script type="text/babel">
  import draggable from './draggable';

  export default {
    name: 'range',

    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // 滑块的值,在vue中，v-model双向绑定的值会props到组件的value中
      value: {
        type: Number
      },
      minValue: {
        type: Number
      },
      // 滑槽的线宽（像素）
      barHeight: {
        type: Number,
        default: 1
      },
      // 是否启动范围滑动
      isRange: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      // 计算进度条
      progress () {
        const value = this.value;
        if (typeof value === 'undefined' || value === null) return 0;
        return Math.floor( (value - this.min) / (this.max - this.min) * 100);
      },

      prevProgress () {
        const value = this.minValue;
        if (typeof value === 'undefined' || value === null) return 0;
        return Math.floor( (value - this.min) / (this.max - this.min) * 100);
      }
    },

    mounted() {
      const thumb = this.$refs.thumb;
      const prevThumb = this.$refs.prevThumb;
      const content = this.$refs.content;

      // 获取按钮相对于contentBox的位置
      const getThumbPosition = () => {
        const contentBox = content.getBoundingClientRect();
        const thumbBox = thumb.getBoundingClientRect();

        let initThumbPosition = {
          left: thumbBox.left - contentBox.left,
          top: thumbBox.top - contentBox.top,
          thumbBoxLeft: thumbBox.left
        }

        if (this.isRange) {
          const prevThumbBox = prevThumb.getBoundingClientRect();
          initThumbPosition.prevThumbLeft = prevThumbBox.left - contentBox.left;
          initThumbPosition.prevThumbTop = prevThumbBox.top - contentBox.top;
          initThumbPosition.prevThumbBoxLeft = prevThumbBox.left;
        }
        
        return initThumbPosition;
      };

      let dragState = {};

      // 后按钮
      draggable(thumb, {
        start: (event) => {
          if (this.disabled) return;
          const thumbPosition = getThumbPosition();
          // 点击thumb的内部X轴
          const thumbClickDetalX = event.pageX - thumbPosition.thumbBoxLeft;

          dragState = {
            thumbStartLeft: thumbPosition.left,
            thumbStartTop: thumbPosition.top,
            thumbClickDetalX: thumbClickDetalX
          };
          
        },
        drag: (event) => {
          if (this.disabled) return;
          const contentBox = content.getBoundingClientRect();
          // 计算X轴移动像素
          const moveX = event.pageX - contentBox.left - dragState.thumbStartLeft - dragState.thumbClickDetalX;

          const stepCount = Math.ceil((this.max - this.min) / this.step);

          const newPosition = (dragState.thumbStartLeft + moveX) - (dragState.thumbStartLeft + moveX) % (contentBox.width / stepCount);

          // 比例
          let newProgress = newPosition / contentBox.width;

          if (newProgress < 0) {
            newProgress = 0;
          } else if (newProgress > 1) {
            newProgress = 1;
          }

          let value = Math.round(this.min + newProgress * (this.max - this.min));

          if (this.isRange && value < this.minValue) {
            value = this.minValue
          }

          this.$emit('input', value);
        },
        end: (event) => {
          if (this.disabled) return;
          this.$emit('change', this.value);
          dragState = {};
        }
      });

      if (this.isRange) {
        // 前按钮
        draggable(prevThumb, {
          start: (event) => {
            if (this.disabled) return;
            const thumbPosition = getThumbPosition();
            // 点击thumb的内部X轴
            const thumbClickDetalX = event.pageX - thumbPosition.prevThumbBoxLeft;

            dragState = {
              thumbStartLeft: thumbPosition.prevThumbLeft,
              thumbStartTop: thumbPosition.prevThumbTop,
              thumbClickDetalX: thumbClickDetalX
            };
            
          },
          drag: (event) => {
            if (this.disabled) return;
            const contentBox = content.getBoundingClientRect();  

            // 计算X轴移动像素
            const moveX = event.pageX - contentBox.left - dragState.thumbStartLeft - dragState.thumbClickDetalX;

            const stepCount = Math.ceil((this.max - this.min) / this.step);

            const newPosition = (dragState.thumbStartLeft + moveX) - (dragState.thumbStartLeft + moveX) % (contentBox.width / stepCount);

            // 比例
            let newProgress = newPosition / contentBox.width;

            if (newProgress < 0) {
              newProgress = 0;
            } else if (newProgress > 1) {
              newProgress = 1;
            }

            // 前按钮的值不能大于后按钮的值
            let minValue = Math.round(this.min + newProgress * (this.max - this.min));

            if (minValue > this.value) {
              minValue = this.value
            }
 
            this.$emit('input-minValue', minValue);
          },
          end: (event) => {
            if (this.disabled) return;
            this.$emit('change', this.minValue);
            dragState = {};
          }
        });
      }
    }
  };
</script>

<style>
  .my-range {
    position: relative;
    display: flex;
    height: 30px;
    line-height: 30px;
    margin: 15px 0;
  }
  .my-range > * {
    display: flex;
    display: -webkit-box;
  }

  .my-range-content {
    position: relative;
    flex: 1;
    margin-right: 30px;
  }

  .my-range-runway {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: -30px;
    border-top-color: #dadcdc;
    border-top-style: solid;
  }

  .my-range-thumb {
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    cursor: move;
    box-shadow: 0 1px 3px rgba(0,0,0,.4);
  }

  .my-range-prev-thumb {
    background-color: #fbfbfb;
    position: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    cursor: move;
    box-shadow: 0 1px 3px rgba(0,0,0,.4);
  }

  .my-range-progress {
    position: absolute;
    display: block;
    background-color: #4adcd1;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
  }

  .my-range-prev-progress {
    position: absolute;
    display: block;
    background-color: #dadcdc;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
  }

  .my-range--disabled {
    opacity: 0.5;
  }
</style>