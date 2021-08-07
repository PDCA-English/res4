<template>
<div id="app">
  <Logo />
  <div class="logout">
    <p @click="$router.push('/mypage')">マイページ</p>
    <p class="logoutMargin" @click="$store.dispatch('logout')">ログアウト</p>
  </div>
  <div class="card" id="searchBar">
    <select v-model="selectedArea" class="selected">
      <option>All area</option>
      <option v-for="area in optionAreas" 
        v-bind:value="area" 
        v-bind:key="area">
      {{ area }}
      </option>
    </select>
    <div class="separateOne">|</div>
    <select v-model="selectedGenre" class="selected" >
      <option>All genre</option>
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
  <div class="cardfloat" v-for="(value, index) in shopDetail" :key="`first-${index}`" v-show="allShops">
    <div class="card" >
      <img :src="value.shop.img_url" alt="">
      <p id="shop_name">{{ value.shop.name }}</p>
      <p id="region_genre">#{{ value.shop.region }}#{{ value.shop.genre }}</p>
      <div class="button_img_flex">
        <button @click="
                  $router.push({
                    path: '/shop/' + value.shop.id,
                    params: { id: value.shop.id },
                  })
                ">詳しく見る</button>
        <img class="heart_img" src="../assets/Rheart.png" @click="fav(value.shop.id)" alt="" v-if="value.favorite.length === 1">
        <img class="heart_img" src="../assets/heart.png" @click="fav(value.shop.id)" alt="" v-if="value.favorite.length === 0">
      </div>
    </div>
  </div>
  <div class="cardfloat" v-for="(value, index) in shopsSelected" :key="`second-${index}`" v-show="selectedShops">
    <div class="card" >
      <img :src="value.shop.img_url" alt="">
      <p id="shop_name">{{ value.shop.name }}</p>
      <p id="region_genre">#{{ value.shop.region }}#{{ value.shop.genre }}</p>
      <div class="button_img_flex">
        <button @click="
                  $router.push({
                    path: '/shop/' + value.shop.id,
                    params: { id: value.shop.id },
                  })
                ">詳しく見る</button>
        <img class="heart_img" src="../assets/Rheart.png" alt="" v-if="value.favorite.length === 1">
        <img class="heart_img" src="../assets/heart.png" alt="" v-if="value.favorite.length === 0">
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
      shopDetail: [],
    };
  },
  methods: {
    async getShopsAndOptions() {
      const data = await axios.get(
        "http://127.0.0.1:8001/api/getshops"
      );
      this.shops = data.data.data;
      // console.log("this.shops",this.shops);

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

      let shopDetail = [];
      for (let k = 0; data.data.data.length > k; k++) {
        await axios
          .get(
            "http://127.0.0.1:8001/api/getShopInfo/?id=" +
              data.data.data[k].id
          )
          .then((response) => {
            shopDetail.push(response.data);
          });
      }
      this.shopDetail = shopDetail;

      // console.log("this.shopDetail",this.shopDetail);
      },
    async fav(index) {
      const data = await axios
          .get("http://127.0.0.1:8001/api/favorite", {
            params: {
              shop_id: index,
              user_id: this.$store.state.user.id,
            }
          })
          const result = data.data.data;
          console.log("result",data.data.data);
      if (result) {
        axios({
          method: "delete",
          url: "http://127.0.0.1:8001/api/favorite",
          data: {
            shop_id: index,
            user_id: this.$store.state.user.id,
          },
        }).then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
      } else {
        axios
          .post("http://127.0.0.1:8001/api/favorite", {
            shop_id: index,
            user_id: this.$store.state.user.id,
          })
          .then((response) => {
            console.log(response);
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          });
      }
    }
  },
  created() {
    this.getShopsAndOptions();
  },
  watch: {
    // selectedAreaが入力されたらshopsの表示をv-showで消し、代わりにshopsSelectedを表示する
    selectedArea: function() {
      // エリアとジャンルどちらも指定がない場合は全てのshop一覧を表示
      if(this.selectedGenre === "All genre" && this.selectedArea === "All area"){
        this.allShops = true;
      // エリアの指定がない場合はジャンルのみでフィルターする
      } else if(this.selectedArea === "All area"){
        this.allShops = false;
        this.selectedShops = true;
        this.shopsSelected = this.shopDetail.filter((value) => value.shop.genre === this.selectedGenre);
      // ジャンルの指定がない場合はエリアのみでフィルターする
      } else if(this.selectedGenre === "All genre"){
        this.allShops = false;
        this.selectedShops = true;
        this.shopsSelected = this.shopDetail.filter((value) => value.shop.region === this.selectedArea);
      // エリアとジャンルの両方が表示されている場合はshopを両方の条件でフィルターする
      } else {
        this.allShops = false;
        this.selectedShops = true;
        var areaChecked = this.shopDetail.filter((value) => value.shop.region === this.selectedArea);
        this.shopsSelected = areaChecked.filter((value) => value.shop.genre === this.selectedGenre);
      }
    },
    // selectedGenreが入力されたらshopsの表示をv-showで消し、代わりにshopsSelectedを表示する
    selectedGenre: function() {
      // エリアとジャンルどちらも指定がない場合は全てのショップ一覧を表示
      if(this.selectedGenre === "All genre" && this.selectedArea === "All area"){
        this.allShops = true;
      // ジャンルの指定がない場合はエリアのみでフィルターする
      } else if(this.selectedGenre === "All genre"){
        this.allShops = false;
        this.selectedShops = true;
        this.shopsSelected = this.shopDetail.filter((value) => value.shop.region === this.selectedArea);
      // エリアの指定がない場合はジャンルのみでフィルターする
      } else if(this.selectedArea === "All area"){
        this.allShops = false;
        this.selectedShops = true;
        this.shopsSelected = this.shopDetail.filter((value) => value.shop.genre === this.selectedGenre);
      // エリアとジャンルの両方が表示されている場合はshopを両方の条件でフィルターする
      } else {
        this.allShops = false;
        this.selectedShops = true;
        var genreChecked = this.shopDetail.filter((value) => value.shop.genre === this.selectedGenre);
        this.shopsSelected = genreChecked.filter((value) => value.shop.region === this.selectedArea);
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
      // console.log("this.shopDetail.shop",this.shopDetail[0].shop);
      // console.log("this.shopDetail.shop[1]",this.shopDetail.shop[1]);
      // console.log("this.shopDetail.shop[1].region",this.shopDetail.shop[1].region);

      // name, region, genre, infoの中を検索するし一致したもののみshopsSelectedへ入れて表示する
      for(let i = 0; this.shopDetail.length > i; i++) {
        var shopDetail = this.shopDetail[i];
        if(shopDetail.shop.name.indexOf(this.searchWords) !== -1 ||
            shopDetail.shop.region.indexOf(this.searchWords)  !== -1 ||
              shopDetail.shop.genre.indexOf(this.searchWords) !== -1 ||
                shopDetail.shop.info.indexOf(this.searchWords) !== -1) {
              this.shopsSelected.push(shopDetail);
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