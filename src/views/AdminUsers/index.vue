<template>
  <div class="container py-5">
    <AdminNav />
    <div v-if="isLoading" />
    <table v-else class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th scope="col" width="140">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">
            {{ user.id }}
          </th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? 'admin' : 'user' }}</td>
          <td>
            <button v-if="userInfo.id !== user.id" type="button" class="btn btn-link" @click="
              toggleUserRole(user.id,user.isAdmin)
            ">
              {{ user.isAdmin ? 'set as user' : 'set as admin' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AdminNav from '@/components/AdminNav'
export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  created() {
    console.log('@@@登入者的id', this.userInfo)
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true
        const result = await this.$api.reqGetAdminUerInfo()
        if (result.status === 'error') {
          throw new Error(result.message)
        }
        this.users = result.users
        // console.log( this.users)

        this.isLoading = false
        // console.log(this.users)
      } catch (error) {
        console.error(error.message)
        this.isLoading = false

      }
    },
    //變更user權限
    async toggleUserRole(userId, data) {
      try {
        console.log('111111',data)
        console.log('222222',userId)
        data = !data
        console.log('讓我看看',data)
        if(data){
          data = {isAdmin:'1'}
        }else{
          data =  {isAdmin:'0'}
        }
        const result = await this.$api.reqUpdateAdminUerInfo(
          userId,
          data
        )
        console.log(result)
        if (result.status === 'success') {
          this.users[userId-1].isAdmin = !this.users[userId-1].isAdmin
          console.log(this.users[userId-1].isAdmin)
        }
      } catch (error) {
        console.error(error.message)

      }
    },

  }
}
</script>
