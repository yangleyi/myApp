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
      @scroll="handleScroll"
      @scrollToLower="onBottom"
    >
      <list-item v-for="(item, index) in list" :key="index" />
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
// import { ScrollView } from '@tarojs/taro'
import ListItem from "../../components/ListItem.vue"
export default {
  components: { ListItem, AtSearchBar, AtLoadMore },
  data () {
    return {
      list: [1,2,3,4,5, 5, 6, 7],
      searchText: '',
      status: 'loading' // loading noMore
    }
  },
  methods: {
    handleScroll() {
      console.log(123)
    },
    onClear() {
      this.searchText = ''
      this.search()
    },
    search() {
      console.log(222, this.searchText)
    },
    onBottom() {
      console.log('到底了')
      setTimeout(() => {
        this.status = 'noMore'
      }, 500)
    }
  },
}
</script>
<style lang="scss">
.page {
  min-height: 100vh;
  font-family: PingFangSC-Medium, PingFang SC;
  .top-block {
    height: 70px;
  }
  .scrollview {
    height: calc(100vh - 70px);
    background: #FFFFFF;
    width: 690px;
    margin: 0 auto;
    overflow-y: scroll;
  }
}
</style>