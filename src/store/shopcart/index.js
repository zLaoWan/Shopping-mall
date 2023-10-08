import { reqCartCartList, reqDeleteCartById, reqUpdateCheckeById } from '@/api'

const shopcart = {
  state: {
    cartList: []
  },
  mutations: {
    GETCARTLIST(state, cartList) {
      state.cartList = cartList;
    }
  },
  actions: {
    // 获取购物车列表
    async getCartList({ commit }, skuId) {
      const result = await reqCartCartList(skuId)
      if (result.code == 200) {
        commit("GETCARTLIST", result.data)
      }
    },
    // 删除购物车某一个产品
    async deleteCartById({ commit }, skuId) {
      const result = await reqDeleteCartById(skuId)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckeById({commit}, {skuId, isChecked}) {
      const result = await reqUpdateCheckeById(skuId, isChecked)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 删除全部勾选产品
    deleteAllCheckedCart({dispatch, getters}) {
      // context: 小仓库 commit(提交mutations修改state) getters(计算属性) dispatch(派发action) state(当前仓库数据)
      // 获取购物车中全部产品
      let PromiseAll = []
      getters.cartList.cartInfoList.forEach(item=> {
        let promise = item.isChecked==1?dispatch('deleteCartById', item.skuId):''
        console.log(promise)
        // 将每次返回的Promise添加到数组中
        PromiseAll.push(promise)
      })
      // 将全部的怕P1|P2...都成功 则返回结果为成功 若有一个失败 返回结果都为失败
      return Promise.all(PromiseAll)
    },
    // 修改全部产品状态
    updateAllCartChecked({dispatch, state}, isChecked) {
      let PromiseAll = []
      state.cartList[0].cartInfoList.forEach(item=> {
        let promise = dispatch("updateCheckeById", {
          skuId:item.skuId, 
          isChecked
        })
        PromiseAll.push(promise)
      })
      return Promise.all(PromiseAll)
    }


  },
  getters: {
    cartList(state) {
      return state.cartList[0]||{}
    }
  }
}

export default shopcart;
