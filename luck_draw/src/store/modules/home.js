export default {
    namespaced: true,
    state: {
        github: 'https://github.com/niyongsheng/LuckyDraw',
        sina: 'https://weibo.com/u/7317805089?is_all=1',
        email: 'mailto:niyongsheng@outlook.com',
        sheets: [{
            name: "Data Source",
            data: [
                { key: 1, name: '特等奖', subtitle: 'SpaceX spark mars ticket', url: 'https://www.hualigs.cn/image/6010d3204e0ae.jpg', isShow: false, remark: 'image upload:https://www.hualigs.cn' },
                { key: 2, name: '一等奖', subtitle: 'Tesla S', url: 'https://www.hualigs.cn/image/6010d3204f387.jpg', isShow: false, remark: '' },
                { key: 3, name: '二等奖', subtitle: 'Apple glass', url: 'https://www.hualigs.cn/image/6010d3204e092.jpg', isShow: false, remark: '' },
                { key: 4, name: '三等奖', subtitle: 'Xbox one', url: 'https://www.hualigs.cn/image/6010d3204f387.jpg', isShow: false, remark: '' },
                { key: 5, name: '抽了个寂寞', subtitle: '', url: '', isShow: false, remark: 'O(∩_∩)O' },
                { key: 6, name: '再来一次', subtitle: '', url: '', isShow: false, remark: '' },
                { key: 7, name: '鼓励奖', subtitle: '费曼物理学讲义', url: '', isShow: false, remark: '^^' }
                ]
        }]
    },

    mutations: {},

    actions: {},

    getters: {}
}
