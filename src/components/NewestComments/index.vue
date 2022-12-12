<template>
  <div class="card">
    <div class="card-header">
      最新評論
    </div>
    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <h4><router-link :to="{ name: 'restaurant', params: { id: comment.Restaurant.id } }">
          {{ comment.Restaurant.name }}
          </router-link></h4>
        <p>{{ comment.Restaurant.description }}</p>
        <a>by {{ comment.User.name }}</a>
        <p>{{ comment.User.createdAt | fromNow }}</p>

        <hr>
      </div>
    </div>
  </div>
</template>
<script>


import { fromNowFilter } from '@/utils/mixins'
export default {
  name: 'NewestComments',
  props: ['comments'],
  mixins: [fromNowFilter],
 
}

</script>
<style scoped>
small {
  font-size: 10px;
}
</style>