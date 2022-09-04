<template>
  
</template>

<script>
export default {
  name: 'BreadCrumb',
  computed: {
    breadList() {
      return this.$route.matched
    }
  }
}
</script>

<style></style>
