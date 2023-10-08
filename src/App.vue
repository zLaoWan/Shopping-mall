<template>
  <div>
    <h1 v-plugins="msg"></h1>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在home search显示 在登陆 注册隐藏 -->
    <Footer v-show="route.meta.show"></Footer>
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useRouter, useRoute } from "vue-router";
import { ref, provide, onMounted } from "vue";
import { useStore } from "vuex";

let msg = ref('admin')
const route = useRoute()

// 挂载至vue 后续可通过inject 直接获取
const store = useStore();

onMounted(() => {
  // 派发一个action||获取商品分类的三级列表的数据
  store.dispatch("categoryList");
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
