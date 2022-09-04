// //storage二次封装
// import config from '../config'
// export default {
//   setItem(key, val) {
//     let storage = this.getStroage()
//     storage[key] = val
//     window.localStorage.setItem(config.namespace, JSON.stringify(storage))
//   },
//   getItem(key) {
//     return this.getStroage()[key]
//   },
//   getStroage() {
//     return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
//   },
//   clearItem(key) {
//     let storage = this.getStroage()
//     delete storage[key]
//     window.localStorage.setItem(config.namespace, JSON.stringify(storage))
//   },
//   clearAll() {
//     window.localStorage.clear()
//   }
// }
/**
 * Storage二次封装
 * @author JackBean
 */
import config from './../config'
export default {
  setItem(key, val) {
    let storage = this.getStroage()
    storage[key] = val//因为key是变量，如果直接storage.key就直接将key作为key传进去，而不是自己定义的名字,也不使用storage.[key],而是直接使用storag[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  getItem(key) {
    return this.getStroage()[key]//写成[key]的原因同上
  },
  getStroage() {
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
  },
  clearItem(key) {
    let storage = this.getStroage()
    delete storage[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))//前面是把storage给赋值拿出来，后面就得重新给赋值回去才能实现功能
  },
  clearAll() {
    window.localStorage.clear()
  }
}
