import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'

const LAYOUT = () => import('@/layouts/default/index.vue')

const routes: RouteRecordRaw[] = [
    {path: '/', component: LAYOUT},
    {path:'/vueuse',component:()=>import('@/views/vueuse/index.vue')}
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router