import {createPinia} from 'pinia'
import type {App} from 'vue'

import {useAppStore} from './modules/useAppStore'

export const setupStore = (app: App) => {
    const pinia = createPinia()
    app.use(pinia)
}

export {useAppStore}