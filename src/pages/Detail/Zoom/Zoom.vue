<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event"  @mousemove="(event)=>handler(event)"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigElement"/>
    </div>
    <div class="mask" ref="maskElement"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, getCurrentInstance, ref} from "vue";

let currentIndex = ref(0)
const maskElement = ref(null)
const bigElement = ref(null)
const bus = getCurrentInstance().appContext.config.globalProperties.$bus

const props = defineProps({
  skuImageList: Array,
});

onMounted(()=> {
  bus.on("getIndex", (index)=> {
    currentIndex.value = index
  })
})

function handler(event) {
  let mask = maskElement
  let big = bigElement
  let left = event.offsetX - mask.value.offsetWidth/2
  let top = event.offsetY - mask.value.offsetHeight/2
  // 约束范围
  if (left <= 0) left = 0
  if (left >= mask.value.offsetWidth) left = mask.value.offsetWidth
  if (top <= 0) top = 0
  if (top >= mask.value.offsetHeight) top = mask.value.offsetHeight

  mask.value.style.top = top + 'px'
  mask.value.style.left = left + 'px'
  big.value.style.top = -2*top + 'px'
  big.value.style.left = -2*left + 'px'
}

const imgObj = computed(()=> props.skuImageList[currentIndex.value]||{})

</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>