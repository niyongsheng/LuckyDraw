<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="$t('luckStar.header.title')"
        :sub-title="$t('luckStar.header.subtitle')"
        @back="() => $router.push({name: 'home'})"
    >
      <template slot="extra">
        <a-button key="3" icon="sync" @click="handleRandomItem">
          {{ $t('luckStar.header.rr') }}
        </a-button>
        <a-button key="2" icon="minus-circle" @click="handleClearCache">
          {{ $t('luckStar.header.cc') }}
        </a-button>
        <a-button key="1" icon="setting" type="primary" @click="showDrawer">
          {{ $t('luckStar.header.st') }}
        </a-button>
      </template>
    </a-page-header>

    <a-drawer
        :title="$t('luckStar.listTitle')"
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
    <a-alert
        :message="$t('luckStar.message')"
        :description="$t('luckStar.description')"
        type="info"
        show-icon
        closable
        @close="isShowAlert = false"
        v-show="isShowAlert"
    />
    <div v-show="!showEmpty">
      <div class="content">
        <img :src="randomMember.url || require('@/assets/logo.png')" style="border-radius: 5px">
        <h2>{{ randomMember.name || $t('luckStar.emptyTip') }}</h2>
      </div>
      <div class="action">
        <a-button
            type="primary"
            shape="round"
            size="large"
            style="background: #52C41A; border-color: lightgray"
            :loading="isRunning"
            :disabled="isActive"
            @click="go(false)"
        >
          {{ $t('luckStar.go') }}
        </a-button>
        <br/>
        <a-button
            icon="dashboard"
            type=""
            shape="round"
            size="large"
            v-bind:class="{active: isActive, normal: !isActive}"
            :disabled="isRunning"
            @click="start"
        >
          {{ isActive ? $t('luckStar.stop') : $t('luckStar.start') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Button, PageHeader, Drawer, Input, Icon, Tooltip, Empty, Alert} from 'ant-design-vue'
import ItemList from './list/itemList'
import {mapState, mapMutations} from 'vuex'

export default {
  name: "LuckStar",
  components: {
    ItemList,
    [Empty.name]: Empty,
    [PageHeader.name]: PageHeader,
    [Button.name]: Button,
    [Drawer.name]: Drawer,
    [Input.name]: Input,
    [Icon.name]: Icon,
    [Tooltip.name]: Tooltip,
    [Alert.name]: Alert
  },
  data() {
    return {
      isShowAlert: false,
      isRunning: false,
      visible: false,
      isActive: false,
      luckMember: [],
      randomMember: {}
    }
  },
  methods: {
    start() {
      this.isActive = !this.isActive
      if (this.isActive) {
        this.go(true)
      }
    },
    go(isBreak) {
      let lenght = this.dataSource.length
      if (lenght === 0) {
        this.$message.error(this.$t('luckStar.noMore0'))
        this.visible = true
        this.randomMember = {}
        return
      } else if (lenght == 1) {
        this.$message.warning(this.$t('luckStar.noMore1'))
        this.visible = true
        return
      } else if (lenght == 2) {
        this.isShowAlert = true
      }
      let count = 0
      let interval = setInterval(() => {
        count++
        let random = this.random()
        let member = this.dataSource[random]
        this.randomMember = member
        if (isBreak) {
          if (!this.isActive) {
            clearInterval(interval)
            this.isRunning = false
            // this.dataSource.splice(random, 1)
            this.delItemByIndex(random)
            this.luckMember.push(member)
            this.openNotification(member)
            return
          }
        } else {
          this.isRunning = true
          if (count >= lenght * 4) {
            clearInterval(interval)
            this.isRunning = false
            // this.dataSource.splice(random, 1)
            this.delItemByIndex(random)
            this.luckMember.push(member)
            this.openNotification(member)
            return
          }
        }
      }, 77)
    },
    random() {
      let min = 0
      let max = this.dataSource.length - 1
      return min + Math.round(Math.random() * max)
    },
    openNotification(member) {
      this.$notification.config({
        placement: 'topLeft',
        top: '120px'
      })
      this.$notification.open({
        duration: null,
        message: member.name,
        description: member.subtitle,
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
      this.luckMember = []
      this.randomMember = {}
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
    ...mapMutations('luckStarM', ['randomItem', 'addItemAuto', 'delItemByKey', 'clearAll', 'updateSource', 'delItemByIndex'])
  },
  computed: {
    showEmpty: {
      get() {
        return this.dataSource.length === 0 ? true : false
      }
    },
    ...mapState('luckStarM', ['dataSource'])
  },
  beforeDestroy() {
    this.$notification.destroy()
  }
}
</script>

<style lang="scss" scoped>

.content {
  top: 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;

  img {
    width: 50px;
    height: 50px;
    margin: 0 10px;
  }

  h2 {
    color: #A7AFBA;
    font-size: 22px;
    padding-top: 20px;
  }
}

.active {
  width: 100px;
  color: white;
  margin-top: 20px;
  background: #FF4D4F;
  border-color: lightgray;
}

.normal {
  width: 100px;
  color: #696969;
  margin-top: 20px;
  background: white;
  border-color: lightgray;
}

.action {
  .van-button + .van-button {
    margin-top: 10px;
  }
}

</style>
