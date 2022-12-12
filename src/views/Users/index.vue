<template>
  <div class="container py-5">
    <!-- UserProfileCard -->
    <UserProfileCard :user="user" :is-current-user="userInfo.id === user.id" :initial-is-followed="isFollowed" />

    <div class="row">
      <div class="col-md-4">
        <!-- UserFollowingsCard -->
        <UserFollowingsCard :followings="followings" />

        <!-- UserFollowersCard -->
        <UserFollowersCard :followers="followers" />
      </div>
      <div class="col-md-8">
        <!-- UserCommentsCard -->
        <UserCommentsCard :comments="comments" />

        <!-- UserFavoritedRestaurantsCard -->
        <UserFavoritedRestaurantsCard :favorited-restaurants="favoritedRestaurants" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserProfileCard from '@/components/UserProfileCard'
import UserFollowingsCard from '@/components/UserFollowingsCard'
import UserFollowersCard from '@/components/UserFollowersCard'
import UserCommentsCard from '@/components/UserCommentsCard'
import UserFavoritedRestaurantsCard from '@/components/UserFavoritedRestaurantsCard'

export default {
  name: 'User',
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard
  },
  data() {
    return {
      user: {
        id: 0,
        image: '',
        name: '',
        email: '',
        followingsLength: 0,
        followersLength: 0,
        commentsLength: 0,
        favoritedRestaurantsLength: 0
      },
      isFollowed: false,
      followings: [],
      followers: [],
      comments: [],
      favoritedRestaurants: []

    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  created() {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  },
  methods: {
    async fetchUser(userId) {
      try {
        const result  = await this.$api.reqGetUerAllInfo(userId)
        console.log(result)
        const { profile, isFollowed } = result
        const {
          id,
          image,
          name,
          email,
          Followings,
          Followers,
          Comments,
          FavoritedRestaurants
        } = profile
        const commentSet = new Set()
        this.comments = Comments.filter(
          comment =>
            comment.Restaurant &&
            !commentSet.has(comment.Restaurant.id) &&
            commentSet.add(comment.Restaurant.id)
        )

        this.user = {
          ...this.user,
          id,
          image,
          name,
          email,
          followingsLength: Followings.length,
          followersLength: Followers.length,
          commentsLength: this.comments.length,
          favoritedRestaurantsLength: FavoritedRestaurants.length
        }
        this.isFollowed = isFollowed
        this.followings = Followings
        this.followers = Followers
        this.favoritedRestaurants = FavoritedRestaurants



      } catch (error) {
        console.error(error.message)

      }
    }
  }
}
</script>
