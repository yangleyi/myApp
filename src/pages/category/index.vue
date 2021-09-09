<template>
  <view class="page">
    <TestIndexes
      :list="listData(value)"
      :on-scroll-into-view="handleScroll"
      :on-click="onClick"
      top-key="热"
      :animation="true"
    >
      <view class="custom-area">
        <AtSearchBar  
          :on-change="val => value = val"
          placeholder="搜索" 
          :on-action-click="handleActionClick" 
        />
        <view>
          <view class="hot-title">热门品牌</view>
          <view class="hot-list">
            <view v-for="(item, index) in hotList" :key="index" class="hot-item">
              <image src="" class="hot-icon" />
            </view>
          </view>
        </view>
      </view>
    </TestIndexes>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { cloneDeep } from 'lodash'
import { AtSearchBar, AtIndexes } from 'taro-ui-vue'
import TestIndexes from '../../taroIndex/Indexes.vue'
export default {
  components: { TestIndexes, AtSearchBar },
  data () {
    return {
      value: '',
      scrollToView: null,
      hotList: [1,2,3,4,5,6,7],
      list: [
        {title:'A',key:'A',items:[{name: '列表项内容1'},{name: '列表项内容2'},{name: '列表项内容3'},{name: '列表项内容4'},{name: '列表项内容5'}]},
        {title:'B',key:'B',items:[{name: '列表项内容1'},{name: '列表项内容2'},{name: '列表项内容3'},{name: '列表项内容4'},{name: '列表项内容5'}]},
        {title:'C',key:'C',items:[{name: '列表项内容1'},{name: '列表项内容2'},{name: '列表项内容3'},{name: '列表项内容4'},{name: '列表项内容5'}]},
        {title:'D',key:'D',items:[{name: '列表项内容1'},{name: '列表项内容2'},{name: '列表项内容3'},{name: '列表项内容4'},{name: '大众'}]},
      ],
    }
  },
  computed: {
    listData() {
      return key => {
        const list = cloneDeep(this.list)
        return list.filter(item => {
          item.items = item.items.filter(ele => {
            return ele.name.includes(key)
          })
          return item
        }).filter(item => item.items.length)
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$request.query({
        query: this.$api.category,
        variables: {
          input: {}
        },
      }).then((res) => {
        console.log('############', res)
      }).catch(err => {
        // console.log('#err', JSON.parse(JSON.stringify(err)))
        // const data = JSON.parse(JSON.stringify(err))
        // Taro.showToast({title: data.message, icon: 'none'})
      })
    },
    onClick(data) {
      console.log(22,data)
      Taro.navigateTo({url: `/pages/storeList/index`})
    },
    handleScroll(data) {
       this.scrollToView = data
    },
    handleActionClick() {
      console.log(1111111111, this.value)
      if (!this.value) {
        return
      }
      this.scrollToView && this.scrollToView(this.value.toUpperCase())
      this.value = ''
    }
  },
}
</script>
<style lang="scss">
.page {
  height: 100vh;
  font-family: PingFangSC-Medium, PingFang SC;
  .hot-title {
    font-size: 36px;
    font-weight: 500;
    color: #333333;
    padding-left: 40px;
  }
  .hot-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .hot-item {
      width: 150px;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      .hot-icon {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>