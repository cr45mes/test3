//api管理
import request from '../utils/requesr'
export default {
  login(params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params
      // mock: false
    })
  }
}
