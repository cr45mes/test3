<script>
export default {
  name: 'login',
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
