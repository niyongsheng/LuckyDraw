<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="$t('luckCloud.header.title')"
        :sub-title="$t('luckCloud.header.subtitle')"
        @back="() => $router.push({name: 'home'})"
    >
      <template slot="extra">
        <a-tooltip placement="topLeft" :title="$t('luckCloud.switchTips')">
          <a-switch
              class="action_s"
              :checked-children="$t('luckCloud.allow')"
              :un-checked-children="$t('luckCloud.ban')"
              default-checked
              @click="onClick"
          />
        </a-tooltip>
        <a-input-number
            class="action_i"
            :min="1"
            :max="maxWinnerCount"
            :step="1"
            :disabled="isActive || isRunning"
            @change="onChange"
            :placeholder="$t('luckCloud.placeholder')"
        />
        <a-button key="3" icon="sync" @click="handleRandomItem">
          {{ $t('luckCloud.header.rr') }}
        </a-button>
        <a-button key="2" icon="minus-circle" @click="handleClearCache">
          {{ $t('luckCloud.header.cc') }}
        </a-button>
        <a-button key="1" icon="setting" type="primary" @click="showDrawer">
          {{ $t('luckCloud.header.st') }}
        </a-button>
      </template>
    </a-page-header>

    <a-drawer
        :title="$t('luckCloud.listTitle')"
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

    <div v-show="showResult" class="result_alert">
      <a-result
          status="success"
          :title="$t('luckCloud.selectedTitle')"
          :sub-title="$t('luckCloud.selectedSubtitle')"
          @click="showResult = false"
      >
        <div v-for="(item, index) in this.currentWinnerArr" :key="index" class="desc">
          <p :style="{ textAlign: 'center' }">
            <a-icon :style="{ color: 'red', marginRight: '10px' }" type="smile"/>
            <a :href="item.url || null">{{ item.name }}</a>
          </p>
        </div>
      </a-result>
    </div>

    <a-empty v-show="showEmpty"/>
    <div v-show="!showEmpty">
      <div id="cloud_main" :class="{ mask: showResult }" @click="showResult = false"></div>
      <div>
        <div id="tags">
          <ul v-for="(item, index) in dataSource" :key="index">
            <li>
              <img v-if="item.url.length > 10" :src="item.url" :width="50" :height="50" style="border-radius: 5px"/>
              <a href="javascript:void(0);" :style="nameStyle">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="action_group">
        <a-button
            class="action_b"
            type="primary"
            shape="round"
            size="large"
            :loading="isRunning"
            :disabled="isActive"
            @click="go()"
        >
          {{ $t('luckCloud.go') }}
        </a-button>
        <a-button
            icon="dashboard"
            type=""
            shape="round"
            size="large"
            :class="{action_b: true, active: isActive, normal: !isActive}"
            :disabled="isRunning"
            @click="start"
        >
          {{ isActive ? $t('luckCloud.stop') : $t('luckCloud.start') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Button, PageHeader, Drawer, Input, Icon, Tooltip, InputNumber, Result, Switch, Empty} from 'ant-design-vue'
import ItemList from './list/itemList'
import '@/assets/js/tagcanvas.js'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'LuckCloud',
  components: {
    ItemList,
    [Empty.name]: Empty,
    [PageHeader.name]: PageHeader,
    [Button.name]: Button,
    [Drawer.name]: Drawer,
    [Input.name]: Input,
    [Icon.name]: Icon,
    [Tooltip.name]: Tooltip,
    [InputNumber.name]: InputNumber,
    [Result.name]: Result,
    [Switch.name]: Switch
  },
  data() {
    return {
      visible: false,
      showResult: false,
      isRunning: false,
      isActive: false,
      allowRepeat: false,
      winnerCount: 1,
      nameStyle: {color: '#1890FF', fontSize: '15px'},
      normalSpeed: [0.1, 0.1],
      runSpeed: [2, 1],
      historyWinnerArr: [],
      currentWinnerArr: []
    }
  },
  methods: {
    go() {
      this.isRunning = true
      this.showResult = false
      window.TagCanvas.SetSpeed('my_canvas', this.runSpeed)

      setTimeout(() => {
        this.onDraw()
      }, 2000 * (this.winnerCount < 3 || 3))
    },
    start() {
      this.isActive = !this.isActive
      this.showResult = false
      window.TagCanvas.SetSpeed('my_canvas', this.runSpeed)

      let interval = setInterval(() => {
        if (!this.isActive) {
          clearInterval(interval)
          this.onDraw()
          return
        }
      }, 77)
    },
    onDraw() {
      this.currentWinnerArr = []
      const tempArr = [...this.dataSource]
      for (let j = 0; j < this.winnerCount; j++) {
        let draws = tempArr
        // 剔除历史元素
        if (!this.allowRepeat) {
          draws = tempArr.filter(item => !this.historyWinnerArr.includes(item))
          draws = draws.filter(item => !this.currentWinnerArr.includes(item))
        }
        const index = parseInt(Math.random() * draws.length + 1, 10)
        const winner = draws[index - 1]
        this.currentWinnerArr.push(winner)
        this.historyWinnerArr.push(winner)
      }
      this.showResult = true
      this.isRunning = false
      window.TagCanvas.SetSpeed('my_canvas', this.normalSpeed)
    },
    onClick(checked) {
      this.allowRepeat = checked
    },
    onChange(value) {
      this.winnerCount = value
    },
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    handleRandomItem() {
      this.randomItem()
      window.TagCanvas.Reload('my_canvas')
      this.showResult = false
    },
    handleClearCache() {
      this.$confirm({
        title: this.$t('list.clCache'),
        content: this.$t('list.content'),
        okText: this.$t('list.okText'),
        okType: 'danger',
        cancelText: this.$t('list.cancelText'),
        onOk: () => {
          this.historyWinnerArr = []
          this.showResult = false
        }
      })
    },
    createCanvas() {
      const canvas = document.createElement('canvas')
      canvas.width = document.body.offsetWidth
      canvas.height = document.body.offsetHeight
      canvas.id = 'my_canvas'
      this.$el.querySelector('#cloud_main').appendChild(canvas)
    },
    setTagCanvas() {
      this.createCanvas()
      window.TagCanvas.Start('my_canvas', 'tags', {
        textColour: null,
        initial: this.normalSpeed,
        dragControl: 1,
        textHeight: 20,
        noSelect: true,
        lock: 'xy'
      })
    },
    ...mapMutations('luckCloudM', ['randomItem', 'addItemAuto', 'delItemByKey', 'clearAll', 'updateSource'])
  },
  mounted() {
    this.setTagCanvas()
  },
  computed: {
    maxWinnerCount: {
      get() {
        return Math.floor(this.dataSource.length / 2)
      }
    },
    showEmpty: {
      get() {
        return this.dataSource.length === 0 ? true : false
      }
    },
    ...mapState('luckCloudM', ['dataSource'])
  },
  watch: {
    dataSource: {
      deep: true,
      immediate: true,
      handler: function (newValue) {
        this.$nextTick(() => {
          window.TagCanvas.Reload('my_canvas')
          if (newValue.length === 0) {
            this.showResult = false
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scope>

.mask {
  -webkit-filter: blur(5px);
  filter: blur(5px);
}

#cloud_main {
  width: 100%;
  height: 100%;
}

.action_s {
  background: #FF4D4F;
  margin-right: 10px;
}

.action_i {
  width: 100px;
}

.action_group {
  position: absolute;
  right: 10px;
  top: 40%;
  width: 120px;
  height: 30%;

  display: flex;
  flex-wrap: wrap;
  justfiy-content: center;
  align-items: center;

  .action_b {
    width: 90%;
  }

  .active {
    color: white;
    background: #FF4D4F;
    border-color: lightgray;
  }

  .normal {
    color: #696969;
    background: white;
    border-color: lightgray;
  }
}

.result_alert {
  position: absolute;
  top: 25%;
  left: 20%;
  width: 60%;
  z-index: 10;
}

</style>
