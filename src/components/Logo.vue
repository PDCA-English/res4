<template>
<div class="logoBar">
  <div class="logo">
    <img src="../assets/logo.png" alt="">
    <h1>
      Rese
    </h1>
  </div>
</div>
</template>

<style scoped>
.logo {
  position: absolute;
  display: flex;
}

img {
  box-shadow: 2px 2px 4px gray;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  margin-top: 30px;
  margin-left: 60px;
}

h1 {
  color: #305CFF;
  position: relative;
  top: 4px;
  margin-left: 20px;
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
</style>