<template>
  <view class="page">
    <view>
      
    </view>
    <scroll-view
      scroll-y
      scroll-with-animation
      class="scrollview"
    >
      <view v-for="(item, index) in list" :key="index" class="block">
        <image src="" class="img" />
        <view class="cont">
          <view class="name">济南王大汽修</view>
          <view class="phone-number text-blue">12345678901</view>
        </view>
        <view class="date">03-22 09:28</view>
      </view>
      <AtLoadMore
        :status="status"
        no-more-text="已全部加载完毕"
        loading-text="加载中"
      />
    </scroll-view>
  </view>
</template>

<script>
import { AtLoadMore } from 'taro-ui-vue'
export default {
  components: { AtLoadMore },
  data () {
    return {
      list: [1,2,3,4,5, 5, 6, 7],
      searchText: '',
      status: 'noMore' // loading
    }
  },
  methods: {
    onClear() {
      this.searchText = ''
      this.search()
    },
    search() {
      console.log(222, this.searchText)
    }
  },
}
</script>
<style lang="scss">
.page {
  min-height: 100vh;
  font-family: PingFangSC-Medium, PingFang SC;
  .scrollview {
    background: #FFFFFF;
    width: 690px;
    margin: 0 auto;
    .block {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .img {
        width: 200px;
        height: 76px;
        margin-right: 30px;
      }
      .cont {
        flex: 1;
        font-size: 30px;
        font-weight: 400;
        .name {
          color: #333333;
        }
      }
      .date {
        font-size: 22px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>