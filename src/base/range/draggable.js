let isDragging = false;
import Vue from 'vue';
// 判断是否支持手机触摸事件
const supportTouch = !Vue.prototype.$isServer && 'ontouchstart' in window;

export default function(element, options) {
  const moveFn = function(event) {
    if (options.drag) {
      options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  };

  const endFn = function(event) {
    if (!supportTouch) {
      document.removeEventListener('mousemove', moveFn);
      document.removeEventListener('mouseup', endFn);
    }
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;

    if (options.end) {
      options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  };

  element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function(event) {
    if (isDragging) return;
    // 与passive 冲突
    /*event.preventDefault();*/
    document.onselectstart = function() { return false; };
    document.ondragstart = function() { return false; };

    if (!supportTouch) {
      document.addEventListener('mousemove', moveFn);
      document.addEventListener('mouseup', endFn);
    }
    isDragging = true;

    if (options.start) {
      options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  }, {'passive': true});

  if (supportTouch) {
    element.addEventListener('touchmove', moveFn, {'passive': true});
    element.addEventListener('touchend', endFn, {'passive': true});
    element.addEventListener('touchcancel', endFn, {'passive': true});
  }
};
