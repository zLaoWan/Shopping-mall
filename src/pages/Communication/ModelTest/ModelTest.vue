<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="msg" />
    <span>{{ msg }}</span>

    <h2>v-model底层实现原理</h2>
    <!-- 
      原生DOM当中存在oninput事件 经常结合表单元素一起使用 当表单元素文本内容发生变化时就会发出一次回调
        Vue2 可以通过vlaue与input实现v-model功能 
      -->
    <input type="text" :value="msg" @input="msg=$event.target.value"/>
    <!-- 深入学习v-model 实现父子组件数据同步(父子组件通信) -->
    <span>{{ msg }}</span>

    <!-- 
      :value 是props 父子通信
      @input 并非原生DOM的input事件 属于自定义事件
     -->
    <!-- <CustomInput :value="msg" @input="inputHandler"></CustomInput> -->
    <CustomInput v-model="msg"></CustomInput>
    <h2>父组件{{msg}}</h2>


    <!-- 底下是element-UI提供组件 -->
    <h3>{{msg}}</h3>
    <el-input size="mini" v-model="msg"></el-input>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  components: {
    CustomInput
  },
  data() {
    return {
      msg:"我是豪哥",
    }
  },
  methods: {
    handler(e){
      this.msg1 = e.target.value;
    },
    //自定义事件input回调
    inputHandler(params){
      console.log(params)
      this.msg2  = params;
    }
},
}
</script>
