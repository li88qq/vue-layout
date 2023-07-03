import {defineStore} from 'pinia'

interface State {
    theme: 'dark' | 'light',//主题
    colorPrimary: string,//主题色
    gray: boolean,//灰色模式
    invert:boolean,//色弱模式
}

export const useAppStore = defineStore('app', {
    state: (): State => ({
        theme: 'light',
        colorPrimary: '#1890ff',
        gray:false,
        invert:false,
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