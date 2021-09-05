<template>
  <view class="page">
    <image
      src=""
      class="banner"
    />
    <view class="container">
      <view class="inline mb10">
        <view class="title">济南王大汽车配件有限公司</view>
        <image :src="require('../../assets/go-store.png')" class="r-btn" />
      </view>
      <view class="address mb10">地址：山东汽配基地总部A区47号</view>
      <view class="inline">
        <view class="address">电话：<text class="text-blue">12345678901</text>(拨打次数:287)</view>
        <image :src="require('../../assets/link-store.png')" class="r-btn" />
      </view>
      <view class="net-link">
        <view class="inline">
          <image :src="require('../../assets/qq.png')" class="icon" />
          <text>1729836638</text>
        </view>
        <view class="inline">
          <image :src="require('../../assets/wechat.png')" class="icon" />
          <text>1729836638</text>
        </view>
      </view>
    </view>
    <view class="container">
      <view class="title mb10">主营</view>
      <view class="content border-b">别克、雪弗兰、凯迪拉克、福特</view>
      <view class="title mb10 mt10">详情</view>
      <view class="content">别克系列:凯悦、英朗、君越、昂科威等全车配件 雪弗兰系列:克鲁兹、赛欧、景程、乐风、爱唯欧、乐风等全车配件 凯迪拉克系列:ATS-L、XT4、XTS、CT6等全车配件 福特系列:福睿斯、福克斯、蒙迪欧、锐界、翼虎、金牛座、翼搏等全车配件</view>
    </view>
    <view class="container">
      <view class="title mb10">企业介绍</view>
      <view class="content">公司主营别克、雪弗兰、凯迪拉克、福特全车配件 济南王大汽车配件有限公司可开增值税发票 业务电话:0531-85664288/83157941</view>
    </view>
    <view class="container">
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
  </view>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    
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
}
</style>