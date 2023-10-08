<template>
  <div>
    <!-- 可以巧妙利用a标签实现按钮带有提示功能 -->
    <a :title="title">
      <!-- v-bind不能使用: -->
      <el-button v-bind="$attrs" v-on="$listener"></el-button>
    </a>

  </div>
</template>

<script >
export default {

  mounted() {
    // $attrs属于组建的一个属性 可以获取到父组件传递过来的props数据
    // 对于子组件而言 父组件传递的数据可以利用props接收 但是如果子组件通过props接收的属性 在$attrs属性中是获取不到的
    // console.log(this.$attrs)
    // $listener 也是组件实例自身的一个属性 可以获取到父组件给子组件传递自定义事件
    // console.log(this.$listener)
  }
}
</script>

<style>

</style>