<script>
export default {
  name: 'login',
  mounted() {
    this.$request({
      method: 'get',
      url: '/login',
      data: {
        name: 'jack'
      }
    }).then((res) => {
      console.log(res)
    })

    // this.$requset.get('/login', { name: 'jack' }, { mock: true, loading: true }).then(() => {
    //   console.log(res)
    // })
  },
  methods: {
    gohome() {
      this.$router.push('/welcome')
    }
  }
}
</script>

<template>
  <h1>欢迎来到登录界面</h1>
  <el-button @click="gohome">回首页</el-button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
