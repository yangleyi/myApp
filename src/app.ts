import Vue from 'vue'
import './app.scss'
// import 'taro-ui/dist/style/index.scss'
import 'taro-ui/dist/style/components/load-more.scss'
import 'taro-ui/dist/style/components/search-bar.scss'
import 'taro-ui/dist/style/components/indexes.scss'
import 'taro-ui/dist/style/components/list.scss'
import 'taro-ui/dist/style/components/toast.scss'
import graphqlClient from './api'
Vue.prototype.$request = graphqlClient
import './api/constant'

const App = {
  onShow (options) {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
