//vuex状态存储
import { createStore } from 'vuex'
import mutations from './mutations'
import storage from '../utils/storage'

const state = {
  userInfo: storage.getItem('userInfo') || {}, //获取用户信息
  menuList: storage.getItem('menuList') || [],
  actionList: storage.getItem('actionList') || [],
  noticeCount: 0
}
export default createStore({
  state,
  mutations
})
