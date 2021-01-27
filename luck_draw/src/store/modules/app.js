export default {
    namespaced: true,
    state: {
        navTitle: 'Title',
        navShowBack: false
    },
    mutations: {},

    actions: {},

    getters: {
        getNavTitle(state) {
            return state.navTitle
        },
        getNavShowBack(state) {
            return state.navShowBack
        }
    }
}
