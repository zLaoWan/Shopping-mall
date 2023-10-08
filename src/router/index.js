// 配置路由的文件
import { createRouter, createWebHashHistory } from 'vue-router'

// import { useStore } from 'vuex'
// const store = useStore()
import store from '@/store'

const routes = [
  // 重定向 在项目跑起来的时候 访问/ 重新定向到首页
  {
    path: '/:pathMatch(.*)',
    // redirect: () => import('@/pages/Home')
    redirect: "/home"
  },

  {
    path: '/home',
    name: 'home',
    components: {
      default: () => import('@/pages/Home/Home'),
    },
    meta: { show: true }
  },
  {
    path: "/search/:keyword?",
    name: "search",
    components: {
      default: () => import('@/pages/Search/Search'),
    },
    meta: { show: true },
    // 路由组件可以传递props数据
    // 布尔值写法
    props: true,
    // 对象写法 可以额外传递props
    // props: { a:1, b:2 },
    // 函数写法 可以params参数 query参数 通过props传递给路由组件
    // props: router => ({ keyword:router.query.keyword })
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login/Login'),
    meta: { show: false }
  },
  {
    path: '/register',
    name: 'register',
    components: {
      default: () => import('@/pages/Register/Register'),
    },
    meta: { show: false }
  },
  {
    path: '/Detail/:skuid?',
    name: 'Detail',
    components: {
      default: () => import('@/pages/Detail/Detail'),
    },
    meta: { show: true }
  },
  {
    path: '/AddCartSuccess',
    name: 'AddCartSuccess',
    components: {
      default: () => import('@/pages/AddCartSuccess/AddCartSuccess'),
    },
    meta: { show: true }
  },
  {
    path: '/ShopCart',
    name: 'ShopCart',
    components: {
      default: () => import('@/pages/ShopCart/ShopCart'),
    },
    meta: { show: true }
  },
  {
    path: '/Trade',
    name: 'Trade',
    components: {
      default: () => import('@/pages/Trade/Trade'),
    },
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面 必须是从购物城而来
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/Pay',
    name: 'Pay',
    components: {
      default: () => import('@/pages/Pay/Pay'),
    },
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/PaySuccess',
    name: 'PaySuccess',
    components: {
      default: () => import('@/pages/PaySuccess/PaySuccess'),
    },
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == 'pay'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: '/Center',
    name: 'Center',
    components: {
      default: () => import('@/pages/Center/Center'),
    },
    meta: { show: true },
    // 引入二级路由
    children: [
      {
        path: 'myOrder',
        component: ()=> import('@/pages/Center/myOrder/myOrder')
      },
      {
        path:'groupOrder',
        component: ()=> import('@/pages/Center/groupOrder/groupOrder')
      },
      {
        path: '/Center',
        redirect: '/Center/myOrder'
      },
    ]
  },
  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
         show: false
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
            show: false
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
            show: false
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
            show: false
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
            show: false
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
            show: false
        },
      }
    ],
  },
]

// 配置路由
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  // 滚动条行为
  scrollBehavior(to, from, savedPosition) {
    // 返回的y=0 代表滚动条在最上方
    return { top: 0 }
  }
})

// 路由守卫： 前置守卫(在路由跳转之间进行判断)
router.beforeEach(async (to, from, next) => {
  // to 可以获取到你要跳转到哪个路由信息
  // from 可以获取到你要从哪个路由来的信息
  // next 放行函数 next()放行 next(path)放行到指令路由 next(false)
  // next()

  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    console.log('已登陆')
    // 用户已经登陆了 不能再次登陆
    if (to.path == '/login') {
      next('/home')

    } else {
      // 登陆 去的不是login
      // 如果用户名已有
      if (name) {
        console.log('已获取用户')
        next()
      } else {
        // 没有用户名信息
        console.log('未获取用户')
        try {
          // 获取用户信息
          await store.dispatch("getUserInfo")
          next()
        } catch (error) {
          // token失效了读不到用户信息 重新登陆
          await store.dispatch("userLogout")
          next('/login')
        }
      }
    }
  } else {
    console.log("未登录")
    // 未登录 不能去交易相关、支付相关[pay|paysuccess]、个人中心
    let toPath = to.path
    if (toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1) {
      // 把未登录是 没有去成的信息 存储到地址栏中(路由)
      next('/login?redirect='+toPath)
    } else {
      // console.log(to)
      next()
    }
  }
})

// 对外暴露router实例
export default router