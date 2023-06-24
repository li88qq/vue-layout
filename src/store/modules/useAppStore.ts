import {defineStore} from 'pinia'

interface State {
    theme: 'dark' | 'light',//主题
    colorPrimary: string,//主题色
}

export const useAppStore = defineStore('app', {
    state: (): State => ({
        theme: 'light',
        colorPrimary: '#1890ff'
    }),
    actions: {
        setColorPrimary(color: string) {
            this.colorPrimary = color;
        },
        setTheme(theme: 'dark' | 'light') {
            this.theme = theme;
        },
    }
})