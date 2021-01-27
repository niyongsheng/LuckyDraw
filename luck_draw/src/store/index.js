import Vue from 'vue'
import Vuex from 'vuex'

import appM from './modules/app'
import homeModule from './modules/home'
import luckCardModule from './modules/luckCard'
import luckWheelModule from './modules/luckWheel'
import luckCloudModule from './modules/luckCloud'
import luckStarModule from './modules/luckStar'
// import moudule from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // 必须通过mutation更新状态，保证所有的状态变更都能被调试工具追踪
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    token: '',
    profiles: {
      aliPayUrl: 'HTTPS://QR.ALIPAY.COM/FKX015782HHDZBGCD48P8E',
      wechatPayUrl: 'wxp://f2f0ii5k6_-0jhGpfMV-bHZndnLPMOZCd7lo'
    }
  },
  mutations: {},
  actions: {},
  getters: {},
  // vuex模块化
  modules: {
    appM,
    homeM: homeModule,
    luckCardM: luckCardModule,
    luckWheelM: luckWheelModule,
    luckCloudM: luckCloudModule,
    luckStarM: luckStarModule
    // homeM: require('./modules/home')
  }
})
