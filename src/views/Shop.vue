<template>
<div id="app">
  <Logo />
  <div class="logout">
    <p @click="$store.dispatch('logout')">ログアウト</p>
  </div>
  <div class="info">
    <div class="infoHead">
      <button @click="$router.push('/home')">&lt;</button>
      <h1>{{shopInfo.name}}</h1>
    </div>
    <img :src="shopInfo.img_url" alt="">
    <div class="infoContent">
      <p>#{{shopInfo.region}}#{{shopInfo.genre}}</p>
      <p>{{shopInfo.info}}</p>
    </div>
  </div>
  <div class="reservation">
    <h2>予約</h2>
    <p class="explanation">ご予約の人数を選択ください。</p>
    <select name="number" v-model="number">
      <option v-for="(n, nIndex) in 10" v-bind:key="nIndex" v-bind:value="n">{{ n }}人</option>
    </select>
    <p class="explanation">空き状況を確認したい日程の開始日を選択してください。</p>
    <select name="startDateCount" v-model="startDateCount">
      <option v-for="(monthAheadDate, dateIndex) in monthAhead" v-bind:key="dateIndex" v-bind:value="monthAheadDate[3]">{{monthAheadDate[0]}}月{{monthAheadDate[1]}}日（{{monthAheadDate[2]}}）</option>
    </select>
      <table v-show="number">
        <tr>
          <th></th>
          <th v-for="(chosenWeekDate, chosenWeekindex) in chosenWeek" v-bind:key="`chosenWeekindex-${chosenWeekindex}`" v-show="startDateCount">{{chosenWeekDate[1]}}月{{chosenWeekDate[2]}}日（{{chosenWeekDate[3]}}）</th>
          <th v-for="(thisWeekDate, thisWeekindex) in thisWeek" v-bind:key="`thisWeekindex-${thisWeekindex}`" v-show="!startDateCount">{{thisWeekDate[0]}}月{{thisWeekDate[1]}}日（{{thisWeekDate[2]}}）</th>
        </tr>
        <tr v-for="(time, trindex) in timeList" v-bind:key="`trindex-${trindex}`">
          <td>{{time}}</td>
          <td v-for="(availability, index) in dateList" v-bind:key="`index-${index}`" @click="setDateTime([trindex],[index])">{{availability[trindex]}}</td>
        </tr>
       
      </table>
    
    <div class="summary">
      <table>
        <tr>
          <th>Shop</th>
          <td>{{shopInfo.name}}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td v-show="date">{{date[1]}}月{{date[2]}}日（{{date[3]}}）</td>
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
     shopInfo: "",
     date: "",
     time: "",
     number: "",
     row: "",
     colmun: "",
     trindex: "",
     startDateCount: "",
     shop_id: 1,
     startDate: "",
     thisWeek: [],
     chosenWeek: [],
     monthAhead: [],
     joinWord: "",
     availablity: [],
     allReservationData: [],
     timeList: [
       "10:00",
       "10:30",
       "11:00",
       "11:30",
       "12:00",
       "12:30",
       "13:00",
       "13:30",
       "14:00",
       "14:30",
       "15:00",
       "15:30",
       "16:00",
       "16:30",
       "17:00",
       "17:30",
       "18:00",
       "18:30",
       "19:00",
       "19:30",
       "20:00",
       "20:30",
       "21:00",
       "21:30",
       "22:00",
       "22:30",
     ],
     dateList: [
       [
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
       ],
       [
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
       ],
       [
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
       ],
       [
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
       ],
       [
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
       ],
       [
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
       ],
       [
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
         "◯",
       ],
     ],
   }
 },
 async created() {
   for(let i = 0; i < 7; i++) {
     if (i === 0) {
       var today = new Date();
      //  console.log("today",today);
       this.thisWeek = new Array();
     }
     var dateAndDay = [];

     var dateList = ["日","月","火","水","木","金","土"];
     var day = dateList[today.getDay()];

     dateAndDay.push(today.getMonth()+1);
     dateAndDay.push(today.getDate());
     dateAndDay.push(day);
    //  console.log(dateAndDay)

     today.setDate(today.getDate() + 1);
    //  console.log("today",today)

     this.thisWeek.push(dateAndDay);
     dateAndDay = [];
    //  console.log(this.thisWeek)
   }
   for(let i = 0; i < 30; i++) {
     if (i === 0) {
       var todaymonthAhead = new Date();
       this.monthAhead = new Array();
     }
     var dateAndDaymonthAhead = [];

     var dateListmonthAhead = ["日","月","火","水","木","金","土"];
    //  console.log("todaymonthAhead.getDay()",todaymonthAhead.getDay());
     var daymonthAhead = dateListmonthAhead[todaymonthAhead.getDay()];

     dateAndDaymonthAhead.push(todaymonthAhead.getMonth()+1);
     dateAndDaymonthAhead.push(todaymonthAhead.getDate());
     dateAndDaymonthAhead.push(daymonthAhead);
     dateAndDaymonthAhead.push(i);
    //  console.log(dateAndDay)

     todaymonthAhead.setDate(todaymonthAhead.getDate() + 1);
    //  console.log("todaymonthAhead",todaymonthAhead);

     this.monthAhead.push(dateAndDaymonthAhead);
     dateAndDaymonthAhead = [];
    //  console.log(this.monthAhead)
   }
   this.getShopInfo();
 },
 methods: {
   setDateTime(row, column) {
     var date = ""
     if (this.startDateCount) {
       date = this.chosenWeek[column];
     } else {
       date = this.thisWeek[column];
     }
    //  console.log("date", date);
     var time = this.timeList[row];
    //  console.log("time", time);
     this.date = date;
     this.time = time;
     this.row = row[0];
    //  console.log("row", row[0]);
     this.column = column[0];
    //  console.log("column", column[0]);
   },
   confirmDateTime() {
    this.dateList[this.column][this.row] = "✕";
    this.row = "";
    this.colmun = "";
    this.$router.push('/about')
   },
   async getShopInfo() {
     const data = await axios.get(
       "http://127.0.0.1:8001/api/getShopInfo/?id=" + this.id
     )
     this.shopInfo = data.data
   }
},
 watch: {
   startDateCount: function() {
     axios.post("http://127.0.0.1:8001/api/reservations/", {
       number: this.number,
       shop_id: 1,
       startDate: this.startDate,
     })
     .then(res =>  {
       this.availablity = res.data.availablity;
       }).catch( error => { console.log(error); });

    for(let i = 0; i < 7; i++) {
      if (i === 0) {
        var todayStart = new Date();
        // console.log("this.startDateCount",this.startDateCount);

        todayStart.setDate(todayStart.getDate() + this.startDateCount);
        this.startDate = todayStart;
        // console.log("this.startDate",this.startDate);
        // console.log("this.start_date",this.start_date);
        // console.log("todayStart",todayStart);
        this.chosenDate = todayStart;

        this.chosenWeek = new Array();
      }
      var dateAndDayStart = [];

      var dateListStart = ["日","月","火","水","木","金","土"];
      // console.log("todayStart.getDay()",todayStart.getDay());
      var dayStart = dateListStart[todayStart.getDay()];

      dateAndDayStart.push(todayStart.getFullYear());
      dateAndDayStart.push(todayStart.getMonth()+1);
      dateAndDayStart.push(todayStart.getDate());
      this.joinWord = dateAndDayStart.join("-");
      dateAndDayStart.push(dayStart);
      dateAndDayStart.push(this.joinWord);
      dateAndDayStart.push(todayStart);
      // console.log("dateAndDayStart",dateAndDayStart);

      todayStart.setDate(todayStart.getDate() + 1);
      //  console.log("this.start_date",this.start_date);

      this.chosenWeek.push(dateAndDayStart);
      dateAndDayStart = [];
      console.log("chosenWeek",this.chosenWeek)
   }
   }
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
</style>