import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const search = {
  state: {
     searchList: {}
  },
  mutations: {
    GETSEARCHLIST(state, searchList) {
      state.searchList = searchList
    }
  },
  actions: {
    // 获取search模块数据
    async getSearchList({commit}, params={}) {
      // 当前reqGetSearchInfo 这个函数在调取服务器数据的时候 至少传递一个空对象
      // params形参 当用户派发action时 第二个参数传递过来的 至少是一个空对象
      // console.log("Search")
      let result = await reqGetSearchInfo(params)
      if (result.code == 200) {
        commit("GETSEARCHLIST", result.data)
      }
    }
  },
  // 计算属性
  // 项目中getters主要作用于 简化仓库中的数据 为了简化数据而生
  // 可以把组件中需要用的数据简化 便于组件获取数据
  getters: {
    // 当前的state是指当前仓库中的state 并非大仓库的state
    goodsList(state) {
      // 如果网络出现了问题 返回undefined
      // 至少要返回一个数组 
      return state.searchList.goodsList
    },
    trademarkList(state) {
      return state.searchList.trademarkList
    },
    attrsList(state) {
      return state.searchList.attrsList
    }
  }
}

export default search;