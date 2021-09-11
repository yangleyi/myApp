export default {
  pages: [
    'pages/index/index',
    'pages/callHistory/index'
  ],
  "subpackages": [
    {
      "root": "subPages",
      "pages": [
        "detail/index",
        "storeList/index",
        "category/index",
      ]
    }
  ],
  tabBar: {
    list: [{
      'iconPath': './assets/tab-home.png',
      'selectedIconPath': './assets/tab-home-hover.png',
      pagePath: 'pages/index/index',
      text: '首页'
    }, {
      'iconPath': './assets/tab-call.png',
      'selectedIconPath': './assets/tab-call-hover.png',
      pagePath: 'pages/callHistory/index',
      text: '通话记录'
    }],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
