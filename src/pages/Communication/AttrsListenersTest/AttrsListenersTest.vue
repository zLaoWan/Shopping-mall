<template>
  <div>
     <h1>自定义带Hiver提示按钮</h1>
     <HintButton type="success" icon="el-icon-delete" size="mini" tip="提示信息" @click="handler"></HintButton>
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from './HintButton'
  export default {
    name: 'AttrsListenersTest',
    components: {
      HintButton
    },
    methods: {
      handler(){
        alert(123);
      }
    },
  }
</script>
