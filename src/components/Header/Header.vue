<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登陆</router-link>
            <router-link class="register" to="/register">注册</router-link>
          </p>

          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="()=>logout()">退出登陆</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###"></a>
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的</a>
          <a href="###">会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo">
          <!-- <img src="./images/logo.png" alt="" /> -->
          <img src="" alt=""  style="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, inject, reactive, ref, getCurrentInstance, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

let keyword = ref(null);
const router = useRouter();
const route = useRoute();
const store = useStore();
const bus = getCurrentInstance().appContext.config.globalProperties.$bus;

// 搜索按钮的事件处理函数 用于跳转到search路由组件中
function goSearch() {
  // 字符串传参
  // router.push("/search/" + keyword.value + "?k=" + keyword.value)
  // query传递参数
  // router.push({path:'/search', query:{keyword:keyword.value}})
  // params传递参数   需要在路由表上添加传递的数据名称 否则会造成丢失 path: "/search/:keyword"
  // router.push({name:'search',params:{keyword:keyword.value}})
  // query + params传递参数
  // router.push({
  //   name: 'search',
  //   query: {keyword:keyword.value + 'query'},
  //   params: {keyword:keyword.value || undefined},
  // })

  if (route.query) {
    let locations = {
      name: "search",
      params: { keyword: keyword.value || undefined },
    };
    locations.query = route.query;
    router.push(locations);
  }
}
// 退出登陆
function logout() {
  try {
    store.dispatch('userLogout')
    router.push('/home')
  } catch (error) {
    console.log(error.message)
  }
}

const userName = computed(()=> store.state.user.userInfo.name)

onMounted(() => {
  bus.on("clear", () => {
    keyword.value = "";
  });
});
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>