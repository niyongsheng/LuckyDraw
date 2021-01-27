<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <div :key="locale ? locale.locale : 'en'">
        <router-view></router-view>
        <a-back-top/>
      </div>
    </a-config-provider>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const {mapState} = createNamespacedHelpers('appM')

import zh_CN from 'ant-design-vue/es/locale-provider/zh_CN'
import en_US from 'ant-design-vue/es/locale-provider/en_US'

import {ConfigProvider, BackTop} from 'ant-design-vue'
import EventBus from '@/assets/js/eventBus'

import moment from 'moment'

export default {
  name: 'App',
  components: {
    [ConfigProvider.name]: ConfigProvider,
    [BackTop.name]: BackTop
  },
  data() {
    return {
      zh_CN,
      en_US,
      locale: en_US
    };
  },
  methods: {
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state.profiles))
    },
    changeLanguage(e) {
      const localeValue = e.target.value
      if (localeValue.locale == 'en') {
        this.$i18n.locale = 'en_us'
        moment.locale('en')
      } else {
        this.$i18n.locale = 'zh_cn'
        moment.locale('zh-cn')
      }
    }
  },
  mounted() {
    // window.addEventListener('unload', this.saveState)

    EventBus.$on('changeLanguage', e => {
      this.changeLanguage(e)
    })
  },
  computed: {
    ...mapState(['navTitle', 'navShowBack'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
