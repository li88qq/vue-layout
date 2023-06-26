<template>
  <a-layout>
    <a-layout-sider>
      <a-menu v-bind="siderMenuRt"></a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <div class="header">
          <div class="header-logo"></div>
          <div class="header-menu">
            <a-menu v-bind="topMenuRt"></a-menu>
          </div>
          <div class="header-right">
            <div class="header-item" @click="openSetting">
              <SettingOutlined/>
            </div>
          </div>
        </div>
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
  </a-layout>
  <Setting ref="settingRef"></Setting>
</template>
<script setup lang="ts">
import {ref, reactive, onMounted,watch} from 'vue'
import {useAppStore} from '@/store'
import menuJson from '@/data/menu.json'
import {SettingOutlined} from '@ant-design/icons-vue'
import Setting from './setting/index.vue'

const {setColorPrimary, setTheme} = useAppStore();

//引用
const settingRef = ref()

//主题色序号
const colorIndex = ref(0)

//是否暗黑主题
const darkRef = ref(false)
//顶部菜单
const topMenuRt = reactive({
  mode: 'horizontal',
  items: [],
  theme: 'light'
})
//左侧菜单
const siderMenuRt = reactive({
  mode: 'inline',
  items: [],
  theme: 'light'
})

//主题色
const colors = ['#5A54F9', '#9E339F', '#ED4192', '#E0282E', '#F4801A', '#F2BD27', '#00B96B', '#1890ff']

//设置主题
const updateTheme = () => {
  const theme = darkRef.value ? 'light' : 'dark'
  setTheme(theme)
  darkRef.value = !darkRef.value
}

//设置主题色
const updateColorPrimary = () => {
  const color = colors[colorIndex.value % colors.length]
  setColorPrimary(color)
  colorIndex.value++;
}

//构建菜单
const buildTopMenu = () => {
  //id索引
  const idMap = {}
  menuJson.forEach((item, index) => {
    const {id} = item
    idMap[id] = index
  })

  //处理子节点
  menuJson.forEach(item => {
    const {parentId} = item
    if (parentId > 0) {
      const idIndex = idMap[parentId]
      if (idIndex) {
        const parent = menuJson[idIndex]
        const children = parent['children'] || []
        parent['children'] = [...children, item]
      }
    }
  })
  //只取最外级
  const tree = menuJson.filter(item => item['parentId'] === 0)
  const menus = convertMenu(tree)
  topMenuRt.items = menus;
  siderMenuRt.items = menus;
}

//转化为菜单
const convertMenu = (tree): [] => {
  const menus = tree.map(item => {
    const {id, children} = item
    const key = `${id}`
    const menu = {
      key: key,
      label: key,
      title: key,
    }
    if(children && children.length>0){
      menu['children'] = convertMenu(children)
    }
    return menu
  })
  return menus
}

const init = () => {
  buildTopMenu();
}

watch(()=>darkRef.value,value=>{
  if(value){
    topMenuRt.theme = 'dark'
    siderMenuRt.theme = 'dark'
  }else{
    topMenuRt.theme = 'light'
    siderMenuRt.theme = 'light'
  }
})

//打开个人自定义设置
const openSetting = ()=>{
  settingRef.value.open()
}

onMounted(() => {
  init()
})

</script>
<style scoped>

.header{
  display: flex;
  flex-direction: row;
  align-content: center;
}
.header-menu{
  flex: 1;
}
.header-right{
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.header-item{
  height: 64px;
  width: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.header-item .anticon{
  font-size: 18px;
}
</style>
