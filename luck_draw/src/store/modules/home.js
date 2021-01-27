export default {
    namespaced: true,
    state: {
        github: 'https://github.com/niyongsheng/LuckyDraw',
        sina: 'https://weibo.com/u/7317805089?is_all=1',
        email: 'mailto:niyongsheng@outlook.com',
        sheets: [{
            name: "Data Source",
            data: [
                { key: 1, name: '特等奖', subtitle: 'SpaceX火星船票一张', url: 'https://www.hualigs.cn/image/6010d3204e0ae.jpg', isShow: false, remark: '' },
                { key: 2, name: '一等奖', subtitle: '奖品a', url: 'https://www.hualigs.cn/image/6010d3204f387.jpg', isShow: false, remark: '' },
                { key: 3, name: '二等奖', subtitle: '奖品b', url: 'https://www.hualigs.cn/image/6010d3204e092.jpg', isShow: false, remark: '' },
                { key: 4, name: '三等奖', subtitle: '奖品c', url: 'https://www.hualigs.cn/image/6010d3204f387.jpg', isShow: false, remark: '' },
                { key: 5, name: '抽了个寂寞', subtitle: '奖品d', url: '', isShow: false, remark: '哈哈哈' },
                { key: 6, name: '再来一次', subtitle: '奖品e', url: '', isShow: false, remark: '' },
                { key: 7, name: '纪念奖', subtitle: '费曼物理学讲义', url: '', isShow: false, remark: 'O(∩_∩)O' }
                ]
        }]
    },

    mutations: {},

    actions: {},

    getters: {}
}
