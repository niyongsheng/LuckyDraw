import UUID from "@/assets/js/uuid";

const state = {
  dataSource: [
    {
      key: 'LD00',
      name: '特等奖',
      subtitle: 'Spark ticket',
      remark: 'reserve',
      url: '',
      isShow: false
    },
    {
      key: 'LD01',
      name: '一等奖',
      subtitle: 'Model x',
      remark: '',
      url: '',
      isShow: false
    },
    {
      key: 'LD02',
      name: '二等奖',
      subtitle: 'Model s',
      remark: 'Rose Wang',
      url: '',
      isShow: false
    },
    {
      key: 'LD03',
      name: '三等奖',
      subtitle: 'Model y',
      remark: '',
      url: '',
      isShow: false
    },
    {
      key: 'LD04',
      name: '再来一次',
      subtitle: '',
      remark: '',
      url: '',
      isShow: false
    },
    {
      key: 'LD05',
      name: '抽了个寂寞',
      subtitle: '',
      remark: 'O(∩_∩)O哈哈~',
      url: '',
      isShow: false
    },
  ],
}

const mutations = {

  addItemAuto(state) {
    const uuid = UUID.uuid(4, 26)
    const newData = {
      key: uuid,
      name: 'title_' + uuid,
      subtitle: 'subtitle',
      remark: '',
      url: '',
      isShow: false
    }
    state.dataSource.unshift(newData)
  },

  addItem(state, item) {
    state.dataSource.unshift(item)
  },

  delItemByIndex(state, index) {
    state.dataSource.splice(index, 1)
  },

  updateSource(state, dataSource) {
    state.dataSource = dataSource
  },

  updateByItem(state, item) {
    state.dataSource.forEach((_item) => {
      if (_item.key == item.key) {
        _item = item
      }
    })
  },

  updateItemByIndex(state, item, index) {
    state.dataSource[index] = item
  },

  updateRemarkByIndex(state, remark, index) {
    state.dataSource[index].remark = remark
  },

  delItemByKey(state, key) {
    const dataSource = [...state.dataSource];
    state.dataSource = dataSource.filter(item => item.key !== key)
  },

  randomItem(state) {
    var length = state.dataSource.length
    var arr1 = new Array();
    for (let i = 0; i < length; i++) {
      arr1[i] = i;
    }
    // 建立数组下标数组
    var arr2 = new Array()
    for (let i = 0; i < length; i++) {
      arr2[i] = arr1.splice(Math.floor(Math.random() * arr1.length), 1)
    }
    // 将数组下标随机打乱
    var arr3 = new Array()
    for (let i = 0; i < length; i++) {
      arr3[i] = state.dataSource[arr2[i]]
    }
    // 将数组按打乱后的下标输出
    state.dataSource = arr3;
  },

  clearAll(state) {
    state.dataSource = []
  }
}

const actions = {

}

const getters = {
  getDataSource(state) {
    return state.dataSource
  }
}

const computed = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  computed
}
