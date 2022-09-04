<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <div class="welcome">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">刘子欢后台管理系统</div>
      <div class="secs">应用vue3.0+ElementPlus+Node+Mongo为刘子欢打造的后台管理系统</div>
    </div>
    <div class="img"></div>
  </div>
</template>

<style lang="scss">
.welcome {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .content {
    position: relative;
    bottom: 40px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
    .secs {
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }
  .img {
    margin-left: 105px;
    background-image: url('./../assets/images/welcome.png');
    width: 371px;
    height: 438px;
  }
}
</style>
