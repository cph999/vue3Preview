<script setup>
import Login from '../src/views/login/Login.vue'
import Index from '../src/views/main/Index.vue'
</script>

<template>

<Login></Login>
<!-- <Index></Index> -->
<router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
