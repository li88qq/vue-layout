<template>
  <a-drawer v-bind="drawerRt">
    <Form></Form>
  </a-drawer>
</template>
<script setup lang="ts">
import {ref,reactive,onMounted,defineAsyncComponent} from 'vue'
const Form = defineAsyncComponent(()=>import('./Form.vue'))

//抽屉属性
const drawerRt = reactive({
  title:'自定义设置',
  open:false,
  onClose: ()=>close(),
})

//打开抽屉
const open = ()=>{
  drawerRt.open = true
}

//关闭
const close = ()=>{
  drawerRt.open = false
}

defineExpose({
  open,
  close,
})

</script>