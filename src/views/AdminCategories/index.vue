<template>
  <div class="container py-5">
    <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />
    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input type="text" class="form-control" v-model="newStoreType" placeholder="新增餐廳類別...">
        </div>
        <div class="col-auto">
          <button type="button" class="btn btn-primary" @click="createCategory(newStoreType)">
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">
            #
          </th>
          <th scope="col">
            Category Name
          </th>
          <th scope="col" width="210">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input v-show="category.isEditing" v-model="category.name" type="text" class="form-control">
            <span v-show="category.isEditing" class="cancel">
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button v-show="!category.isEditing" type="button" class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(category.id)">
              Edit
            </button>
            <button v-show="category.isEditing" type="button" class="btn btn-link mr-2"
              @click.stop.prevent="updateCategory(category.id, category.name, category.isEditing)">
              Save
            </button>
            <button type="button" class="btn btn-link mr-2" @click.stop.prevent="deleteCategory(category.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav'
export default {
  methods: {
    //新增
    async createCategory(newStoreType) {
      // TODO: 透過 API 告知伺服器欲新增的餐廳類別...
      try {
        if (newStoreType) {
          // this.categories.unshift({ name: this.newStoreType })
          let result = await this.$api.reqCreateRestaurantCategories({ name: this.newStoreType })
          console.log(result)
          this.newStoreType = '' // 清空原本欄位中的內容
          this.fetchCategories()
        }
      } catch (error) {
        console.log(error)
      }
      // 將新的類別添加到陣列中
    },
    //刪除
    async deleteCategory(id) {
      // this.categories = this.categories.filter(
      //   category => category.id !== id)
      try {
        let result = await this.$api.reqDelteRestaurantCategories(id)
        console.log(result)
        this.fetchCategories()
        alert('刪除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 4. 取得餐廳類別
    async fetchCategories() {
      try {
        let result = await this.$api.reqGetRestaurantsCategories()
        console.log(result)
        this.categories = result.categories.map(category => ({
          ...category,
          isEditing: false
        }))// 在每一個 category 中都添加一個 isEditing 屬性
      } catch (error) {
        console.log(error)
      }

    },
    //編輯
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
          }
        }
        return category
      })
    },
    async updateCategory(categoryId, name, isEditing) {
      // TODO: 透過 API 去向伺服器更新餐廳類別名稱
      console.log(categoryId, name)

      let result = await this.$api.reqChangeRestaurantCategories(categoryId, name)
      console.log(result)
      isEditing = !isEditing
      this.fetchCategories()
    }
  },
  components: {
    AdminNav
  },
  data() {
    return {
      categories: [],
      newStoreType: ''
    }
  },
  created() {
    this.fetchCategories()
  },
  

}
</script>
<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>