<template>
  <div class="editInfo" v-if="this.$store.state.user.type === 3">
    <div class="editFlex">
      <p>店舗名</p>
      <input type="text" name="" id="" v-model="shopInfo.shop.name">
    </div>
    <img :src="shopInfo.shop.img_url" alt="">
    <div class="editFlex">
      <p>画像のURL</p>
      <input type="url" name="" id="" v-model="shopInfo.shop.img_url">
    </div>
    <div class="editFlex">
      <p>エリア</p>
      <input type="text" name="" id="" v-model="shopInfo.shop.region">
    </div>
    <div class="editFlex">
      <p>ジャンル</p>
      <input type="text" name="" id="" v-model="shopInfo.shop.genre">
    </div>
    <div class="editFlex">
      <p id="shopInfoEdit">店舗概要</p>
      <textarea name="" id="" v-model="shopInfo.shop.info"></textarea>
    </div>
      <div class="editFlex" id="flexBtn">
        <button id="updateButton" @click="updateShop">更新</button>
        <button id="deleteButton" @click="deleteShop">削除</button>
      </div>
  </div>
</template>