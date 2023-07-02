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
      <a-layout-content style="padding: 12px;">
        <a-card size="small">
          <a-space>
            <a-button type="primary" @click="updateTheme">设置主题</a-button>
            <a-button type="primary" @click="updateColorPrimary">设置主题色</a-button>
          </a-space>
        </a-card>

        <a-card size="small" style="margin: 12px 0px;">
          <a-form layout="inline" :model="formRt">
            <a-form-item label="虚拟滚动">
              <a-select v-model:value="formRt.id" :options="options_id" style="width: 120px;"></a-select>
            </a-form-item>
            <a-form-item label="名称">
              <a-input v-model:value="formRt.name"/>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button>清除</a-button>
                <a-button type="primary">查询</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-card>
        <div class="view-main">
          <div ref="scrollRef" class="scroll-wrapper">
            <div class="scroll" :style="{height:`${options_id.length * 24}px`}">
              <template v-for="item in virtualList" :key="item['value']">
                <div class="scroll-item" :style="{top:`${item['value']*itemHeight}px`}">{{`${item.value}-${item.label}`}}</div>
              </template>
            </div>
          </div>
          <div class="table-wrapper">
            <a-table v-bind="tableRt"></a-table>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <Setting ref="settingRef"></Setting>
</template>
<script setup lang="ts">
import {ref, reactive, onMounted, watch,computed ,unref,h} from 'vue'
import {useAppStore} from '@/store'
import menuJson from '@/data/menu.json'
import {SettingOutlined} from '@ant-design/icons-vue'
import Setting from './setting/index.vue'
import dayjs from 'dayjs'
import { useScroll } from '@vueuse/core'
import VirtualTable from './virtualtable/index.vue'

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
    if (children && children.length > 0) {
      menu['children'] = convertMenu(children)
    }
    return menu
  })
  return menus
}

watch(() => darkRef.value, value => {
  if (value) {
    topMenuRt.theme = 'dark'
    siderMenuRt.theme = 'dark'
  } else {
    topMenuRt.theme = 'light'
    siderMenuRt.theme = 'light'
  }
})

//打开个人自定义设置
const openSetting = () => {
  settingRef.value.open()
}

//搜索表单
const formRt = reactive({
  id: undefined,
  name: '',
})

//搜索框select,测试虚拟滚动
const options_id = ref([])

//初始化虚拟列数据
const init_options_id = (size = 10000) => {
  const arr = []
  for (let i = 0; i < size; i++) {
    arr.push({
      label: `字段-${i}`,
      value: i,
    })
  }
  options_id.value = arr
}

//时间戳格式化
const timestampFormat = (timestamp)=>{
  return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm')
}

//表格列
const columns = [
  {dataIndex: 'id', title: 'ID',width:150},
  {dataIndex: 'name', title: '名称',width:150},
  {dataIndex: 'value', title: '值',width:150},
  {dataIndex: 'createDate', title: '创建时间',customRender:({text})=>timestampFormat(text),width:150},
]

//表格
const tableRt = reactive({
  rowKey: 'id',
  columns: columns,
  dataSource: [],
  pagination: false,
  scroll:{
    y:400,
  },
  //自定义内容
  components:{
    body: (rawData)=>{
      const defaultConfig = {showHeader:false,dataSource:[],components:undefined,scroll: {}}
      const config = {...tableRt,...defaultConfig}
      return h(VirtualTable, {config,rawData})
    }
  }
})

//随机字符,40869 - 19968
const randomChar = (size=10):string=>{
  const arr = []
  const u = '\\u';
  for(let i=0;i<size;i++){
    const value = randomNumber(40869,19968)
    const char = `${u}${value.toString(16)}`;
    const text = unescape(char.replace(/\\u/g, "%u"));
    arr.push(text)
  }
  return arr.join('')
}

//随机数
const randomNumber = (min=0,max=10000):number=>{
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

//初始化表格数据
const initDataSource = (size=100)=>{
  const arr = []
  const min = 1577808000;//2020-01-01 00:00:00
  const max = dayjs().unix();//当前时间戳
  for(let i=0;i<size;i++){
    arr.push({
      id:i,
      name:randomChar(),
      value:Math.random(),
      createDate: randomNumber(min,max),
    })
  }
  tableRt.dataSource = arr
}

//初始化
const init = () => {
  buildTopMenu()
  init_options_id()
  initDataSource(10000)
}

//虚拟列表组件引用
const scrollRef = ref<HTMLElement|null>(null);
//虚拟列表y滚动
const { y } = useScroll(scrollRef);
//虚拟列表元素高度
const itemHeight = 24;
//滚动容器高度
const scrollHeight = 400;

//虚拟列表数据
const virtualList = computed(()=>{
  const scrollY = unref(y);//滚动y
  const startIndex = Math.floor(scrollY/itemHeight);//开始索引
  const totalSize = Math.ceil(scrollHeight/itemHeight);//滚动容器内最多显示数量
  let endIndex = startIndex + totalSize;//结束索引
  endIndex = Math.min(endIndex,options_id.value.length);//防止数组下标越界
  const array = options_id.value.slice(startIndex,endIndex);
  return array;
})

onMounted(() => {
  init()
})

</script>
<style scoped>

.header {
  display: flex;
  flex-direction: row;
  align-content: center;
}

.header-menu {
  flex: 1;
}

.header-right {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.header-item {
  height: 64px;
  width: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.header-item .anticon {
  font-size: 18px;
}

.scroll-wrapper{
  width: 200px;
  height: 400px;
  overflow: auto;
  background-color: #fff;
}
.scroll{
  position: relative;
}
.scroll-item{
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
}
.view-main{
  display: flex;
  flex-direction: row;
}
.table-wrapper{
  flex: 1;
  margin-left: 24px;
}
</style>
