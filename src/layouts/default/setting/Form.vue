<template>
  <div>
    <a-form layout="horizontal" name="setting">
      <a-divider>主题和布局</a-divider>
      <a-form-item label="主题">
        <a-radio-group v-model:value="formRt.theme" name="theme" :options="options_theme"></a-radio-group>
      </a-form-item>
      <a-form-item label="布局">
        <a-radio-group v-model:value="formRt.layout" name="layout" :options="options_layout"></a-radio-group>
      </a-form-item>
      <a-form-item label="主题色">
        <a-radio-group v-model:value="formRt.colorPrimary" name="colorPrimary"
                       :options="options_colorPrimary"></a-radio-group>
      </a-form-item>
      <a-form-item label="顶部主题色">
        <a-radio-group v-model:value="formRt.topBackGroupColor" name="topBackGroupColor"
                       :options="options_topBackGroupColor"></a-radio-group>
      </a-form-item>
      <a-form-item label="左侧主题色">
        <a-radio-group v-model:value="formRt.siderBackGroupColor" name="siderBackGroupColor"
                       :options="options_siderBackGroupColor"></a-radio-group>
      </a-form-item>

      <a-divider>菜单</a-divider>
      <a-form-item label="切割菜单">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="固定顶部菜单">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="固定左侧菜单">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="左侧菜单宽度">
      </a-form-item>

      <a-divider>标签页</a-divider>
      <a-form-item label="显示标签页">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="固定标签页">
        <a-checkbox/>
      </a-form-item>

      <a-divider>功能</a-divider>
      <a-form-item label="菜单搜索">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="PC浏览模式">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="屏幕锁定">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="灰色模式">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="色弱模式">
        <a-checkbox/>
      </a-form-item>

      <a-divider>动画</a-divider>
      <a-form-item label="顶部进度条">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="加载进度条">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="切换动画">
        <a-checkbox/>
      </a-form-item>
      <a-form-item label="动画类型">
        <a-select/>
      </a-form-item>

    </a-form>

    <a-space direction="vertical" style="width: 100%">
      <a-button type="primary" block danger>恢复默认设置</a-button>
      <a-button type="primary" block>保存</a-button>
    </a-space>
  </div>
</template>
<script setup lang="ts">
import {ref, reactive} from 'vue'

//设置表单
const formRt = reactive({
  theme: '',
  layout: '',
  colorPrimary: '',
  topBackGroupColor: '',
  siderBackGroupColor: '',
})

//主题
const options_theme = [
  {label: '默认', value: 'default'},
  {label: '暗黑', value: 'dark'},
]

//布局
const options_layout = [
  {label: '混合', value: 'mix'},
  {label: '顶部', value: 'top'},
  {label: '侧边', value: 'sider'},
  {label: '左侧', value: 'left'},
  {label: '移动端', value: 'mobile'},
]

//主题色
const options_colorPrimary = []

//顶部主题色
const options_topBackGroupColor = []

//左侧主题色
const options_siderBackGroupColor = []

</script>