// vee-validate插件：表单验证区域
import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 中文提示信息
import zh from ''
Vue.use(VeeValidate)

// 表单验证
VeeValidate.useValidateForm.localize('zh_CN', {
  message: {
    ...zh_CN.message,
    is: (field)=> `${field}必须与密码相同` //修改内置规定的massage 让确认密码和密码相同
  },
  // 给校验的 field 属性名映射中文名称
  attributes: {
    phone:'手机号',
    code:'验证码',
    password:'密码',
    passwordd:'确认密码',
    agree:'协议'
  }
})

// 自定义校验规则
VeeValidate.Validator.extend("tongyi", {
  validate: (value)=> {
    return value
  },
  getMessage: (field)=> field+'必须同意'
})
