<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :backIcon="false"
        title="LUCK DRAW"
        @back="() => $router.go(-1)"
    >
      <template #extra>
        <a-radio-group :default-value="locale" @change="changeLocale">
          <a-radio-button key="en" :value="en_US">
            English
          </a-radio-button>
          <a-radio-button key="zh-cn" :value="zh_CN">
            中文
          </a-radio-button>
        </a-radio-group>
      </template>
    </a-page-header>

    <img class="icon_i" src="@/assets/logo.png"/>
    <h1>{{ $t('home.msg') }}</h1>
    <p>{{ $t('home.wisdom') }}</p>
    <br/>
    <a :href="github" target="_parent" rel="noopener">
      <a-icon type="github"/>
      GitHub
    </a>
    <br/>
    <a-button
        type="default"
        style="margin: 10px auto"
        shape="round"
        @click="downloadTemplate"
    >
      <template #icon><a-icon type="cloud-download"/></template>
      {{ $t('home.downTem') }}
    </a-button>

    <div class="btn_line_group">
      <router-link to='luckCard'>
        <a-button class="btn_custom warn_btn" type="">{{ $t('home.lc') }}</a-button>
      </router-link>
      <router-link to='luckWheel'>
        <a-button class="btn_custom" type="danger">{{ $t('home.lw') }}</a-button>
      </router-link>
      <router-link to='luckCloud'>
        <a-button class="btn_custom" type="primary">{{ $t('home.lcl') }}</a-button>
      </router-link>
      <router-link to='luckStar'>
        <a-button class="btn_custom btn_custom_g">{{ $t('home.ls') }}</a-button>
      </router-link>
    </div>
    <br/>
    <h3>{{ $t('home.am') }}</h3>
    <br>
    <ul>
      <li>
        <a-popover :title="$t('home.dev')" trigger="click">
          <template #content>
            <a :href="sina" target="_blank">
              {{ $t('home.sin') }}
              <a-icon type="weibo"/>
              Ni永胜
            </a>
            <br/>
            <a :href="email">{{ $t('home.eml') }}niyongsheng@outlook.com</a>
          </template>
          <a>📩 {{ $t('home.co') }}</a>
        </a-popover>
      </li>
      <li></li>
      <li>
        <a-popover :title="$t('home.pay')" trigger="click" placement="right">
          <template #content>
            <div style="display: flex;">
              <div @click="toReward($store.state.profiles.aliPayUrl)">
                <vue-qr
                    class="qr_code_a"
                    :text="$store.state.profiles.aliPayUrl"
                    :size="100"
                    :logoSrc="alipayImg"
                >
                </vue-qr>
              </div>
              <div @click="toReward($store.state.profiles.wechatPayUrl)">
                <vue-qr
                    class="qr_code_w"
                    :text="$store.state.profiles.wechatPayUrl"
                    :size="100"
                    :logoSrc="wechatImg"
                >
                </vue-qr>
              </div>
            </div>
          </template>
          <a>🍭 {{ $t('home.sup') }}</a>
        </a-popover>
      </li>
    </ul>
    <br/>
    <a-divider orientation="center" class="bottom_line">
      <p style="color: lightgray; font-size: 10px; margin-top: 10px">© {{ date.getFullYear() }} NYS, All Rights
        Reserved.</p>
    </a-divider>
  </div>
</template>

<script>
import vueQr from "vue-qr";
import * as XLSX from 'xlsx'
import EventBus from '@/assets/js/eventBus'
import {mapState} from 'vuex'

import alipayImg from '@/assets/img/pay/alipay.png'
import wechatImg from '@/assets/img/pay/wechatpay.png'

import zh_CN from "ant-design-vue/es/locale/zh_CN"
import en_US from "ant-design-vue/es/locale/en_US"

export default {
  name: 'Home',
  components: {
    vueQr
  },
  data() {
    return {
      zh_CN,
      en_US,
      locale: en_US,
      alipayImg,
      wechatImg,
      date: new Date()
    }
  },
  methods: {
    changeLocale(e) {
      const localeValue = e.target.value
      this.locale = localeValue.locale == 'en' ? this.en_US : this.zh_CN

      EventBus.emit('changeLanguage', e)
    },
    toReward(payUrl) {
      if (payUrl == this.$store.state.profiles.wechatPayUrl) {
        this.$message.info(this.$t('home.wechatPayTip'))
      } else {
        window.location.href = payUrl
      }
    },
    downloadTemplate() {
      const workbook = XLSX.utils.book_new()
      this.sheets.forEach(sheet => {
        const worksheet = XLSX.utils.json_to_sheet(sheet.data)
        XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name)
      })
      XLSX.writeFile(workbook, 'luck_draw.xlsx')
    }
  },
  computed: {
    ...mapState('homeM', ['sheets', 'github', 'sina', "email"])
  },
}
</script>

<style scoped>

.btn_line_group {
  justify-content: center;
}

.btn_custom {
  margin: 10px 10px;
}

.btn_custom_g {
  color: white;
  background: #52C41A;
  border: none;
}

.warn_btn {
  color: #fff;
  background: #EDB335;
  border-color: #EDB335;
}

.icon_i {
  width: 20%;
  height: 20%;
  margin: 20px auto;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.qr_code_a {
  color: #4A95E2;
}

.qr_code_w {
  color: #54A037;
}

.bottom_line {
  /*float: bottom;*/
  /*margin-bottom: 20px;*/
}

</style>
