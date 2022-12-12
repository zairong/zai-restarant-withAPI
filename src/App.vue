<template>
  <div id="app">
    <!-- 頭部 -->
    <NavBar />
    <main role="main" class="mt-5 bg-white">
      <!-- main -->
      <router-view />
    </main>
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavTabs from '@/components/NavTabs'
export default {
  name: 'App',
  components:{
    NavTabs
  }
}
</script>
<style scoped>
  main {
    margin-top: 65px !important;
  }
</style>
