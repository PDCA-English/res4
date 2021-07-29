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
    </div>
    <div class="favorite">
      <h2>{{ name }}さん</h2>
      <h2>お気に入り店舗</h2>
    </div>
  </div>
</div>
</template>

<script>
import Logo from "../components/Logo";
export default {
  components: {
    Logo
  },
  data() {
    return {
      id: this.$store.state.user.id,
      name: this.$store.state.user.name,
    };
  },
  methods: {
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
  width: 40%;
  text-align: left;
  padding-left: 2%;
}
</style>