<template>
<div id="app">
  <Logo />
  <div class="logout">
    <p @click="$router.push('/mypage')" v-if="this.$store.state.user.type === 1">マイページ</p>
    <p @click="$router.push('/home')" v-if="this.$store.state.user.type === 3">ホーム</p>
    <p class="logoutMargin" @click="$store.dispatch('logout')">ログアウト</p>
  </div>
  <div class="info" v-if="this.$store.state.user.type === 1">
    <div class="infoHead">
      <button @click="$router.push('/home')">&lt;</button>
      <h1>{{shopInfo.shop.name}}</h1>
    </div>
    <img :src="shopInfo.shop.img_url" alt="">
    <div class="infoContent">
      <p>#{{shopInfo.shop.region}}#{{shopInfo.shop.genre}}</p>
      <p>{{shopInfo.shop.info}}</p>
    </div>
  </div>
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
  <div class="reservation" v-if="this.$store.state.user.type === 1">
    <h2>予約</h2>
    <p class="explanation">ご予約の人数を選択ください。</p>
    <select name="number" v-model="number">
      <option v-for="(n, nIndex) in 10" v-bind:key="nIndex" v-bind:value="n">{{ n }}人</option>
    </select>
    <p class="explanation">空き状況を確認したい日程の開始日を選択してください。</p>
    <!-- ここで選択した場合はstartDateが選択した日付になり、選択しない場合はstartDateは今日になる -->
    <select name="startDate" v-model="startDate">
      <!-- 配列の要素が「○月✕日」のように表示されればそこから、その日の月と日で表示できるが現状では無理やり配列に新たな要素を作ってmonthAheadDate[3]としてはめ込んでいる-->
      <option v-for="(dateOneMonthAhead, dateIndex) in datesOneMonthAhead" v-bind:key="dateIndex" v-bind:value="dateOneMonthAhead[0]">{{dateOneMonthAhead[1]}}年{{dateOneMonthAhead[2]}}月{{dateOneMonthAhead[3]}}日（{{dateOneMonthAhead[4]}}）</option>
    </select>
    <!-- numberを入力すると下記が表示される -->
      <table v-show="number" id="reservationTable">
        <tr>
          <th></th>
          <!-- startDateが入っていれば選んだ日付から一週間が、入っていなければ今日から一週間が表示される -->
          <th v-for="(date, index) in dates" v-bind:key="index" v-show="number">{{date[2]}}/{{date[3]}}（{{date[4]}}）</th>
        </tr>
        <!-- 時間の配列と空き状況ははバックエンドから持ってくる -->
        <tr v-for="(time, timeIndex) in times" v-bind:key="`timeIndex-${timeIndex}`">
          <td>{{time}}</td>
          <td v-for="(availability, index) in availabilityArray" v-bind:key="`index-${index}`" id="hover">
            <input type="radio"
                    v-if="availability[timeIndex+1][time]===true" 
                    name="check" :id="[timeIndex+1]+[index]" 
                    :value="time" 
                    @click="setDateTime(availability[0][0],availability[0][1],availability[0][2],availability[0][3],availability[0][4],time)">
              <label :for="[timeIndex+1]+[index]" v-if="availability[timeIndex+1][time]===true">
                ⚫
              </label>
            <p v-if="availability[timeIndex+1][time]===false || availability[timeIndex+1][time]===null">
              ✕
            </p>
            </td>
        </tr>
       
      </table>
    
    <div class="summary">
      <table>
        <tr>
          <th>Shop</th>
          <td>{{shopInfo.shop.name}}</td>
        </tr>
        <tr>
          <th>Date</th>
          <!-- ここも本来はgetMonth的な関数で持って来れるようにするべき -->
          <td v-show="date">{{chosenYear}}年{{chosenMonth}}月{{chosenDate}}日（{{chosenDay}}）</td>
        </tr>
        <tr>
          <th>Time</th>
          <td>{{time}}</td>
        </tr>
        <tr>
          <th>Number</th>
          <td>{{number}}</td>
        </tr>
      </table>
    </div>
    <!-- 時間の指定まで終わった場合は予約の確定ボダンが表示される -->
  <button @click="confirmDateTime" v-show="time">予約する</button>
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
 props: ["id"],
 data() {
   return {
     user_id: this.$store.state.user.id,
     shopInfo: "",
     availabilityArray: [],
     availabilityArra: [],
     datesOneMonthAhead: [],
     dataFromBack: [],
     dates: [],
     times: [],
     chosenYear: "",
     chosenMonth: "",
     chosenDate: "",
     chosenDay: "",
     date: "",
     time: "",
     number: "",
     startDate: new Date(),
   }
 },
 async created() {
   this.getShopInfo();
 },
 methods: {
   setDateTime(date, chosenYear, chosenMonth, chosenDate, chosenDay, time) {
     this.date = date;
     this.chosenYear = chosenYear;
     this.chosenMonth = chosenMonth;
     this.chosenDate = chosenDate;
     this.chosenDay = chosenDay;
     this.time = time;
   },
  //  ここで予約を確定するために日時、人数、ショップID、ユーザーIDをバックに送る
   confirmDateTime() {
    axios
      .get("https://fierce-forest-20676.herokuapp.com/api/confirmDateTime", {
        params: {
          shop_id: this.id,
          user_id: this.user_id,
          date: this.date,
          time: this.time,
          number: this.number,
        }
      })
      .then(() => {
        this.$router.push('/thanks')
      })
   },
   async getShopInfo() {
     const data = await axios.get(
       "https://fierce-forest-20676.herokuapp.com/api/getShopInfo/?id=" + this.id
     )
     this.shopInfo = data.data;
    //  console.log("this.shopInfo",this.shopInfo);
     
   },
   async getSlot() {
     const data = await axios.get(
       "https://fierce-forest-20676.herokuapp.com/api/getSlot/",{
         params: {
           shop_id: this.id,
           user_id: this.user_id,
           startDate: this.startDate,
           number: this.number,
           open: this.shopInfo.shop.open,
           close: this.shopInfo.shop.close,
           period: this.shopInfo.shop.period,
         }
       })
     this.dataFromBack = data.data;
     this.datesOneMonthAhead = this.dataFromBack.datesOneMonthAhead;
     this.dates = this.dataFromBack.dates;
     this.times = this.dataFromBack.times;
     this.availabilityArray = this.dataFromBack.day_available_array;
    //  人数や日程を変更した後もその前に選択した日時が残るのでリセットする
     this.date = "";
     this.chosenYear = "";
     this.chosenMonth = "";
     this.chosenDate = "";
     this.chosenDay = "";
     this.time = "";
   },
  //  店舗情報を更新する
   updateShop() {
    axios
      .put("https://fierce-forest-20676.herokuapp.com/api/updateShopInfo", {
        id: this.shopInfo.shop.id,
        name: this.shopInfo.shop.name,
        img_url: this.shopInfo.shop.img_url,
        region: this.shopInfo.shop.region,
        genre: this.shopInfo.shop.genre,
        info: this.shopInfo.shop.info,
      })
      .then((response) => {
        console.log(response);
        this.$router.go({
          path: this.$router.currentRoute.path,
          force: true,
        });
      });
   },
  //  店舗情報を削除する
   deleteShop() {
     axios
       .delete(
         "https://fierce-forest-20676.herokuapp.com/api/deleteShop/?id=" +
           this.id
       )
       .then(() => {
         this.$router.push('/home')
         })
   }
 },
 watch: {
   
  //  ＊＊＊＊＊＊＊＊＊＊
  number: function(){
    this.getSlot();
  },

  startDate: function(){
    this.getSlot();
    console.log("startDate",this.startDate);
  },

  // date: function(){
  //   this.getSlot();
  // },

  // time: function(){
  //   this.getSlot();
  // }

 }
};
</script>

<style scoped>
#app {
  display: flex;
}

.info {
  position: relative;
  padding: 150px 100px; 
  width: 50%;
}

.infoHead {
  display: flex;
  margin-bottom: 30px;
}

img {
  width: 120%;
}

.reservation {
  width: 50%;
  background-color: #305CFF;
  border-radius: 5px;
  margin: 155px 50px 30px 50px;
  height: 50%;
  padding-top: 20px;
  color: #fff;
  position: relative;
  box-shadow: 2px 2px 4px gray;

}

.reservation button {
  position: relative;
  bottom: 0;
  text-align: center;
  width: 100%;
  height: 60px;
  background-color: #0238FF;
  padding: 10px 0;
  margin: 0;
  border-radius: 0 0 5px 5px;
  color: #fff;
  font-size: 15px;
}

button {
  background-color: #fff;
  border-radius: 5px;
  border: none;
  width: 45px;
  height: 45px;
  font-size: 30px;
  margin-right: 20px;
  box-shadow: 2px 2px 4px gray;
}

h1 {
  margin: 0;
}

input, select {
  display: block;
  height: 40px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: none;
  padding-left: 10px;
}

select {
  width: 40vw;
}

h2, input, select {
  margin-right: 30px;
  margin-left: 30px;
}

.summary {
  background-color: #4D7EFF;
  margin-left: 30px;
  border-radius: 5px;
  padding: 15px;
  width: 35vw;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}

th {
  width: 10vw;
}

.explanation {
  text-align: left;
  padding-left: 32px;
  margin-bottom: 4px;
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

.infoContent {
  text-align: left;
  width: 120%;
}

.logoutMargin {
  margin-left: 15px;
}

tr {
  height: 30px;
}

input[type=radio] {
  display: none; /* ラジオボタンを非表示にする */
}

input[type="radio"]:checked + label {
  background: #ff3064;/* マウス選択時の背景色を指定する */
  color: #ffffff; /* マウス選択時のフォント色を指定する */
  border-radius: 5px;
  display: block;
}

#hover:hover {
  background-color: #305CFF; /* マウスオーバー時の背景色を指定する */
  color: #ff3064;
  border-radius: 5px;
  font-weight: 900;
}

label {
  width: 100%;
  display: inline-block;
}

.editInfo {
  position: relative;
  padding: 0px 100px 150px 100px;
  top: 150px;
  width: 100%;
}

.editInfo img {
  width: 96%;
}

.editInfo input {
  margin: 10px;
  width: 80%;
  border: 2px solid #305CFF;
}

textarea {
  margin: 10px;
  width: 81%;
  border: 2px solid #305CFF;
  border-radius: 5px;
  height: 100px;
}

.editInfo p {
  background-color: #305CFF;
  color: #ffffff;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  display: block;
  padding: 10px;
  width: 80px;
  margin: 10px;
}

.editFlex {
  display: flex;
}

#shopInfoEdit {
  height: 24px;
}

#updateButton {
  width: 20%;
  background-color: #305CFF;
  color: #ffffff;
  font-weight: bold;
  margin-top: 30px;
}

#updateButton:hover {
  background-color: #ffffff;
  color: #305CFF;
  font-weight: bold;
}

#deleteButton {
  width: 20%;
  background-color: #ff3064;
  color: #ffffff;
  font-weight: bold;
  margin-top: 30px;
}

#deleteButton:hover {
  background-color: #ffffff;
  color: #ff3064;
  font-weight: bold;
}

#flexBtn {
  justify-content: space-around;
}

table p {
  margin: 0px;
}

#reservationTable {
  border-collapse: collapse;

}

#reservationTable td {
  border-bottom: solid 1px #305CFF;
  border-right: solid 1px #305CFF;
  background-color: #ffffff;
  color: #305CFF;
}

#reservationTable th {
  border-bottom: solid 2px #ffffff;
}
</style>