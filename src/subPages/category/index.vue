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
            <view
              v-for="(item, index) in hotList"
              :key="index"
              class="hot-item"
              @tap="() => onClick(item)"
            >
              <image :src="item.image" class="hot-icon" />
            </view>
          </view>
        </view>
      </view>
    </TestIndexes>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { AtSearchBar, AtIndexes } from 'taro-ui-vue'
import TestIndexes from '../../taroIndex/Indexes.vue'
export default {
  components: { TestIndexes, AtSearchBar },
  data () {
    return {
      value: '',
      scrollToView: null,
      // list: [
      //   {title:'A',key:'A',items:[{name: '列表项内容1'},{name: '列表项内容2'},{name: '列表项内容3'},{name: '列表项内容4'},{name: '列表项内容5'}]},
      //   {title:'B',key:'B',items:[{name: '列表项内容1'},{name: '列表项内容2'},{name: '列表项内容3'},{name: '列表项内容4'},{name: '列表项内容5'}]},
      //   {title:'C',key:'C',items:[{name: '列表项内容1'},{name: '列表项内容2'},{name: '列表项内容3'},{name: '列表项内容4'},{name: '列表项内容5'}]},
      //   {title:'D',key:'D',items:[{name: '列表项内容1'},{name: '列表项内容2'},{name: '列表项内容3'},{name: '列表项内容4'},{name: '大众'}]},
      // ],
      resultList: []
    }
  },
  computed: {
    hotList() {
      return this.resultList.filter(item => item.status === 'HOT')
    },
    listData() {
      return key => {
        const data = {}
        this.resultList.forEach(item => {
          if (item.name.includes(key)) {
            if (data[item.tag]) {
              data[item.tag].push(item)
            } else {
              data[item.tag] = [item]
            }
          }
        })
        const list = []
        Object.keys(data).forEach(item => {
          const obj = {
            title: item,
            key: item,
            items: data[item]
          }
          list.push(obj)
        })
        return list
      }
    }
  },
  onLoad(opt) {
    this.getData(opt.id)
  },
  methods: {
    getData(id) {
      this.$request.query({
        query: this.$api.category,
        variables: {
          input: {
            id: id
          }
        },
      }).then((res) => {
        this.resultList = res.data.categorys
      })
    },
    onClick(data) {
      console.log(22,data)
      Taro.navigateTo({url: `/subPages/storeList/index?id=${data.id}`})
    },
    handleScroll(data) {
       this.scrollToView = data
    },
    handleActionClick() {
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