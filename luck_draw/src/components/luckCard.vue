<template>
  <div>
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="$t('luckCard.header.title')"
        :sub-title="$t('luckCard.header.subtitle')"
        @back="() => $router.push({name: 'home'})"
    >
      <template slot="extra">
        <a-button key="3" icon="sync" @click="handleRandomItem">
          {{ $t('luckCard.header.rr') }}
        </a-button>
        <a-button key="2" icon="minus-circle" @click="handleClearCache">
          {{ $t('luckCard.header.cc') }}
        </a-button>
        <a-button key="1" icon="setting" type="primary" @click="showDrawer">
          {{ $t('luckCard.header.st') }}
        </a-button>
      </template>
    </a-page-header>

    <a-drawer
        :title="$t('luckCard.listTitle')"
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

    <div class="card-module" v-show="!showEmpty">
      <div v-for="(item, index) of dataSource" :class="['img-box', {'active' : item.isShow}]" :key="index"
           @click="handleClick(index)" :data-id=index>
        <div class="back">
          <a class="back_title">{{ $t('luckCard.no') }}{{ ++index }}</a>
          <img class="img-item" :src="item.url || require('@/assets/img/luck-card/project_card_bg.png')"/>
        </div>
        <div class="front">
          <a class="title_item">{{ item.name }}</a>
          <a class="subtitle_item">{{ item.subtitle }}</a>

          <a-input-search
              class="remark_item"
              allowClear
              :placeholder="$t('luckCard.card.remark')"
              @search="onCommit(...arguments, item)"
          >
            <a-icon slot="prefix" type="user"/>
            <a-button slot="enterButton" :key="index" icon="check"></a-button>
          </a-input-search>

          <a class="id_item">*{{ item.key }}*</a>
          <img class="img-item" src="@/assets/img/luck-card/card_win_bg.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Button, PageHeader, Drawer, Input, Icon, Tooltip, Empty} from 'ant-design-vue'
import ItemList from './list/itemList'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'luckCard',
  components: {
    ItemList,
    [Empty.name]: Empty,
    [PageHeader.name]: PageHeader,
    [Button.name]: Button,
    [Drawer.name]: Drawer,
    [Input.name]: Input,
    [Input.Search.name]: Input.Search,
    [Icon.name]: Icon,
    [Tooltip.name]: Tooltip
  },
  data() {
    return {
      visible: false,
      winnerList: []
    }
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    handleClick(index) {
      this.updateIsShowByIndex({index: index-1, isShow: true})
    },
    onCommit(value, e, item) {
      typeof (e)
      let winItem = {winner: value, draw: item}
      this.winnerList.push(winItem)
      this.$message.success(this.$t('luckCard.card.winner'))
      console.log(this.winnerList)
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
          this.winnerList = []
        }
      })
    },
    ...mapMutations('luckCardM', ['randomItem', 'addItemAuto', 'delItemByKey', 'clearAll', 'updateSource', 'updateIsShowByIndex'])
  },
  computed: {
    showEmpty: {
      get() {
        return this.dataSource.length === 0 ? true : false
      }
    },
    ...mapState('luckCardM', ['dataSource'])
  },
  mounted() {
    this.randomItem()
  }
}
</script>

<style lang="scss" scope>

$cardHeight: 350px;

.card-module {
  margin: 2%;
  display: flex;
  flex-wrap: wrap;

  .img-box {
    flex-shrink: 0;
    width: 20%;
    height: $cardHeight;
    text-align: center;
    box-sizing: border-box;
    position: relative;

    .front {
      box-sizing: border-box;
      position: absolute;
      transform: rotateY(180deg);
      backface-visibility: hidden;
      transform-style: preserve-3d;
      border: 1px solid #e8e8e8;
      border-radius: 7px;

      .title_item {
        position: absolute;
        top: 35%;
        width: 100%;
        text-align: center;
        color: white;
        font-size: 27px;
        font-weight: bold;
      }

      .subtitle_item {
        position: absolute;
        top: 50%;
        width: 100%;
        text-align: center;
        color: whitesmoke;
        font-size: 15px;
      }

      .remark_item {
        position: absolute;
        top: 75%;
        left: 5%;
        width: 90%;
      }

      .id_item {
        position: absolute;
        bottom: 5px;
        right: 6%;
        width: 50%;
        text-align: right;
        background: none;
        color: orange;
        font-size: 10px;
      }

      .img-item {
        object-fit: cover;
      }
    }

    .back {
      background: none;
      box-sizing: border-box;
      position: absolute;
      transform: rotateY(0deg);
      backface-visibility: hidden;
      transform-style: preserve-3d;

      .img-item {
        object-fit: cover;
        border-radius: 7px;
      }

      .back_title {
        position: absolute;
        top: 15px;
        width: 100px;
        margin: 0 auto;
        text-align: center;
        color: #ff6c00;
        font-size: 20px;
        font-weight: bold;
      }
    }

    &.active {
      animation: mymove 0.5s forwards;
      -webkit-animation: mymove 0.5s forwards;

      .front {
        transform: rotateY(0deg);
        /*翻牌前加个抖动效果*/
        transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1);
      }

      .back {
        transform: rotateY(180deg);
        /*翻牌前加个抖动效果*/
        transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1);
      }
    }
  }
}
</style>
