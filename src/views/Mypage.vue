<template>
<div id="app">
  <Logo />
  <div class="logout">
    <p @click="$router.push('/home')">ホーム</p>
    <p class="logoutMargin" @click="$store.dispatch('logout')">ログアウト</p>
  </div>
  <div class="contentsFlex">
    <div class="bookingInfo">
      <h2>予約状況</h2>
      <div class="card" id="reservationCard" v-for="(reservation, index) in reservations" :key="index">
        <div class="cardHead">
          <div class="cardHeadLeft">
            <img class="reservationImg" src="../assets/clock.png" alt="">
            <div>予約{{index+1}}</div>
          </div>
          <div class="cardHeahRight">
            <img 
              class="reservationImg" 
              src="../assets/cross.png"
              @click="del(reservation[7])" 
              alt="">
          </div>
        </div>
        <div class="summary">
          <table>
            <tr>
              <th>Shop</th>
              <td>{{getShopName(reservation[0])}}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{{reservation[1]}}年{{reservation[2]}}月{{reservation[3]}}日（{{reservation[4]}}）</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{{reservation[5]}}</td>
            </tr>
            <tr>
              <th>Number</th>
              <td>{{reservation[6]}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="favorite">
      <h2>{{ name }}さん</h2>
      <h2>お気に入り店舗</h2>
      <div class="cardfloat" v-for="(shop, index) in shops" :key="`first-${index}`">
        <div class="card" >
          <img :src="shop.img_url" alt="">
          <p id="shop_name">{{ shop.name }}</p>
          <p id="region_genre">#{{ shop.region }}#{{ shop.genre }}</p>
          <div class="button_img_flex">
            <button @click="
                      $router.push({
                        path: '/shop/' + shop.id,
                        params: { id: shop.id },
                      })
                    ">詳しく見る</button>
            <img class="heart_img" src="../assets/heart.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Logo from "../components/Logo";
import axios from "axios";
export default {
  components: {
    Logo
  },
  data() {
    return {
      id: this.$store.state.user.id,
      name: this.$store.state.user.name,
      reservations: [],
      shops: [],
    };
  },
  methods: {
   async getShops() {
     const data = await axios.get(
       "http://127.0.0.1:8001/api/getshops"
     );
     this.shops = data.data.data
   },
   async getMyReservation() {
     const data = await axios.get(
       "http://127.0.0.1:8001/api/getMyReservation/",{
         params: {
           user_id: this.id,
         }
       })
     this.reservations = data.data;
   },

  // 予約を削除する
   del(index) {
    //  console.log("index",index)
     axios
       .delete(
         "http://127.0.0.1:8001/api/deleteReservation/?id=" +
           index
       )
       .then((response) => {
         console.log(response);
         this.$router.go({
           path: this.$router.currentRoute.path,
           force: true,
         });
       });
   },

  // 予約一覧に表示されるshopIDを店名に変換する
   getShopName(shopId) {
     const shopName = this.shops.find(shop => shop.id === shopId);
     return shopName["name"];
   }
   
  },
  created() {
    this.getShops();
    this.getMyReservation();
  }
};
</script>



<style scoped>

img {
  width: 10px;
  margin-right: 5px;
}

input {
  border: none;
  outline: none;
  border-bottom: solid black 1px;
  width: 80%;
}

button {
  float: right;
  margin-right: 8%;
  background-color: #305CFF;
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  font-weight: bold;
}

.formRow {
  margin: 10px 5px;
  text-align: center;
}

.title {
  color: #fff;
  background-color: #305CFF;
  padding: 10px 20px;
  margin: 0px;
  text-align: left;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}

.logout {
  color: #305CFF;
  font-weight: bold;
  display: flex;
  position: absolute;
  top: 27px;
  margin-left: auto;
  width: 94%;
  justify-content: flex-end;
}

.logoutMargin {
  margin-left: 15px;
}

.contentsFlex {
  display: flex;
}

.bookingInfo {
  position: relative;
  top: 132px;
  width: 40%;
  text-align: left;
  padding-left: 2%;
  padding-top: 7%;
}

.favorite {
  position: relative;
  top: 132px;
  width: 60%;
  text-align: left;
  padding-left: 2%;
}

.cardfloat {
  width: 100%;
}

.cardfloat .card {
  float: left;
  width: 210px;
  margin: 0 15px 15px 0;
  height: 267px;
}

.card {
  position: relative;
  border-radius: 10px;
  box-shadow: 2px 2px 4px grey;
  top: 140px;
}

img {
  width: 100%;
  border-radius: 10px 10px 0 0;
}

button {
  float: right;
  margin-right: 8%;
  background-color: #305CFF;
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  font-weight: bold;
}

#shop_name {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin: 0 0 0 14px;
}

#region_genre {
  font-size: 12px;
  text-align: left;
  margin: 0 0 0 14px;
}

.button_img_flex {
  display: flex;
  justify-content: space-between;
  padding: 14px 18px 20px 14px;
}

.heart_img {
  width: 34px;
}

.reservationImg{
  width: 30px;
}

.cardHead {
  display: flex;
  justify-content: space-between;
}

.cardHeadLeft {
  display: flex;
}

#reservationCard {
  background-color: #305CFF;
  color: #fff;
  padding: 18px;
  margin-bottom: 5px;
}
</style>