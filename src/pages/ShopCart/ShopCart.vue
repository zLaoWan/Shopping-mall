<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @click="(event) => updateChecked(cart, event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="() => handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="
                (event) => handler('change', event.target.value * 1, cart)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="() => handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="() => deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.lenght>0" @change="(event)=>updateAllCartChecked(event)"/>
        <span>全选</span> 
      </div>
      <div class="option">
        <a @click="()=>deleteAllCheckedCart()">删除选中的商品</a>
        <a >移到我的关注</a>
        <a >清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ： </em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/Trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
import throttle from "lodash/throttle";

const store = useStore();

onMounted(() => {
  getData();
});

// 获取个人购物车数据
function getData() {
  store.dispatch("getCartList");
}
// 修改某一个产品个数[节流]
function handler(type, disNum, cart) {
  handlerThrottle(type, disNum, cart);
}
const handlerThrottle = throttle(async function (type, disNum, cart) {
  switch (type) {
    case "add":
      disNum = 1;
      break;
    case "minus":
      // 判断产品数量大于1 才传可以传递给服务器-1
      // 过产品小于等于1 传递给服务器0 原封不动
      disNum = cart.skuNum > 1 ? -1 : 0;
      break;
    case "change":
      // 用户输入的值 如果有非法的(带有汉字||出现负数) 带给服务器0
      if (isNaN(disNum) || disNum < 1) {
        disNum = 0;
      } else {
        // 属于正常情况(小数取整) 带给服务器变化的量 = 用户输入 - 产品起始个数
        disNum = parseInt(disNum) - cart.skuNum;
      }
      break;
  }
  // 派发action
  try {
    // 修改成功时
    await store.dispatch("addOrUpdateShopCart", {
      skuId: cart.skuId,
      skuNum: disNum,
    });
    // 在获取一次服务器数据进行展示
    getData();
  } catch (error) {}
}, 500);
// 删除某一个产品[节流]
function deleteCartById(cart) {
  deleteThrottle(cart);
}
const deleteThrottle = throttle(async function (cart) {
  try {
    // 删除成功再次发送请求获取新数据
    await store.dispatch("deleteCartById", cart.skuId);
    getData();
  } catch (error) {
    console.log(error);
  }
}, 5000);
// 修改某一个产品的勾选状态
async function updateChecked(cart, event) {
  dateCheckedThrottle(cart, event);
}
const dateCheckedThrottle = throttle(async function (cart, event) {
  try {
    // event.target.checked 是一个布尔值 而服务器需要的参数是0|1
    await store.dispatch("updateCheckeById", {
      skuId: cart.skuId,
      isChecked: event.target.checked ? "1" : "0",
    });
    getData();
  } catch (error) {
    console.log(error);
  }
}, 2000);
// 删除全部选中产品
async function deleteAllCheckedCart() {
  try {
    await store.dispatch("deleteAllCheckedCart")
    getData()
  } catch(error) { console.log(error) }
}
// 修改全部产品的选中状态
async function updateAllCartChecked(event) {
  // let isChecked = event.target.checked
  try {
    await store.dispatch("updateAllCartChecked", event.target.checked?"1":"0")
    getData()
  } catch(error) {console.log(error)}
}


// 购物车数据
const cartList = computed(() => store.getters["cartList"]);

const cartInfoList = computed(() => cartList.value.cartInfoList || []);

// 计算购物车总价
const totalPrice = computed(() => {
  let sum = 0;
  cartInfoList.value.forEach((item) => {
    sum += item.skuNum * item.skuPrice;
  });
  return sum;
});

// 判断复选框是否勾选 全部产品都选中 才勾选
const isAllCheck = computed(()=> cartInfoList.value.every((item) => item.isChecked == 1));
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>