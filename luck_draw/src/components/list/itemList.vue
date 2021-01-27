<template>
  <div>
    <div class="btn_line_group">
      <div class="">
        <a-button class="editable-add-btn" icon="plus" @click="addItemAuto">
          {{ $t('list.ad') }}
        </a-button>
        <a-button type="danger" class="editable-add-btn" icon="close" @click="handleClear">
          {{ $t('list.cl') }}
        </a-button>
      </div>
      <div>
        <a-upload
            name="file"
            accept=".xlsx,.XLSX"
            :multiple="false"
            :before-upload="beforeUpload"
        >
          <a-button icon="cloud-upload" type="default" shape="circle"/>
        </a-upload>
        <xlsx-read :file="file">
          <xlsx-json>
            <template #default="{collection}">
              <div v-show="false">
                {{ uploadDataSource = collection }}
              </div>
            </template>
          </xlsx-json>
        </xlsx-read>
      </div>
    </div>

    <a-table
        :bordered="true"
        :data-source="dataSource"
        :columns="JSON.parse($t('list.col'))"
        :scroll="{ x: 'calc(900px + 50%)'}"
        v-if="!inResize"
    >
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>
      </template>
      <template slot="subtitle" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'subtitle', $event)"/>
      </template>
      <template slot="url" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'url', $event)"/>
      </template>
      <template slot="remark" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'remark', $event)"/>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
            v-if="dataSource.length"
            :title="$t('list.dela')"
            @confirm="() => delItemByKey(record.key)"
        >
          <a href="javascript:;">{{ $t('list.del') }}</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import EditableCell from "@/components/list/editableCell";
import {Button, Table, Popconfirm, Upload} from 'ant-design-vue'
import {XlsxRead, XlsxJson} from 'vue-xlsx'

import Vue from 'vue'

Vue.use(Table)
Vue.use(Button)

export default {
  name: 'item-list',
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    addItemAuto: {
      type: Function,
      default: null
    },
    delItemByKey: {
      type: Function,
      default: null
    },
    clearAll: {
      type: Function,
      default: null
    },
    updateSource: {
      type: Function,
      default: null
    }
  },
  components: {
    EditableCell,
    XlsxRead,
    XlsxJson,
    [Upload.name]: Upload
  },
  data() {
    return {
      inResize: false,
      file: null
    };
  },
  methods: {
    refresh() {
      // remark: force refresh dom, fixed row height
      this.inResize = true
      Vue.nextTick(t => {
        typeof (t)
        this.inResize = false
      })
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    handleClear() {
      this.$confirm({
        title: this.$t('list.clTitle'),
        content: this.$t('list.content'),
        okText: this.$t('list.okText'),
        okType: 'danger',
        cancelText: this.$t('list.cancelText'),
        onOk: () => {
          this.clearAll()
        },
        onCancel() {
          console.log('Cancel')
        },
      })
    },
    beforeUpload(file) {
      this.file = file
      return false;
    }
  },
  created() {
    this.refresh()
  },
  mounted() {
  },
  computed: {
    uploadDataSource: {
      get() {
        return this.dataSource
      },
      set(newValue) {
        if (newValue) {
          this.updateSource(newValue)
        }
      }
    }
  },
  watch: {}
};

Vue.use(Popconfirm)
</script>

<style>

.btn_line_group {
  display: flex;
  justify-content: space-between;
}

.editable-add-btn {
  margin-right: 10px;
  margin-bottom: 20px;
}

</style>
