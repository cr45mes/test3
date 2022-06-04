<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div class="welcome">
    <h1>欢迎来到主界面</h1>
    <!-- <el-button>去登录</el-button> -->
    <router-link to="/login">去登录</router-link>
  </div>
</template>

<style scoped>
.welcome {
}
</style>
