<template>
  <view class="page">
    <swiper
      class="swiper"
      indicator-color="#999"
      indicator-active-color="#333"
      current="current"
      :duration="duration"
      :interval="interval"
      :circular="isCircular"
      :autoplay="isAutoplay"
      :indicator-dots="hasIndicatorDots">
      <swiper-item class="swiper-item" v-for="(item, idx) in banner" :key="idx">
        <image :src="item.path" class="banner" />
      </swiper-item>
    </swiper>
    <view class="menu-box">
      <view v-for="item in menuList" :key="item.id" class="menu-item" @tap="() => onClick(item)">
        <image :src="item.image" class="menu-icon" />
        <text>{{item.name}}</text>
      </view>
    </view>
    <view class="title">优质卖家</view>
    <view class="list">
      <view v-for="item in storeList" :key="item.id">
        <list-item :node="item" />
      </view>
    </view>
  </view>
</template>

<script>
import ListItem from '../../components/ListItem.vue'
import Taro from '@tarojs/taro'
export default {
  components: { ListItem },
  data () {
    // const menuList = [
    //   { label: '轿车客车', icon: require('../../assets/new-car.png'), key: 'car'},
    //   { label: '装具装潢', icon: require('../../assets/zhuang.png'), key: 'zhuang'},
    //   { label: '询价单', icon: require('../../assets/check-bill.png'), key: 'check'},
    //   { label: '单项产品', icon: require('../../assets/simple-pro.png'), key: 'simple'},
    //   { label: '重汽轻卡', icon: require('../../assets/skin-car.png'), key: 'skin'},
    //   { label: '浏览记录', icon: require('../../assets/history.png'), key: 'history'},
    //   { label: '拆车件', icon: require('../../assets/destroy.png'), key: 'destroy'},
    //   { label: '求购信息', icon: require('../../assets/buy-msg.png'), key: 'buy'},
    // ]
    return {
      menuList: [],
      banner: [],
      duration: 1000,
      interval: 3000,
      isCircular: true,
      isAutoplay: true,
      hasIndicatorDots: true,
      storeList: []
    }
  },
  mounted() {
    this.getBanner()
    this.getStore()
    this.getCategory()
  },
  methods: {
    getCategory() {
      this.$request.query({
        query: this.$api.category, 
        variables: {
          input: { 
            root: 'home'
          }
        }
      }).then(result => {
        this.menuList = result.data.categorys.filter(item => item.children.length)
        console.log(11,this.menuList)
      });
    },
    getBanner() {
      this.$request.query({
        query: this.$api.banners, 
        variables: {
          input: { tag: "index" }
        }
      }).then(result => {
        this.banner = result.data.banners
      });
    },
    getStore() {
      this.$request.query({
        query: this.$api.store,
        variables: {
          input: {
            limit: 5,
            offset: 1,
          }
        },
      }).then(({data}) => {
        this.storeList = [...data.shops.edges]
      })
    },
    onClick(data) {
      console.log(data)
      Taro.navigateTo({url: `/pages/category/index?id=${data.id}`})
    },
    handleClick () {
      this.show = true
    },
    handleClose () {
      this.show = false
    }
  },
}
</script>
<style lang="scss">
.page {
  .swiper {
    width: 750px;
    height: 410px;
    .swiper-item {
      width: 100%;
      height: 100%;
      .banner {
        width: 100%;
        height: 100%;
      }
    }
  }
  .menu-box {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    .menu-item {
      width: 25vw;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .menu-icon {
        width: 72px;
        height: 72px;
      }
    }
  }
  .title {
    font-size: 36px;
    font-weight: 500;
    color: #333333;
    line-height: 50px;
    padding: 30px 40px 0;
  }
  .list {
    margin-left: 40px;
    margin-right: 40px;
  }
}
</style>