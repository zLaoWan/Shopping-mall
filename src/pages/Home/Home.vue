<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor) in FloorList " :key="floor.id" :list="floor" />
    <Brand />

  </div>
</template>

<script setup>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand/brand.vue";
import { useStore, mapState, mapGetters } from "vuex";
import { onMounted, computed } from "vue";


const store = useStore();


onMounted(()=> {
  // 获取floor组件数据
  store.dispatch("getFloorList")

})
const FloorList = computed(()=> store.state.home.floorList)



</script>

<style>
</style>