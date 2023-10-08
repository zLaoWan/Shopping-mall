<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 原生DOM绑定原生事件 -->
    <button @click="handler">原生DOM绑定原生事件</button>

    <!-- native在vue3中已经弃用 -->
    <!-- Event1组件 Event1非原生DOM节点 而绑定的click事件并非原生的DOM 而是自定义事件 -->
    <!-- <Event1 @click.native="handler1"></Event1> -->

    <!-- 
      下面的写法是给原生DOM绑定自定义事件的
      给原生DOM绑定自定义事件内有任何意义 因为没办法发出$emit函数
     -->
    <button @memeda="handler2">原生DOM绑定自定义事件</button>

    <Event2 @click="handler3" @xxx="handler4"></Event2>
    <hr/>
    <!-- 自定义事件 -->
    <el-button @click="ceshi" type="success">我是按钮</el-button>
  </div>
</template>
【
<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  name: 'EventTest',

  components: {
    Event1,
    Event2,
  },

  methods: {
    //点击事件的回调
   handler(e){
       this.$refs.pre.style.color="red";
       console.log('我是原生DOM事件',e);
   },
   handler1(){
     console.log('event1事件回调测试');
   },
   handler2(){ },
   handler3(params){
      console.log('我是原生DOM',params);
   },
   handler4(params){
      console.log('我不是原生DOM',params);
   },
   ceshi(e){
     console.log(e);
   }
  }
}
</script>
