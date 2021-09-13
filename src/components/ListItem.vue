<template>
  <view class="block" @tap="onClick">
    <image :src="node.cover" class="cover-img" />
    <view class="block-cont">
      <view class="name">{{node.name}}</view>
      <view class="msg">主营：{{zhuying}}</view>
      <view class="msg">地址：{{node.address}}</view>
    </view>
    <view class="phone" @tap.stop="callPhone">
      <image :src="require('../assets/mobile.png')" class="phone-icon" />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import RecrodMixin from '../mixin/addRecord.vue'
export default {
  name: 'ListItem',
  mixins: [RecrodMixin],
  props: {
    node: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    zhuying() {
      const data = []
      this.node.categories.forEach(item => {
        data.push(item.name)
      })
      return data.join('、')
    }
  },
  methods: {
    // addLog() {
      // const {id, cover, phone, name} = this.node
      // this.$record.add({
      //   id,
      //   cover,
      //   phone,
      //   name,
      //   time: new Date().toJSON().slice(5, 19).replace('T', ' ')
      // })
      // this.$request.mutate({
      //   mutation: this.$api.addCallLog,
      //   variables: {
      //     input: {
      //       shopId: this.node.id,
      //       phone: this.node.phone,
      //       userId: 'dXNlci80MTY='
      //       // user: {
      //       //   id: 'xxx',
      //       //   name: 'test'
      //       // }
      //     }
      //   },
      // }).then((res) => {
      //   console.log('############', res)
      // }).catch(err => {
      //   console.log('err', err)
      // })
    // },
    onClick() {
      Taro.navigateTo({url: `/subPages/detail/index?id=${this.node.id}`})
    },
    callPhone() {
      this.addRecord(this.node)
      Taro.makePhoneCall({
        phoneNumber: this.node.phone
      })
    }
  }
}
</script>

<style lang="scss">
.block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid rgba(102, 102, 102, 0.4);
  padding-bottom: 20px;
  margin-top: 20px;
  .cover-img {
    width: 180px;
    height: 120px;
    margin-right: 10px;
  }
  .block-cont {
    flex: 1;
    width: 0;
    .name {
      font-size: 30px;
      font-weight: 500;
      color: #333333;
      margin-bottom: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .msg {
      font-size: 24px;
      line-height: 34px;
      font-weight: 400;
      color: #999999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .phone {
    margin-left: auto;
    height: 120px;
    display: flex;
    align-items: center;
    .phone-icon {
      width: 40px;
      height: 40px;
    }
  }
}
</style>