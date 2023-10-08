<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="giveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import myMixin from './myMixin.js';

export default {
  name:'Daughter',
  mixins: [myMixin],
  data () {
    return {
      money: 20000
    }
  },

  // methods: {
  //   // 女儿小红给爸爸的钱的回调函数
  //   giveMoney(money){
  //     // 女儿小红钱减少50
  //     this.money-=money;
  //     // 需要子组件内 获取到父组件 让父组件的数据加上50
  //     // 可以通过$parent属性获取到某一个父组件 可以操作父组件的数据和方法
  //     this.$parent.money+=money;
  //   }
  // }
}
</script>
