import { reqCategoryList } from "@/api";

// home模块的小仓库
const params = {
  state: {
    keyword: ''
  },
  mutations: {
    pushData(state, keyword) {
      state.keyword = keyword
    }
  },
  actions: {
    
  },
  getters: {

  }
}

export default params;