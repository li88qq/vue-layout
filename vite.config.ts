import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from 'path'

export default defineConfig(()=>{
    return {
        plugins:[vue()],
        server:{
            host:true,
        },
        resolve:{
            alias:{
                '@':join(__dirname,'./src')
            }
        }
    }
})