<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <Form class="register"  @submit="onSubmit">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
          <label>手机号:</label>
          <Field name="phone" placeholder="请输入你的手机号" v-model="phone" :rules="isPhone"></Field>
          <ErrorMessage class="error-msg" name="phone"></ErrorMessage>
      </div>

      <div class="content">
          <label>验证码:</label>
          <Field name="code" placeholder="请输入验证码" v-model="code" :rules="isCode"></Field>
          <button style="width: 100px; height: 38px" @click="() => getCode()">
            获取验证码
          </button>
          <ErrorMessage class="error-msg" name="code"></ErrorMessage>
      </div>
        <div class="content">
          <label>登录密码:</label>
          <Field name="password" type="password" placeholder="请输入你的登录密码" v-model="password" :rules="ispassword"></Field>
          <ErrorMessage class="error-msg" name="password"></ErrorMessage>
        </div>
        <div class="content">
          <label>确认密码:</label>
          <Field name="passwordd" type="password" placeholder="请输入确认密码" v-model="passwordd" :rules="ispasswordd"></Field>
          <ErrorMessage class="error-msg" name="passwordd"></ErrorMessage>
        </div>
      <div class="controls">
          <Field name="agree" type="checkbox" :checked="agree" :value="agree" :rules="ischeckbox"></Field>
          <span>同意协议并注册《尚品汇用户协议》</span>
          <ErrorMessage class="error-msg" name="agree"></ErrorMessage>
      </div>
      <div class="btn">
        <button >完成注册</button>
      </div>
    </Form>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from 'vee-validate'

// 手机号
let phone = ref(null);
// 验证码
let code = ref(null);
// 密码
let password = ref(null);
// 确认密码
let passwordd = ref(null);
// 是否同意
let agree = ref(true);

const store = useStore();
const router = useRouter();

async function getCode() {
  try {
    await store.dispatch("getCode", phone.value);
    code.value = store.state.user.code;
  } catch (error) {
    console.log(error);
  }
}
async function userRegister() {
  try {
    await store.dispatch("getUserRegister", { 
      phone:phone.value, 
      code:code.value, 
      password:password.value 
    });
    router.push('/login')
  } catch(error) { console.log(error) }
}


function onSubmit(values) {
  console.log(values)
  userRegister()
}

function isPhone(value) {
  const regex = /^1\d{10}$/
  if (!regex.test(value)) {
    return '请输入有效的11位手机号'
  }
  // All is good
  return true;
}
function isCode(value) {
  const regex = /^\d{6}$/
  if (!regex.test(value)) {
    return '请输入有效的6位验证码'
  }
  return true;
}
function ispassword(value) {
  const regex = /^[0-9A-Za-z]{8,20}$/
  if (!regex.test(value)) {
    return '请输入8-20位密码'
  }
  return true
}
function ispasswordd(value) {
  if (value!=password.value) {
    return '密码不同请重新输入'
  }
  return true
}
function ischeckbox(value) {
  if (value!=true) {
    return '请勾选协议'
  }
  return true
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>