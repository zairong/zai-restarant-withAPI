<template>
  <div class="mb-3">
    <h1>餐廳後台</h1>
    <router-link to="/admin/restaurants">Restaurants</router-link> |
    <router-link to="/admin/admincategories">Categories</router-link> |
    <router-link :to="{name:'admin-users',params:{id:this.$router.params}}">Users</router-link>
  </div>
</template>

<script>
export default {
  name: 'AdminNav'
}
</script>

<style>

</style>