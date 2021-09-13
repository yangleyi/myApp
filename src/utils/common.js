import Taro from '@tarojs/taro'
import { get } from 'traverse'
export default {
  async add (data) {
    const list = await getStorage('records')
    const has = list.some(item => item.id === data.id)
    if (has) {
      return
    }
    list.push(data)
    saveStorage(list)
  },
  async get() {
    const data = await getStorage('records')
    return data
  },
  async delete(id) {
    const list = await getStorage('records')
    const index = list.findIndex(item => item.id === id)
    if (index >= 0) {
      list.splice(index, 1)
      saveStorage(list)
    }
  }
}

function getStorage (key) {
  return new Promise(resolve => {
    Taro.getStorage({
      key,
      success: res => {
        resolve(JSON.parse(res.data))
      },
      fail: err => {
        resolve([])
      }
    })
  })
}
function saveStorage(data) {
  Taro.setStorage({
    key: 'records',
    data: JSON.stringify(data)
  })
}