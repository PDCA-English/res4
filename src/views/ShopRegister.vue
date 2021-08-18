<template>
<div id="app">
  <Logo />
  <div class="logout">
    <p @click="$router.push('/home')">ホーム</p>
    <p class="logoutMargin" @click="$store.dispatch('logout')">ログアウト</p>
  </div>
  <div class="card">
    <p class="title">Registration</p>
    <div class="form">
      <div class="formRow">
        <img src="../assets/user.png" alt="">
        <input placeholder="Name" type="text" v-model="name"/>
      </div>
      <div class="formRow">
        <img src="../assets/email.png" alt="">
        <input placeholder="Email" type="email" v-model="email"/>
      </div>
      <div class="formRow">
        <img src="../assets/pass.png" alt="">
        <input placeholder="Password" type="password" v-model="password"/>
      </div>
      <div class="formRow">
        <img src="../assets/region.png" alt="">
        <input placeholder="Region" type="text" v-model="region"/>
      </div>
      <div class="formRow">
        <img src="../assets/genre.png" alt="">
        <input placeholder="Genre" type="text" v-model="genre"/>
      </div>
      <div class="formRow">
        <img src="../assets/info.png" alt="">
        <textarea placeholder="Info" v-model="info"></textarea>
      </div>
      <div class="formRow">
        <img src="../assets/img_url.png" alt="">
        <input placeholder="img URL" type="url" v-model="img_url"/>
      </div>
      <div class="formRow">
        <img src="../assets/open.png" alt="">
        <input placeholder="Open" type="time" v-model="open"/>
      </div>
      <div class="formRow">
        <img src="../assets/close.png" alt="">
        <input placeholder="Close" type="time" v-model="close"/>
      </div>
      <div class="formRow">
        <img src="../assets/period.png" alt="">
        <input placeholder="Period (minutes)" type="number" v-model="period"/>
      </div>
      <button @click="auth">登録</button>
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
     name: "",
     email: "",
     password: "",
     type: 2,
     region: "",
     genre: "",
     info: "",
     img_url: "",
     open: "",
     close: "",
     period: "",
   }
 },
 methods: {
    auth() {
      axios
        .post("http://127.0.0.1:8001/api/registerShop/", {
          name: this.name,
          email: this.email,
          password: this.password,
          type: this.type,
          region: this.region,
          genre: this.genre,
          info: this.info,
          img_url: this.img_url,
          open: this.open,
          close: this.close,
          period: this.period,
        })
        .then(response => {
          console.log("response",response);
          this.$router.replace("/home");
        })
        .catch(error => {
          alert(error);
        });
    }
 }
};
</script>



<style scoped>
.card {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 25%;
  height: 453px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 2px 2px 4px gray;
}

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

textarea {
  width: 80%;
}


</style>