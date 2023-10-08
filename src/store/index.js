import { createStore } from 'vuex'
import home from './home'
import search from './search'
import params from './params'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'


// 创建一个新的 store 实例
const store = createStore({
  state: {
    count: 111
    
  },
  mutations: {
    increment (state) {
      state.count++;
    }
  },
  actions: {

  },
  getters: {

  },
  modules: {
    home,
    search,
    params,
    detail,
    shopcart,
    user,
    trade,
  }
})

export default store;