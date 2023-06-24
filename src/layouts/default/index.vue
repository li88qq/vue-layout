<template>
  <a-layout>
    <a-layout-header>

    </a-layout-header>
    <a-layout-content>
      <a-card>
        <a-space>
          <a-button type="primary" @click="updateTheme">设置主题</a-button>
          <a-button type="primary" @click="updateColorPrimary">设置主题色</a-button>
        </a-space>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import {ref, reactive} from 'vue'
import {useAppStore} from '@/store'

const {setColorPrimary,setTheme} = useAppStore();

const colorIndex = ref(0)

const darkRef = ref(false)

//主题色
const colors = ['#5A54F9', '#9E339F', '#ED4192', '#E0282E', '#F4801A', '#F2BD27', '#00B96B', '#1890ff']

//设置主题
const updateTheme = () => {
  const theme = darkRef.value ? 'light' : 'dark'
  setTheme(theme)
  darkRef.value =!darkRef.value
}

//设置主题色
const updateColorPrimary = () => {
  const color = colors[colorIndex.value % colors.length]
  setColorPrimary(color)
  colorIndex.value++;
}

</script>
