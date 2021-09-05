<template>
  <view
    :class="rootCls"
    :style="customStyle"
  >
    <AtToast
      :custom-style="toastStyle"
      :is-opened="state._isShowToast"
      :text="state._tipText"
      :duration="2000"
    />
    <view
      class="at-indexes__menu"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <view
        class="at-indexes__menu-item"
        @tap="jumpTarget('at-indexes__top', 0)"
      >{{ topKey }}</view>
      <view
        v-for="(dataList, i) in list"
        :key="dataList.key"
        class="at-indexes__menu-item"
        @tap="jumpTarget(`at-indexes__list-${dataList.key}`, i + 1)"
      >{{ dataList.key }}</view>
    </view>
    <scroll-view
      :id="listId"
      class="at-indexes__body"
      :scroll-y="true"
      :scroll-with-animation="animation"
      :scroll-top="state._scrollTop"
      :scroll-into-view="!isWEB ? state._scrollIntoView : ''"
      @scroll="handleScroll"
    >
      <view
        id="at-indexes__top"
        class="at-indexes__content"
      >
        <slot />
      </view>
      <view
        v-for="dataList in list"
        :id="`at-indexes__list-${dataList.key}`"
        :key="dataList.key"
        class="at-indexes__list"
      >
        <view class="at-indexes__list-title">{{ dataList.title }}</view>
        <AtList>
          <template v-if="dataList.items">
            <!-- <AtListItem
              v-for="item in dataList.items"
              :key="item.name"
              :title="item.name"
              :onClick="handleClick.bind(this, item)"
            /> -->
            <view
              v-for="item in dataList.items"
              :key="item.name"
              @tap="() => itemClick(item)"
              class="index-line"
            >
              <image :src="item.icon" class="icon" />
              <text>{{item.name}}</text>
            </view>
          </template>
        </AtList>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import AtIndexes from './indexes'
import {AtList, AtToast } from 'taro-ui-vue'
export default {
  name: 'TestIndexes',
  components: {
    AtList,
    // AtListItem,
    AtToast,
  },
  mixins: [AtIndexes],
  methods: {
    itemClick(data) {
      this.onClick && this.onClick(data)
    }
  }
}
</script>
<style lang="scss">
.index-line {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  .icon {
    width: 100px;
    height: 100px;
    margin-right: 40px;
  }
}
</style>
