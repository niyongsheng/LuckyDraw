<!-- ant-design-vue 4 移除了 a-icon，这里用 @ant-design/icons-vue 做一个兼容组件 -->
<script>
import { h } from 'vue'
import {
  GithubOutlined,
  WeiboOutlined,
  SmileOutlined,
  UserOutlined,
  CheckOutlined,
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  SyncOutlined,
  MinusCircleOutlined,
  SettingOutlined,
  DashboardOutlined,
  ArrowLeftOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue'

const ICON_MAP = {
  github: GithubOutlined,
  weibo: WeiboOutlined,
  smile: SmileOutlined,
  user: UserOutlined,
  check: CheckOutlined,
  edit: EditOutlined,
  plus: PlusOutlined,
  close: CloseOutlined,
  'cloud-download': CloudDownloadOutlined,
  'cloud-upload': CloudUploadOutlined,
  sync: SyncOutlined,
  'minus-circle': MinusCircleOutlined,
  setting: SettingOutlined,
  dashboard: DashboardOutlined,
  'arrow-left': ArrowLeftOutlined
}

export default {
  name: 'AIcon',
  props: {
    type: {
      type: String,
      default: ''
    },
    style: {
      type: [Object, String],
      default: null
    }
  },
  render () {
    const IconComp = ICON_MAP[this.type] || QuestionCircleOutlined
    return h(IconComp, { style: this.style })
  }
}
</script>
