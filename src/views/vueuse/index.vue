<template>
  <div>
    <a-card size="small">
      <template #title>
        <span>滚动条y:{{y}}</span>
      </template>
      <div ref="scrollRef" class="scroll-wrapper">
        <div class="scroll"></div>
      </div>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import { useScroll,onClickOutside } from '@vueuse/core'

const scrollRef = ref()

const { y } = useScroll(scrollRef)


</script>
<style scoped>
.scroll-wrapper{
  height: 100px;
  overflow: auto;
}
.scroll{
  height: 1000px;
  position: relative;
}
</style>
