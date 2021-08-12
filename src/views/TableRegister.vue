<template>
<div id="app">
  <Logo />
  <div class="logout">
    <p @click="$router.push('/home')">ホーム</p>
    <p class="logoutMargin" @click="$store.dispatch('logout')">ログアウト</p>
  </div>
  <div class="flex">
    <div class="registerTable">
      <h1>座席を登録する</h1>
      <div class="tableInfo">
        <div class="flex">
          <input type="number" v-model="numOfPeopleOne">
          <p>人掛け</p>
          <input type="number" v-model="numOfTableOne">
          <p>席</p>
        </div>
        <div class="flex">
          <input type="number" v-model="numOfPeopleTwo">
          <p>人掛け</p>
          <input type="number" v-model="numOfTableTwo">
          <p>席</p>
        </div>
        <div class="flex">
          <input type="number" v-model="numOfPeopleThree">
          <p>人掛け</p>
          <input type="number" v-model="numOfTableThree">
          <p>席</p>
        </div>
        <button @click="regTables">登録</button>
      </div>
    </div>
    <div class="overview">
      <h1>登録されている座席</h1>
      <div class="registeredInfo" v-for="(value, index) in tables" :key="index">
        <!-- <h1>{{index}}</h1>
        <h2>{{tables[index]}}</h2> -->
        <div class="flex">
          <ul>
            <li>
              {{index}}人掛け{{tables[index]}}席
              <button @click="deleteTable(index)">削除</button>
              </li>
          </ul>
        </div>

<!-- <div v-for='(item, index) in itemList' :key='index'>
  <input v-model='itemList[index]' placeholder=''>
</div> -->

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
     tables: [],
     numOfPeopleOne: "",
     numOfTableOne: "",
     numOfPeopleTwo: "",
     numOfTableTwo: "",
     numOfPeopleThree: "",
     numOfTableThree: "",
    //  registeredTables: [],
   }
 },
 methods: {
   regTables() {
     axios.post("http://127.0.0.1:8001/api/regTables", {
       shop_id: this.$store.state.user.id,
       numOfPeopleOne: this.numOfPeopleOne,
       numOfTableOne: this.numOfTableOne,
       numOfPeopleTwo: this.numOfPeopleTwo,
       numOfTableTwo: this.numOfTableTwo,
       numOfPeopleThree: this.numOfPeopleThree,
       numOfTableThree: this.numOfTableThree,
     })
     .then((response) => {
       console.log(response);
       this.$router.go({
         path: this.$router.currentRoute.path,
         force: true,
       });
     });
   },
   async getTables() {
     const data = await axios.get(
       "http://127.0.0.1:8001/api/getTables",{
         params: {
           shop_id: this.$store.state.user.id,
         }
       });
       this.tables = data.data;
      //  console.log("this.tables",this.tables);
   },
   deleteTable(index) {
    //  console.log("index",index);
    axios
      .delete(
        "http://127.0.0.1:8001/api/deleteTable",{
          params: {
            shop_id: this.$store.state.user.id,
            numberOfPeople: index,
          }
        })
      .then((response) => {
        console.log(response);
        this.$router.go({
          path: this.$router.currentRoute.path,
          force: true,
        });
      });

  //  del(index) {
  //   //  console.log("index",index)
  //    axios
  //      .delete(
  //        "http://127.0.0.1:8001/api/deleteReservation/?id=" +
  //          index
  //      )
  //      .then((response) => {
  //        console.log(response);
  //        this.$router.go({
  //          path: this.$router.currentRoute.path,
  //          force: true,
  //        });
  //      });
  //  },
   },
 },
 created() {
   this.getTables();
 },
};
</script>



<style scoped>
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

.flex {
  display: flex;
  justify-content: center;
}

.registerTable {
  width: 50%;
  top: 88px;
  position: relative;
}

.overview {
  width: 50%;
  top: 88px;
  position: relative;
}

.tableInfo {
  background-color: #305CFF;
  color: #fff;
  font-weight: bold;
  padding: 20px 20px 40px 20px;
  border-radius: 5px;
}

input {
  width: 10%;
}

.flex p {
  margin: 25px 20px 0px 0px;
  height: 30px;

}

.flex input {
  height: 30px;
  margin-top: 20px;
  border-radius: 5px;
}

.tableInfo button {
  background-color: #fff;
  color: #305CFF;
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  width: 30%;
  height: 35px;
  margin-top: 30px;
}

.tableInfo button:hover {
  background-color: #6384fa;
  color: #fff;
}

</style>