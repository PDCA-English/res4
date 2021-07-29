<template>
<div id="app">
  <Logo />
  <div class="logout">
    <p @click="$router.push('/mypage')">マイページ</p>
    <p class="logoutMargin" @click="$store.dispatch('logout')">ログアウト</p>
  </div>
  <div class="card" id="searchBar">
    <select v-model="selectedArea" class="selected">
      <option hidden>All area</option>
      <option v-for="area in optionAreas" 
        v-bind:value="area" 
        v-bind:key="area">
      {{ area }}
      </option>
    </select>
    <div class="separateOne">|</div>
    <select v-model="selectedGenre" class="selected" >
      <option hidden>All genre</option>
      <option v-for="genre in optionGenres" 
        v-bind:value="genre" 
        v-bind:key="genre">
      {{ genre }}
      </option>
    </select>
    <div class="separateTwo">|</div>
    <input type="text" placeholder="Search ..." v-model="searchWords">
    <img src="../assets/search.png" alt="" id="search">
  </div>
  <div class="cardfloat" v-for="(value, index) in shops" :key="`first-${index}`" v-show="allShops">
    <div class="card" >
      <img :src="value.img_url" alt="">
      <p id="shop_name">{{ value.name }}</p>
      <p id="region_genre">#{{ value.region }}#{{ value.genre }}</p>
      <div class="button_img_flex">
        <button @click="
                  $router.push({
                    path: '/shop/' + value.id,
                    params: { id: value.id },
                  })
                ">詳しく見る</button>
        <img class="heart_img" src="../assets/heart.png" alt="">
      </div>
    </div>
  </div>
  <div class="cardfloat" v-for="(value, index) in shopsSelected" :key="`second-${index}`" v-show="selectedShops">
    <div class="card" >
      <img :src="value.img_url" alt="">
      <p id="shop_name">{{ value.name }}</p>
      <p id="region_genre">#{{ value.region }}#{{ value.genre }}</p>
      <div class="button_img_flex">
        <button @click="
                  $router.push({
                    path: '/shop/' + value.id,
                    params: { id: value.id },
                  })
                ">詳しく見る</button>
        <img class="heart_img" src="../assets/heart.png" alt="">
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
      shops: [],
      selectedArea: "All area",
      selectedGenre: "All genre",
      optionAreas: [],
      optionGenres: [],
      searchWords: "",
      shopsSelected: [],
      allShops: true,
      selectedShops: false,
      wordChangeCounter: 0,
    };
  },
  methods: {
    async getShopsAndOptions() {
      const data = await axios.get(
        "http://127.0.0.1:8001/api/getshops"
      );
      this.shops = data.data.data

      // エリアの選択肢をshopsから抽出
      for(let i = 0; this.shops.length > i; i++) {
        if(this.optionAreas.includes(this.shops[i].region) == false){
          this.optionAreas.push(this.shops[i].region);
          // console.log('this.optionAreas',this.optionAreas)
        }
      }
      // ジャンルの選択肢をshopsから抽出
      for(let j = 0; this.shops.length > j; j++) {
        if(this.optionGenres.includes(this.shops[j].genre) == false){
          this.optionGenres.push(this.shops[j].genre);
          // console.log('this.optionGenres',this.optionGenres)
        }
      }
    }
  },
  created() {
    this.getShopsAndOptions();
  },
  watch: {
    // selectedAreaが入力されたらshopsの表示をv-showで消し、代わりにshopsSelectedを表示する
    selectedArea: function() {
      // ジャンルが設定されていない場合はエリアのみの表示にする
      if(this.selectedGenre === "All genre"){
        this.allShops = false;
        this.selectedShops = true;
        this.shopsSelected = this.shops.filter((value) => value.region === this.selectedArea)
      // エリアとジャンルの両方が表示されている場合はshopを両方の条件でフィルターする
      } else {
        this.allShops = false;
        this.selectedShops = true;
        var areaChecked = this.shops.filter((value) => value.region === this.selectedArea)
        this.shopsSelected = areaChecked.filter((value) => value.genre === this.selectedGenre)
      }
    },
    // selectedGenreが入力されたらshopsの表示をv-showで消し、代わりにshopsSelectedを表示する
    selectedGenre: function() {
      // ジャンルが設定されていない場合はエリアのみの表示にする
      if(this.selectedArea === "All area"){
        this.allShops = false;
        this.selectedShops = true;
        this.shopsSelected = this.shops.filter((value) => value.genre === this.selectedGenre)
      // エリアとジャンルの両方が表示されている場合はshopを両方の条件でフィルターする
      } else {
        this.allShops = false;
        this.selectedShops = true;
        var genreChecked = this.shops.filter((value) => value.genre === this.selectedGenre)
        this.shopsSelected = genreChecked.filter((value) => value.region === this.selectedArea)
      }
    },
    // searchWordsが入力されたらshopsの表示をv-showで消し、代わりにshopsSelectedを表示する
    searchWords: function() {
      // ２回目以降の入力の場合はshopsSelectedの中身を初期化する
      if(this.wordChangeCounter > 0){
        this.shopsSelected = [];
      }
      this.allShops = false;
      this.selectedShops = true;
      this.wordChangeCounter += 1;
      // name, region, genre, infoの中を検索する
      for(var i in this.shops) {
        var shop = this.shops[i];
        if(shop.name.indexOf(this.searchWords) !== -1 ||
            shop.region.indexOf(this.searchWords)  !== -1 ||
              shop.genre.indexOf(this.searchWords) !== -1 ||
                shop.info.indexOf(this.searchWords) !== -1) {
              this.shopsSelected.push(shop);
            }
      }
      return this.shopsSelected
    }
  }
};
</script>



<style scoped>
.cardfloat {
  width: 100%;
}

.cardfloat .card {
  float: left;
  width: calc(23%);
  margin: 0 15px 15px 0;
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

#searchBar {
  position: absolute;
  top: 81px;
  right: 5%;
  width: 40%;
  height: 44px;
}

.selected{
  width: 17%;
  float: left;
  margin: 13px 0px 13px 16px;
}

select {
  border: none;
}

.separateOne {
  display: inline;
  position: relative;
  top: 3px;
  right: 69%;
  font-size: 30px;
  opacity: 0.3;
}

.separateTwo {
  display: inline;
  position: relative;
  top: 3px;
  right: 50%;
  font-size: 30px;
  opacity: 0.3;
}

#search {
  width: 17px;
  position: relative;
  right: 49%;
}

input {
  outline: none;
  border: none;
  width: 46%;
  position: relative;
  float: left;
  top: 9px;
  left: 8%;
  height: 22px;
}

.logoutMargin {
  margin-left: 15px;
}
</style>