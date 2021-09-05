import classNames from 'classnames'
import Taro from '@tarojs/taro'
import mixins from './mixin'
import {
  delayQuerySelector,
  isTest,
  uuid,
  pxTransform,
} from './common'

const ENV = Taro.getEnv()

export default {
  mixins: [mixins],
  props: {
    customStyle: {
      type: [Object, String],
      default: '',
    },
    className: {
      type: [Array, String],
      default: '',
    },
    animation: {
      type: Boolean,
      default: false,
    },
    isVibrate: {
      type: Boolean,
      default: false,
    },
    isShowToast: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    topKey: {
      type: String,
      default: 'Top',
    },
    onClick: {
      type: Function,
      default: function () {
        return () => {}
      },
    },
    onScrollIntoView: {
      type: Function,
      default: function () {
        return () => {}
      },
    },
  },
  data() {
    return {
      // 右侧导航高度
      menuHeight: 0,
      // 右侧导航距离顶部高度
      startTop: 0,
      // 右侧导航元素高度
      itemHeight: 0,
      // scroll-view 列表项目的高度数组
      scrollItemHeights: [],
      // 当前索引
      currentIndex: -1,
      listId: isTest() ? 'indexes-list-AOTU2018' : `list-${uuid()}`,
      timeoutTimerL: null,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
      listRef: null,
      state: {
        _scrollIntoView: '',
        _scrollTop: 0,
        _tipText: '',
        _isShowToast: false,
      },
    }
  },
  computed: {
    listLen() {
      return this.list.length
    },
    rootCls() {
      return classNames('at-indexes', this.className)
    },
    toastStyle() {
      return { minWidth: pxTransform(100) }
    },
  },

  watch: {
    listLen() {
      this.initData()
    },
  },
  beforeMount() {
    this.onScrollIntoView && this.onScrollIntoView(this.__jumpTarget)
  },
  mounted() {
    if (ENV === Taro.ENV_TYPE.WEB) {
      this.listRef = document.getElementById(this.listId)
    }
    this.initData()
  },
  methods: {
    handleClick(item) {
      this.onClick && this.onClick(item)
    },
    handleTouchMove(event) {
      event.stopPropagation()
      event.preventDefault()

      const { list } = this
      const pageY = event.touches[0].pageY
      const index = Math.floor((pageY - this.startTop) / this.itemHeight)

      if (index >= 0 && index <= list.length && this.currentIndex !== index) {
        this.currentIndex = index
        const key = index > 0 ? list[index - 1].key : 'top'
        const touchView = `at-indexes__list-${key}`
        this.jumpTarget(touchView, index)
      }
    },
    handleTouchEnd() {
      this.currentIndex = -1
    },
    /**
     *
     * @param {string} _scrollIntoView
     * @param {number} idx
     */
    jumpTarget(_scrollIntoView, idx) {
      const { topKey, list } = this
      const _tipText = idx === 0 ? topKey : list[idx - 1].key

      if (ENV === Taro.ENV_TYPE.WEB) {
        delayQuerySelector(this, '.at-indexes', 0).then((rect) => {
          const arr = [...rect, { top: 0 }]
          const targetOffsetTop = this.listRef.children[idx].offsetTop
          this.listRef.scrollTop = targetOffsetTop
          const _scrollTop = targetOffsetTop - arr[0].top
          this.updateState({
            _scrollTop,
            _scrollIntoView,
            _tipText,
          })
        })
        return
      }

      this.updateState({
        _scrollTop: this.scrollItemHeights[idx],
        _scrollIntoView,
        _tipText,
      })
    },
    /**
     *
     * @param {string} key
     */
    __jumpTarget(key) {
      const { list } = this
      // const index = _findIndex(list, ['key', key])
      const index = list.findIndex((item) => item.key === key)
      const targetView = `at-indexes__list-${key}`
      this.jumpTarget(targetView, index + 1)
    },
    updateState(state) {
      const { isShowToast, isVibrate } = this
      const { _scrollIntoView, _tipText, _scrollTop } = state
      // TODO: Fix dirty hack
      this.setState(
        {
          _scrollIntoView: _scrollIntoView,
          _tipText: _tipText,
          _scrollTop: _scrollTop,
          _isShowToast: isShowToast,
        },
        () => {
          clearTimeout(this.timeoutTimer)
          this.timeoutTimer = setTimeout(() => {
            this.setState({
              _tipText: '',
              _isShowToast: false,
            })
          }, 3000)
        }
      )

      if (isVibrate) {
        Taro.vibrateShort()
      }
    },
    async getItemHeight () {
      await delayQuerySelector(this, '.at-indexes__menu').then((rect) => {
        const arr = [...rect, { top: 0, height: 0 }]
        const len = this.list.length
        this.menuHeight = arr[0].height
        this.startTop = arr[0].top
        this.itemHeight = Math.floor(this.menuHeight / (len + 1))
      })

      if (this.list.length > 0) {
        await this._getScrollListItemHeights(this.list).then(res => {
          this.scrollItemHeights = [...res]
        })
      }
    },
    initData() {
      if (this.isWeb) {
        this.getItemHeight()
      } else {
        setTimeout(() => {
          this.getItemHeight()
        }, 100)
      }
    },
    _getHeight(selector: string, delay?: number) {
      return new Promise<number>(resolve => {
        delayQuerySelector(this, selector, delay).then(rect => {
          // @ts-ignore
          if(rect && rect[0]) {
            // @ts-ignore
            resolve(rect[0].height)
          }
        })
      })
    },
    /**
     *
     * @param {Array<ListItem>} list
     */
    _getScrollListItemHeights(list) {
      return new Promise<number[]>(resolve => {
        if (list.length > 0) {
          let rawHeights: Promise<number>[] = []
          let itemHeights: number[] = []

          // 获取 #at-indexes__top 的高度              
          rawHeights.push(this._getHeight(`#at-indexes__top`))

          // 获取 #at-indexes——list-${key} 的高度
          list.forEach((item) => {
            rawHeights.push(this._getHeight(`#at-indexes__list-${item.key}`))
          })

          Promise.all(rawHeights).then(res => {
            let height = 0
            itemHeights.push(height)

            for (let i = 0; i < res.length; i++) {
              height += res[i]
              itemHeights.push(height)
            }

            resolve(itemHeights)
          })
        }
      })
    },
    handleScroll(e) {
      if (e && e.detail) {
        this.setState({
          // _scrollTop: e.detail.scrollTop,
          _scrollIntoView: ''
        })
      }
    },
  },
}
