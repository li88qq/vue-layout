<template>
  <div ref="scrollRef" class="scroll-wrapper">
    <table>
      <tbody class="scroll" :style="{height:`${rawData.length * 24}px`}">
      <tr v-for="item in virtualList" :key="item['id']" class="scroll-item" :style="{top:`${item['id']*itemHeight}px`}">
        <template v-for="column in item" :key="column">
          <td :style="{width: `150px`}">{{ column }}</td>
        </template>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import {computed, ref, unref} from 'vue'
import {useScroll} from '@vueuse/core'

const props = defineProps({
  rawData: {
    type: Array,
    default: () => []
  }
})


//虚拟列表组件引用
const scrollRef = ref<HTMLElement | null>(null);
//虚拟列表y滚动
const {y} = useScroll(scrollRef);
//虚拟列表元素高度
const itemHeight = 24;
//滚动容器高度
const scrollHeight = 400;

//虚拟列表数据
const virtualList = computed(() => {
  const dataArray = props.rawData as any as [];
  const scrollY = unref(y);//滚动y
  const startIndex = Math.floor(scrollY / itemHeight);//开始索引
  const totalSize = Math.ceil(scrollHeight / itemHeight);//滚动容器内最多显示数量
  let endIndex = startIndex + totalSize;//结束索引
  endIndex = Math.min(endIndex, dataArray.length);//防止数组下标越界
  const array = dataArray.slice(startIndex, endIndex);
  return array;
})

</script>
<style scoped>
.scroll-wrapper {
  width: 100%;
  height: 400px;
  overflow: auto;
  background-color: #fff;
}

.scroll {
  position: relative;
}

.scroll-item {
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
}
</style>
