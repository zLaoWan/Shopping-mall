// 当前模块作用：对API进行统一管理
import requests from'./request'

// 获取banner  home首页轮播图接口
import mockRequests from './mockAjax'

// 三级联动的接口  /api/product/getBaseCategoryList get 无参
// 发送请求 axios 发请求返回Promise对象
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList', method:'get'}) 

export const reqGetBannerLsit = ()=> mockRequests.get('/banner')
export const reqFloorList = ()=> mockRequests.get('/floor')

// 获取搜索模块数据 /api/list post 需要带参
// 当前这个接口(获取搜索模块的数据) 给服务器传递一个默认参数(至少是一个空对象)
export const reqGetSearchInfo = (params)=> requests({url: '/list', method:"post", data:params})

// 获取产品详情信息的接口 /api/item/{skuId} get
export const reqGoodsInfo = (skuId)=> requests({url:`/item/${skuId}`, method:'get'})

//将产品添加至购物车 /api/cart/addToCart/{ skuId }/{ skuNum }   POST
export const reqAddOrUpdateShopCart = (skuId, skuNum)=> requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method:'post'})

// 获取购物车列表数据接口 /api/cart/cartList GET
export const reqCartCartList = ()=> requests({url:`/cart/cartList`, method:'get'})

// 删除购物车产品的接口 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCartById = (skuId)=> requests({url:`/cart/deleteCart/${skuId}`, method:'delete'})

// 修改商品的选中状态 /api/cart/checkCart/{skuId}/{isChecked} GET
export const reqUpdateCheckeById = (skuId, isChecked)=> requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get'})

// 获取验证码 /api/user/passport/sendCode/{phone} GET
export const reqGetCode = (phone)=> requests({url:`/user/passport/sendCode/${phone}`, method:'get'})

// 注册 /api/user/passport/register POST phone code password
export const reqUserRegister = (data)=> requests({url:`/user/passport/register`, data, method:'post'})

// 登陆 /api/user/passport/login POST phone password
export const reqUserLogin = (data)=> requests({url:`/user/passport/login`, data, method:'post'})

// 获取用户信息 (需要tonken向服务器要用户信息 /api/user/passport/auth/getUserInfo GET
export const reqUserInfo = ()=> requests({url:`/user/passport/auth/getUserInfo`, method:'get'})

// 退出登陆 /api/user/passport/logout GET
export const reqUserLogOut = ()=> requests({url:`/user/passport/logout`, method:'get'})


// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList GET
export const reqAddressInfo = ()=> requests({url:`/user/userAddress/auth/findUserAddressList`, method:'get'})

// 获取商品清单 /api/order/auth/trade GET
export const reqOrderInfo = ()=> requests({url:`/order/auth/trade`, method:'get'})

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} POST
export const reqSubmitOrder= (tradeNo, data)=> requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method:'post'})

// 获取支付信息 /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo= (orderId)=> requests({url:`/payment/weixin/createNative/${orderId}`, method:'get'})

// 获取订单支付状态 /api/paymen/weixin/queryPayStatus/{orderId} GET
export const reqPayStatus = (orderId)=> requests({url:`/paymen/weixin/queryPayStatus/${orderId}`, method:'get'})

// 获取个人中心的数据 /api/order/auth/{page}/{limit} GET
export const reqMyOrderList = (page,limit)=> requests({url:`/order/auth/${page}/${limit}`, method:'get'})
