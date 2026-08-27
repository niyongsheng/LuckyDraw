<template>
  <div>
    <div class="btn_line_group">
      <div class="">
        <a-button class="editable-add-btn" @click="addItemAuto">
          <template #icon><a-icon type="plus"/></template>
          {{ $t('list.ad') }}
        </a-button>
        <a-button type="danger" class="editable-add-btn" @click="handleClear">
          <template #icon><a-icon type="close"/></template>
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
          <a-button type="default" shape="circle">
            <template #icon><a-icon type="cloud-upload"/></template>
          </a-button>
        </a-upload>
      </div>
    </div>

    <a-table
        :bordered="true"
        :data-source="dataSource"
        :columns="columns"
        :scroll="{ x: 'calc(900px + 50%)'}"
        v-if="!inResize"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <editable-cell :text="record.name" @change="onCellChange(record.key, 'name', $event)"/>
        </template>
        <template v-else-if="column.dataIndex === 'subtitle'">
          <editable-cell :text="record.subtitle" @change="onCellChange(record.key, 'subtitle', $event)"/>
        </template>
        <template v-else-if="column.dataIndex === 'url'">
          <editable-cell :text="record.url" @change="onCellChange(record.key, 'url', $event)"/>
        </template>
        <template v-else-if="column.dataIndex === 'remark'">
          <editable-cell :text="record.remark" @change="onCellChange(record.key, 'remark', $event)"/>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-popconfirm
              v-if="dataSource.length"
              :title="$t('list.dela')"
              @confirm="() => delItemByKey(record.key)"
          >
            <a href="javascript:;">{{ $t('list.del') }}</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { nextTick } from 'vue'
import * as XLSX from 'xlsx'
import EditableCell from "@/components/list/editableCell";

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
    EditableCell
  },
  data() {
    return {
      inResize: false
    };
  },
  methods: {
    refresh() {
      // remark: force refresh dom, fixed row height
      this.inResize = true
      nextTick(() => {
        this.inResize = false
      })
    },
    onCellChange(key, dataIndex, value) {
      const target = this.dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
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
      const reader = new FileReader()
      reader.onload = e => {
        const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json(firstSheet, { defval: '' })
        const items = rows.map((row, index) => ({
          key: String(index + 1),
          name: row.name || row.title || row['名称'] || '',
          subtitle: row.subtitle || row['副标题'] || '',
          url: row.url || row['图片链接'] || '',
          remark: row.remark || row['备注'] || '',
          isShow: false
        }))
        this.updateSource(items)
      }
      reader.readAsArrayBuffer(file)
      return false;
    }
  },
  created() {
    this.refresh()
  },
  computed: {
    columns() {
      return JSON.parse(this.$t('list.col'))
    }
  }
};
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
