<template>
  <div>
    <a-card size="small" ref="card1">
      <template #title>
        <span>滚动条y:{{ y }}</span>
      </template>
      <div ref="scrollRef" class="scroll-wrapper">
        <div class="scroll"></div>
      </div>
    </a-card>

    <div class="tooltip" v-show="toolTipRt.show" :style="{top:`${toolTipRt.top}px`,left:`${toolTipRt.left}px`}"></div>
  </div>
</template>
<script setup lang="ts">
import {ref, h,reactive} from 'vue'
import {useScroll, onClickOutside,} from '@vueuse/core'
import {message} from 'ant-design-vue'

const scrollRef = ref()
const card1 = ref()
const toolTipRt = reactive({
  show:false,
  top:0,
  left:0,
})

const {y} = useScroll(scrollRef)

//定时
let timeout =undefined;

//在指定元素外点击事件
//1.显示tooltip,默认3秒后自动关闭
onClickOutside(card1, (evt) => {
  const {clientX, clientY,x,y} = evt
  message.info({
    content: () => {
      const p1 = h('p', `onClickOutside`)
      const p2 = h('p', `clientX:${clientX},clientY:${clientY}`)
      const div = h('div', [p1,p2])
      return div
    }
  })
  if(!toolTipRt.show){
    toolTipRt.show = true;
  }
  if(timeout){
    clearTimeout(timeout)
  }
  if(toolTipRt.show){
    toolTipRt.top = y
    toolTipRt.left = x
    timeout = setTimeout(()=>{
      if(toolTipRt.show){
        toolTipRt.show = false
      }
    },3000)
  }
})




</script>
<style scoped>
.scroll-wrapper {
  height: 100px;
  overflow: auto;
}

.scroll {
  height: 1000px;
  position: relative;
}

/*弹出*/
.tooltip{
  position: absolute;
  background-color: black;
  height: 60px;
  width: 100px;
}
</style>
