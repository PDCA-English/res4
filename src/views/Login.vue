<template>
<div id="app">
  <Logo />
  <div class="register">
    <p id="register" @click="$router.push('/register')">新規登録</p>
  </div>
  <div class="card">
    <p class="title">Login</p>
    <div class="form">
      <div class="formRow">
        <img src="../assets/email.png" alt="">
        <input placeholder="Email" type="email" v-model="email" />
      </div>
      <div class="formRow">
        <img src="../assets/pass.png" alt="">
        <input placeholder="Password" type="password" v-model="password"/>
      </div>
      <button @click="auth">ログイン</button>
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
      email: "",
      password: ""
    };
  },
  methods: {
    auth() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
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
  height: 25%;
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

.register {
  color: #305CFF;
  font-weight: bold;
  display: flex;
  position: absolute;
  top: 27px;
  margin-left: auto;
  width: 94%;
  justify-content: flex-end;
}
</style>