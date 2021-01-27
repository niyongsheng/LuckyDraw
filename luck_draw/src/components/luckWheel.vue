<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="$t('luckWheel.header.title')"
        :sub-title="$t('luckWheel.header.subtitle')"
        @back="() => $router.push({name: 'home'})"
    >
      <template slot="extra">
        <a-button key="3" icon="sync" @click="handleRandomItem">
          {{ $t('luckWheel.header.rr') }}
        </a-button>
        <a-button key="2" icon="minus-circle" @click="handleClearCache">
          {{ $t('luckWheel.header.cc') }}
        </a-button>
        <a-button key="1" icon="setting" type="primary" @click="showDrawer">
          {{ $t('luckWheel.header.st') }}
        </a-button>
      </template>
    </a-page-header>

    <a-drawer
        :title="$t('luckWheel.listTitle')"
        placement="right"
        :closable="false"
        :visible="visible"
        width="50%"
        @close="onClose"
    >
      <item-list
          :data-source="dataSource"
          :add-item-auto="addItemAuto"
          :del-item-by-key="delItemByKey"
          :clear-all="clearAll"
          :update-source="updateSource"
          ref="ilst"
      ></item-list>
    </a-drawer>

    <a-empty v-show="showEmpty"/>
    <div id="wheel" :hidden="showEmpty">
      <div class="big-wheel-box">
        <wheel
            width="35rem"
            height="35rem"
            ref="childWheel"
            :prizeList="dataSource"
            @over="openNotification">
          <template v-slot:item="{ item }">
            <div class="prize-name">{{item.name}}</div>
            <img class="prize-img" :src="item.url ? item.url : require('@/assets/img/lucky-whell/bean_one.png')" style="border-radius: 5px">
          </template>
        </wheel>

        <img class="btn-go" @click="go" :src="require('@/assets/img/lucky-whell/go.png')" />
      </div>
    </div>
  </div>
</template>

<script>
import {Button, PageHeader, Drawer, Input, Icon, Tooltip, Empty} from 'ant-design-vue'
import Wheel from '@/components/wheel'
import ItemList from './list/itemList'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'LuckWheel',
  components: {
    ItemList,
    Wheel,
    [Empty.name]: Empty,
    [PageHeader.name]: PageHeader,
    [Button.name]: Button,
    [Drawer.name]: Drawer,
    [Input.name]: Input,
    [Icon.name]: Icon,
    [Tooltip.name]: Tooltip
  },
  data() {
    return {
      visible: false,
      isRunning: false
    }
  },
  methods: {
    // 开始转动
    go() {
      if (this.isRunning) {
        return
      } else {
        this.isRunning = true
      }
      // 模拟随机数
      const index = Math.floor(Math.random() * this.dataSource.length)
      // 转动转盘
      this.$refs.childWheel.rotate(index)
    },
    // 转盘转完事件
    openNotification(prizeInfo) {
      this.isRunning = false
      this.$notification.config({
        placement: 'topLeft',
        top: '120px'
      })
      this.$notification.open({
        duration: null,
        message: prizeInfo.name,
        description: prizeInfo.subtitle,
        icon: <a-icon type="smile" style="color: #108ee9"/>,
      });
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    handleRandomItem() {
      this.randomItem()
    },
    handleClearCache() {
      this.$confirm({
        title: this.$t('list.clCache'),
        content: this.$t('list.content'),
        okText: this.$t('list.okText'),
        okType: 'danger',
        cancelText: this.$t('list.cancelText'),
        onOk: () => {

        }
      })
    },
    ...mapMutations('luckWheelM', ['randomItem', 'addItemAuto', 'delItemByKey', 'clearAll', 'updateSource'])
  },
  computed: {
    showEmpty: {
      get() {
        return this.dataSource.length === 0 ? true : false
      }
    },
    ...mapState('luckWheelM', ['dataSource'])
  },
  watch: {
    dataSource: {
      deep: true,
      immediate: true,
      handler: function () {
        this.$nextTick(() => {
          this.$refs.childWheel.initData()
        })
      }
    }
  },
  beforeDestroy() {
    this.$notification.destroy()
  }
}
</script>

<style lang="scss" scope>

#wheel {
  position: relative;
  overflow: hidden;
  width: 100vw;
  min-height: 200vh;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%;
  .big-wheel-box {
    position: absolute;
    top: 1.7rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0;
    background-image: url('~@/assets/img/lucky-whell/disk_bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    padding: 3.5rem;
    .prize-name {
      position: relative;
      //display: block;
      left: .13rem;
      right: .13rem;
      top: 2rem;
      //width: 0.1rem;
      //word-wrap:break-word;
      //word-break:normal;
      font-size: 1rem;
      font-weight: bolder;
      text-align: center;
      color: orange;
    }
    .prize-img {
      position: absolute;
      top: 5rem;
      left: 50%;
      transform: translateX(-50%);
      max-width: 5rem;
      max-height: 5rem;
    }
    .btn-go {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translateX(-50%);
      width: 20%;
    }
  }
}

</style>
