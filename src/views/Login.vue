<script>
// 一个用户图像+密码锁图标
import { Avatar, Lock, View } from '@element-plus/icons-vue'
import storage from './../utils/storage'

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
        userName: 'admin',
        userPwd: '123456'
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
    login() {//validate是element plus官方的一个对表单校验的方法，可以接受一个函数回调
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$api.login(this.user).then(async (res) => {
            this.$store.commit('saveUserInfo', res)
            await this.loadAsyncRoutes()
            this.$router.push('/welcome')
          })
        } else {
          return false
        }
      })
    },
    async loadAsyncRoutes() {
      let userInfo = storage.getItem('userInfo') || {}
      if (userInfo.token) {
        try {
          const { menuList } = await this.$api.getPermissionList()
          let routes = utils.generateRoute(menuList)
          routes.map((route) => {
            let url = `./../views/${route.component}.vue`
            route.component = () => import(url)
            this.$router.addRoute('home', route)
          })
        } catch (error) {}
      }
    }
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="modal"><!-- status-icon就是在输入框的后面有一个校验是否填写的小图标，rules要绑定才能生效，并且item特邀传入prop才能生效 -->
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <!-- ref是vue中用来操作原生dom的属性 -->
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
