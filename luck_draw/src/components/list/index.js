import itemList from './itemList'

const ItemList = {
    install: function (Vue) {
        Vue.component(itemList.name, itemList)
    }
}
export default ItemList
