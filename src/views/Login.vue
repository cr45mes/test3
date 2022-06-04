<script>
// 一个用户图像+密码锁图标
import { Avatar, Lock, View } from '@element-plus/icons-vue'

export default {
  setup() {
    return {
      Avatar,
      Lock,
      View
    }
  },
  name: 'login',
  data() {
    return {
      user: {
        userName: '',
        userPwd: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        userPwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    // this.$request({
    //   method: 'get',
    //   url: '/login',
    //   data: {
    //     name: 'jack'
    //   }
    // }).then((res) => {
    //   console.log(res)
    // })
    // this.$requset.get('/login', { name: 'jack' }, { mock: true, loading: true }).then(() => {
    //   console.log(res)
    // })
  },
  methods: {
    gohome() {
      this.$router.push('/welcome')
    },
    login() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$api.login(this.user).then((res) => {
            this.$store.commit('saveUserInfo', res)
            this.$router.push('/welcome')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <div class="title">火星</div>
        <el-form-item prop="userName">
          <el-input type="text" :prefix-icon="Avatar" v-model="user.userName" />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input type="password" :prefix-icon="View" v-model="user.userPwd" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
