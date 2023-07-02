<template>
  <div ref="scrollRef" class="scroll-wrapper">
    <a-table v-bind="props.config" :data-source="virtualList" :style="{height:`${rawData.length * 55}px`}" class="scroll"
             :rowClassName="rowClassName" :customRow="customRow">
    </a-table>
    <!--    <table>-->
    <!--      <tbody class="scroll" :style="{height:`${rawData.length * 24}px`}">-->
    <!--      <tr v-for="item in virtualList" :key="item['id']" class="scroll-item" :style="{top:`${item['id']*itemHeight}px`}">-->
    <!--        <template v-for="column in item" :key="column">-->
    <!--          <td :style="{width: `150px`}">{{ column }}</td>-->
    <!--        </template>-->
    <!--      </tr>-->
    <!--      </tbody>-->
    <!--    </table>-->
  </div>
</template>
<script setup lang="ts">
import {computed, ref, unref} from 'vue'
import {useScroll} from '@vueuse/core'

const props = defineProps({
  config:{
    type:Object,
    default:()=>{}
  },
  rawData: {
    type: Array,
    default: () => []
  }
})

//行列名
const rowClassName = ()=>{
  return 'scroll-item';
}

//自定义行
const customRow = (record,index)=>{
  const startIndex = unref(getStartIndex)
  const top = (startIndex+index)*itemHeight
  return {
    style: {
      top:`${top}px`,
    }
  }
}

//获取第一行索引
const getStartIndex = computed(()=>{
  const scrollY = unref(y);//滚动y
  return  Math.floor(scrollY / itemHeight);//开始索引
})

//虚拟列表组件引用
const scrollRef = ref<HTMLElement | null>(null);
//虚拟列表y滚动
const {y} = useScroll(scrollRef);
//虚拟列表元素高度
const itemHeight = 55;
//滚动容器高度
const scrollHeight = 400;

//虚拟列表数据
const virtualList = computed(() => {
  const dataArray = props.rawData as any as [];
  const startIndex = unref(getStartIndex);//开始索引
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

::v-deep(.scroll-item){
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
}

::v-deep(.ant-table-cell){
  flex: 1;
}
</style>
