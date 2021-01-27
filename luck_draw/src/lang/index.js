import Vue from 'vue'
import VueI18n from 'vue-i18n'
import antdEnLocale from 'ant-design-vue/lib/locale/en_US'
import antdZhLocale from 'ant-design-vue/lib/locale/zh_CN'
import enLocale from './en_us'
import zhLocale from './zh_cn'
Vue.use(VueI18n)
const messages = {
  en_us:{
    ...enLocale,
    ...antdEnLocale
  },
  zh_cn:{
    ...zhLocale,
    ...antdZhLocale
  }
}

const i18n = new VueI18n({
  locale: 'en_us',
  messages
})

export default i18n
