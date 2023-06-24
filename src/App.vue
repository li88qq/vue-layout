<template>
  <a-config-provider :theme="themeRt">
    <RouterView></RouterView>
  </a-config-provider>

</template>
<script setup lang="ts">
import {reactive, watch} from 'vue'
import {useAppStore} from '@/store'
import {theme} from 'ant-design-vue'

const appStore = useAppStore();
const {defaultAlgorithm, darkAlgorithm} = theme

const themeRt = reactive({
  algorithm: defaultAlgorithm,
  token: {
    colorPrimary: appStore.colorPrimary
  }
})

watch(() => appStore.colorPrimary, value => {
  themeRt.token.colorPrimary = value
})

watch(()=>appStore.theme,value=>{
  if(value==='dark'){
    themeRt.algorithm = darkAlgorithm
  }else {
    themeRt.algorithm = defaultAlgorithm
  }
})

</script>
