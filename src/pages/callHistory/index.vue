<template>
  <view class="page">
    <scroll-view
      :scroll-y="true"
      scroll-with-animation
      class="scrollview"
      @scrollToLower="onBottom"
    >
      <view v-for="(item, index) in list" :key="index" class="block">
        <image :src="item.cover" class="img" />
        <view class="cont">
          <view class="name">{{item.name}}</view>
          <view class="phone-number text-blue">{{item.phone}}</view>
        </view>
        <view class="date">{{item.time}}</view>
      </view>
      <AtLoadMore
        :status="status"
        :no-more-text="noMoreText"
        loading-text="加载中"
      />
    </scroll-view>
  </view>
</template>

<script>
import { AtLoadMore } from 'taro-ui-vue'
import Taro from '@tarojs/taro'
export default {
  components: { AtLoadMore },
  data () {
    return {
      list: [],
      searchText: '',
      status: 'loading', // noMore loading,
      noMoreText: '',
      params: {
        offset: 1,
        limit: 20
      }
    }
  },
  watch: {
    params: {
      handler(data) {
        this.getList()
      },
      deep: true
    }
  },
  onShow() {
    this.getList()
  },
  methods: {
    async getList() {
      this.list = await this.$record.get()
      this.status = 'noMore'
      this.noMoreText = this.list.length ? '已全部加载完毕' : '暂无记录'
      // this.status = 'loading'
      // this.$request.query({
      //   query: this.$api.callLog,
      //   variables: {
      //     query: this.params
      //   },
      // }).then((res) => {
      //   console.log('############', res)
      //   this.storeList = [...this.storeList, ...res.data.edges]
      //   // this.status = 'noMore'
      // }).catch(err => {
      //   console.log('#err', JSON.parse(JSON.stringify(err)))
      //   const data = JSON.parse(JSON.stringify(err))
      //   Taro.showToast({title: data.message, icon: 'none'})
      // })
    },
    onBottom() {
      this.params.offset = this.params.offset + 1
    },
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
  height: 100vh;
  font-family: PingFangSC-Medium, PingFang SC;
  .scrollview {
    background: #FFFFFF;
    width: 690px;
    margin: 0 auto;
    height: 100%;
    background: #FFFFFF;
    overflow-y: scroll;
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