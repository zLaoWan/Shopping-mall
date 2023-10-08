import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogOut } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token"

const user = {
  state: {
    code: '',
    token: getToken(),
    userInfo: {},
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code
    },
    USERLOGIN(state, token) {
      state.token = token
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    CLEAR(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  },
  actions: {
    // 获取验证码
    async getCode({ commit }, phone) {
      // 获取验证码： 将验证码返回 正常情况后台会将验证码发到用户手机上(现在是为了省钱)
      let result = await reqGetCode(phone)
      if(result.code == 200) {
        commit("GETCODE", result.data)
        return 'ok'
      } else { return Promise.reject() }
    },
    // 用户注册
    async getUserRegister({ commit }, data) {
      let result = await reqUserRegister(data)
      if (result.code == 200) {
        return 'ok'
      } else { return Promise.reject(new Error(result.message)) }
    },
    // 用户登录
    async userLogin({ commit }, data) {
      let result = await reqUserLogin(data)
      if (result.code == 200) {
        commit("USERLOGIN", result.data.token)
        // 持久化存储token
        setToken(result.data.token)
        return "ok"
      } else { return Promise.reject(new Error('faile')) }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      let result = await reqUserInfo()
      if (result.code==200) {
        commit("GETUSERINFO", result.data)
        return "ok"
      } else { return Promise.reject(new Error('faile'))}
    },
    // 推出登陆
    async userLogout({ commit }) {
      // 通知服务器清除token
      let result = await reqUserLogOut()
      // action里不能操作state 提交mutation修改state
      if (result.code == 200) {
        commit("CLEAR")
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    }
  },
  getters: { 

  }
}

export default user;
