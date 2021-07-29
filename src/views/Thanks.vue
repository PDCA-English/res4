<template>
<div id="app">
  <Logo />
  <div class="card">
    <div class="thanks">
      <p>ご予約ありがとうございます</p>
    </div>
    <button  @click="$router.push('/home')">戻る</button>
  </div>
</div>
</template>

<script>
import Logo from "../components/Logo";
export default {
 components: {
   Logo
 },
 methods: {
   returnToResPage() {
     this.$router.push('/')
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
  text-align: center;
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
  background-color: #305CFF;
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  font-weight: bold;
}

.thanks {
  margin: 70px 10px 30px 10px;
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

</style>