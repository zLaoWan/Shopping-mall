import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";

// home模块的小仓库
const detail = {
  state: {
    goodInfo: {},
    uuid_token: getUUID(),
  },
  mutations: {
    GETGOODINFO(state, goodInfo) {
      state.goodInfo = goodInfo
    }
  },
  actions: {
    async getGoodInfo({ commit }, skuid) {
      const result = await reqGoodsInfo(skuid)
      if ( result.code == 200 ) {
        commit("GETGOODINFO", result.data)
      }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      // 加入购物车返回的解构
      const result = await reqAddOrUpdateShopCart(skuId, skuNum)
      // console.log(result)
      // 服务器加入购物车成功
      if (result == 200) {
        return "ok"
      } else {  
        // 加入购物车失败 
        // return Promise.reject(new Error('faile'))
        return Error
      }
    }
  },
  getters: {
    // 路径导航的数据
    categoryView(state) {
      // 如果state.goodInfo初始值为空对象 空对象的categoryView属性值为undefined
      // 当前计算出的 categoryView属性 至少是一个空对象才不会报错
      return state.goodInfo.categoryView || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
      return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || []
    }
  }
}

export default detail;