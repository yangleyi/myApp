<template>
  <view class="page">
    <view>
      <AtSearchBar
        v-model="searchText"
        :fixed="true"
        :on-change="data => searchText = data"
        :on-action-click="search"
        :on-clear="onClear"
      />
    </view>
    <view class="top-block" />
    <scroll-view
      :scroll-y="true"
      scroll-with-animation
      class="scrollview"
      @scrollToLower="onBottom"
    >
      <list-item
        v-for="(item, index) in list"
        :key="index"
        :node="item"
        class="item"
      />
      <AtLoadMore
        :status="status"
        no-more-text="已全部加载完毕"
        loading-text="加载中"
      />
    </scroll-view>
  </view>
</template>

<script>
import { AtSearchBar, AtLoadMore } from 'taro-ui-vue'
import {clone, cloneDeep} from 'lodash'
import ListItem from "../../components/ListItem.vue"
export default {
  components: { ListItem, AtSearchBar, AtLoadMore },
  data () {
    return {
      list: [],
      searchText: '',
      params: {
        limit: 10,
        offset: 1,
        tsQuery: ''
      },
      total: 1
    }
  },
  computed: {
    status () {
      return this.total <= this.list.length ? 'noMore' : 'loading'
    }
  },
  watch: {
    params: {
      handler() {
        this.getStore()
      },
      deep: true
    }
  },
  onLoad(opt) {
    console.log('onload', opt)
    this.getStore()
  },
  methods: {
    getStore() {
      this.$request.query({
        query: this.$api.store,
        variables: {
          input: this.params
        },
      }).then(({data}) => {
        this.list = this.params.offset === 1 ? cloneDeep(data.shops.edges) : [...this.list, ...cloneDeep(data.shops.edges)]
        this.total = data.shops.pageInfo.total
      })
    },
    onClear() {
      this.searchText = ''
      this.search()
    },
    search() {
      const params = {
        ...this.params
      }
      params.offset = 1
      params.tsQuery = this.searchText
      this.list = []
      this.params = params
    },
    onBottom() {
      if (this.total > this.list.length) {
        this.params.offset = this.params.offset + 1
      }
    }
  },
}
</script>
<style lang="scss">
.page {
  min-height: 100vh;
  font-family: PingFangSC-Medium, PingFang SC;
  .top-block {
    height: 100px;
  }
  .scrollview {
    height: calc(100vh - 100px);
    background: #FFFFFF;
    margin: 0 auto;
    overflow-y: scroll;
    .item {
      width: 690px;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>