<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
      >
        <img
          :src="slide.imgUrl"
          :class="{ active: currentIndex == index }"
          @click="() => changeCurrentIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script setup>
import Swiper from "swiper";

import { nextTick, toRefs, watch, ref, getCurrentInstance } from "vue";

let currentIndex = ref(0);

const bus = getCurrentInstance().appContext.config.globalProperties.$bus;

const { skuImageList } = toRefs(props);
const props = defineProps(["skuImageList"]);
const emit = defineEmits(["getIndex"]);

function changeCurrentIndex(index) {
  currentIndex.value = index;
  // 通知兄弟组件 当前的索引值
  bus.emit("getIndex", currentIndex.value);
}

watch(
  skuImageList,
  (newValue, oldValue) => {
    nextTick(() => {
      const mySwiper = new Swiper(".swiper-container", {
        // 前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // 显示几个图片
        slidesPerView: 3,
        // 每次切换图片个数
        slidePerGroup: 2,
      });
    });
  },
  { immediate: true, deep: true }
);
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>