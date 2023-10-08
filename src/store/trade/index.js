import { reqAddressInfo, reqOrderInfo } from '@/api'

const trade = {
  state: {
    address: [],
    orderInfo: {}
  },
  mutations: {
    GETADDRESS(state, address) {
      state.address = address
    },
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo
    }
  },
  actions: {
    // 获取用户地址信息
    async getAddressInfo({commit}) {
      let result = await reqAddressInfo()
      if (result.code==200) {
        commit('GETADDRESS', result.data)
      }
    },
    // 获取商品清单
    async getOrderInfo({commit}) {
      let result = await reqOrderInfo() 
      if (result.code==200) {
        commit('GETORDERINFO', result.data)
      }
    }
  },
  getters: {

  }
}

export default trade;