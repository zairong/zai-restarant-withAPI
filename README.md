# README

**安裝與操作**:

下載Zip解壓


npm install


npm run serve


**搭配後端**:


使用MySQL---> CREATE DATABASE forum;


forum-express:


下載forum-express  https://github.com/zairong/forum-express


打開終端機:

npm install


npx sequelize db:migrate


npx sequelize db:seed:all


npm run dev


開啟"http://localhost:3000 API本地接口


**前台**
* 權限帳號:root@example.com
* 密碼:12345678
* 使用者可以註冊/登入/登出網站
* 使用者可以在瀏覽所有餐廳與個別餐廳詳細資料
* 在瀏覽所有餐廳資料時，可以用分類篩選餐廳
* 使用者可以對餐廳留下評論
* 使用者可以收藏餐廳
* 使用者可以查看最新上架的 10 筆餐廳
* 使用者可以查看最新的 10 筆評論
* 使用者可以編輯自己的個人資料
* 使用者可以查看自己評論過、收藏過的餐廳
* 使用者可以追蹤其他的使用者
* 使用者可以查看自己追蹤中的使用者與正在追蹤自己的使用者
