export default {
  // 对外暴露的对象可以防止组件重复的JS业务逻辑
  methods: {
    // 儿子小明给爸爸的钱的回调函数
    giveMoney(money){
      // 儿子小明钱减少50
      this.money-=money;
      // 需要子组件内 获取到父组件 让父组件的数据加上50
      // 可以通过$parent属性获取到某一个父组件 可以操作父组件的数据和方法
      this.$parent.money+=money;
    }
  }
}