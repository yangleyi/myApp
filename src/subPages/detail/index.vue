<template>
  <view class="page">
    <image
      :src="detail.cover"
      class="banner"
    />
    <view class="container">
      <view class="inline mb10">
        <view class="title">{{detail.name}}</view>
        <!-- <image :src="require('../../assets/go-store.png')" class="r-btn" /> -->
      </view>
      <view class="address mb10">地址：{{detail.address}}</view>
      <view class="inline">
        <view class="address">
          <text>电话：</text>
          <text class="text-blue">{{detail.phone}}</text>
          <!-- <text>（拨打次数：{{count}}）</text> -->
        </view>
        <image @tap="linkStore" :src="require('../../assets/link-store.png')" class="r-btn" />
      </view>
      <view class="net-link">
        <view v-if="detail.qqchat" class="inline" @tap="copy(detail.qqchat)">
          <image :src="require('../../assets/qq.png')" class="icon" />
          <text>{{detail.qqchat}}</text>
        </view>
        <view v-if="detail.wechat" class="inline" @tap="copy(detail.wechat)">
          <image :src="require('../../assets/wechat.png')" class="icon" />
          <text>{{detail.wechat}}</text>
        </view>
      </view>
    </view>
    <view class="container">
      <view class="title mb10">主营</view>
      <view class="content">{{cateText}}</view>
      <view class="title mb10 mt10" v-if="false">详情</view>
      <view class="content" v-if="false">{{detail.description}}</view>
    </view>
    <view class="container">
      <view class="title mb10">企业介绍</view>
      <view class="content">{{detail.description}}</view>
    </view>
    <view class="container" v-if="false">
      <view class="title mb10">
        <text>企业相册</text>
        <view class="inline more">
          <text>更多</text>
          <view class='at-icon at-icon-chevron-right' />
        </view>
      </view>
      <view class="album">
        <view class="album-item">
          <image src="" class="photo" />
          <view>资质</view>
        </view>
        <view class="album-item">
          <image src="" class="photo" />
          <view>环境</view>
        </view>
        <view class="album-item">
          <image src="" class="photo" />
          <view>产品</view>
        </view>
      </view>
    </view>
    <view class="h50" />
    <button class="share" openType="share">分享</button>
  </view>
</template>

<script>
import RecrodMixin from '../../mixin/addRecord.vue'
import Taro from '@tarojs/taro'
export default {
  mixins: [RecrodMixin],
  data () {
    return {
      id: '',
      detail: {
        categories: [],
        phones: []
      }
    }
  },
  computed: {
    cateText() {
      const t = []
      this.detail.categories.forEach(item => {
        t.push(item.name)
      })
      return t.join('、')
    },
    count() {
      const {phone, phones} = this.detail
      const filterPhone = phones.filter(item => item.phone === phone)
      if (filterPhone.length) {
        return filterPhone[0].count
      } else {
        return 0
      }
    }
  },
  onLoad(opt) {
    this.id = opt.id
    this.getDetail(opt.id)
  },
  onShareAppMessage() {
    const {name, cover} = this.detail
    const obj = {
      title: name,
      imgUrl: cover
    }
    return obj
  },
  methods: {
    copy(data) {
      Taro.setClipboardData({data: data.toString()})
    },
    async linkStore() {
      Taro.makePhoneCall({
        phoneNumber: this.detail.phone
      })
      await this.addRecord(this.detail)
      this.getDetail(this.id)
    },
    getDetail(id) {
      this.$request.query({
        query: this.$api.storeDetail,
        variables: {
          query: {
            id: id
          }
        },
      }).then((res) => {
        this.detail = res.data.shop
      }).catch(err => {
        console.log('err', err)
        // console.log('#err', JSON.parse(JSON.stringify(err)))
        // const data = JSON.parse(JSON.stringify(err))
        // Taro.showToast({title: data.message, icon: 'none'})
      })
    }
  },
}
</script>
<style lang="scss">
.page {
  min-height: 100vh;
  background: #EAEAEA;
  font-family: PingFangSC-Medium, PingFang SC;
  .banner {
    width: 750px;
    height: 284px;
    vertical-align: middle;
  }
  .container {
    background: #FFFFFF;
    margin-bottom: 20px;
    padding: 10px 40px;
    .r-btn {
      margin-left: auto;
      width: 120px;
      height: 48px;
    }
    .address {
      font-size: 26px;
      font-weight: 400;
      color: #999999;
      line-height: 36px;
    }
    .net-link {
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      margin-top: 20px;
      font-size: 30px;
      font-weight: 400;
      color: #000000;
      .icon {
        width: 56px;
        height: 56px;
        margin-right: 20px;
      }
    }
    .border-b {
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      padding-bottom: 20px;
    }
  }
  .album {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .album-item {
      text-align: center;
      font-size: 24px;
      font-weight: 400;
      color: #999999;
      .photo {
        width: 210px;
        height: 140px;
      }
    }
    .album-item + .album-item {
      margin-left: 20px;
    }
  }
  .more {
    font-size: 24px;
    font-weight: 400;
    color: #999999;
    margin-left: auto;
  }
  .title {
    font-size: 34px;
    font-weight: 500;
    color: #333333;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .content { 
    font-size: 30px;
    font-weight: 400;
    color: #333333;
    line-height: 46px;
  }
  .inline {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .share {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    background: #2D6EFF;
    color: #FFFFFF;
    width: 100%;
    height: 80px;
    font-size: 26px;
    border-radius: 0;
  }
}
</style>