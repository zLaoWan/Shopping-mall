import { reqCategoryList, reqFloorList, reqGetBannerLsit } from "@/api";

// home模块的小仓库
const home = {
  state: {
    // state中数据默认初始值别瞎写 服务器返回对象 服务器返回数组 根据接口返回值初始化的 
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor组件的数据
    floorList: []
  },
  mutations: {
    CATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
      state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
      state.floorList = floorList
    },
  },
  // action|用户处理派发action地方 可以书写异步语句 
  actions: {
    async categoryList({ commit }) {
      // console.log('分类数据')
      let result = await reqCategoryList()
      if (result.code == 200) {
        commit("CATEGORYLIST", result.data)
      }
    },

    // 获取首页轮播图
    async getBannerList({ commit }) {
      // console.log('轮播图')
      let result = await reqGetBannerLsit()
      if (result.code == 200) {
        commit("GETBANNERLIST", result.data)
      }
    },

    // 获取floor数据
    async getFloorList({ commit }) {
      // console.log("floor组件")
      let result = await reqFloorList()
      if (result.code == 200) {
        // 提交 mutation
        commit("GETFLOORLIST", result.data)
      }
    }

  },
  getters: {

  }
}

export default home;
