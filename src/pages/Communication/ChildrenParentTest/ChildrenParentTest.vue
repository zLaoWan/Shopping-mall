<template>
  <div>
    <h2>BABA有存款: {{ money }}</h2>
    <button @click="jieQianFromXM(100)">找小明借钱100</button><br />
    <button @click="jieQianFromXH(150)">找小红借钱150</button><br />
    <button @click="jieQianFromAll(200)">找所有孩子借钱200</button><br />

    <br />
    <!-- ref:可以获取到真实DOM节点，可以获取相应组件的实例VC -->
    <!-- ref也算在一种通信手段:在父组件中可以获取子组件(属性|方法) -->
    <Son ref="son" />

    <br />
    <Daughter ref="dau" />
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";
import { ref } from 'vue';

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000,
    };
  },

  methods: {
    // 向儿子小明借钱
    jieQianFromXM(money) {
      // 父亲的钱加100元
      this.money+=money;
      // ref可以获取真实的DOM节点 当然也可以获取子组件标签 操作子组件的数据和方法
      this.$refs.son.money-=money;
    },
    // 向女儿借钱
    jieQianFromXH(money) {
      this.money+=money;
      this.$refs.dau.money-=money;
    },
    jieQianFromAll(money) {
      // $children属性 可以获取当前组件的全部子组件[这个属性在用的时候很少用索引值获取子组件，因为没有办法确定数组里面的元素到底是哪一个子组件]
      this.money+=money*2;
      this.$refs.son.money-=money
      this.$refs.dau.money-=money
      
    },
  },

  components: {
    Son,
    Daughter,
  },
};
</script>

<style>
</style>
