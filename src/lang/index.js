import { createI18n } from 'vue-i18n'
import antdEnLocale from 'ant-design-vue/es/locale/en_US'
import antdZhLocale from 'ant-design-vue/es/locale/zh_CN'
import enLocale from './en_us'
import zhLocale from './zh_cn'

const messages = {
  en_us: {
    ...enLocale,
    ...antdEnLocale
  },
  zh_cn: {
    ...zhLocale,
    ...antdZhLocale
  }
}

const i18n = createI18n({
  locale: 'en_us',
  messages
})

export default i18n
