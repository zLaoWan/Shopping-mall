<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script setup>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { watch, nextTick, reactive, toRefs } from "vue";

const props = defineProps(["list"]);

// 使用reactive以及ref 后续的监听只能监听到映射的数据内容 传递的list数据发生变化后 并不能监听到 而toRefs获取到的是数据源 所以数据源发生变化 watch可以直接监听到
// const { list } = reactive(props)
const { list } = toRefs(props);

watch(
  list,
  (newValue, oldValue) => {
    nextTick(() => {
      const mySwiper = new Swiper(".swiper-container", {
        loop: true,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // 前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    });
    // 开启直接监听   开启深度监听
  },
  { immediate: true, deep: true }
);
</script>

<style>
</style>