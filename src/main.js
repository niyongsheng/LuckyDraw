import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "./lang/index";

import Antd, { message, Modal, notification } from 'ant-design-vue'
import AIcon from '@/components/icon/AIcon'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(i18n)
app.use(Antd)

// ant-design-vue 4 移除了 a-icon，注册一个兼容组件
app.component('a-icon', AIcon)

app.config.globalProperties.$message = message
app.config.globalProperties.$confirm = Modal.confirm
app.config.globalProperties.$notification = notification

app.mount('#app')

console.log("\n %c Luck Draw ", "color:#fff;background:#547FF9;padding:5px 0;border-radius: 7px;border: 1px solid #DEE9FC;")
