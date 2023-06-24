import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'

const LAYOUT = () => import('@/layouts/default/index.vue')

const routes: RouteRecordRaw[] = [
    {path: '/', component: LAYOUT}
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router