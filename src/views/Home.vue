<template>
<div id="app">
  <Logo />
  <div class="logout">
    <p @click="$router.push('/mypage')" v-if="this.$store.state.user.type === 1">マイページ</p>
    <p @click="$router.push('/tableRegister')" v-if="this.$store.state.user.type === 2">座席登録</p>
    <p @click="$router.push('/shopRegister')" v-if="this.$store.state.user.type === 3">店舗登録</p>
    <p class="logoutMargin" @click="$store.dispatch('logout')">ログアウト</p>
  </div>
  <div v-if="this.$store.state.user.type === 1">
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
    <div class="cardfloat" v-for="(value, index) in shops" :key="`first-${index}`" v-show="allShops">
      <div class="card">
        <img :src="value.shop.img_url" alt="">
        <p id="shop_name">{{ value.shop.name }}</p>
        <p id="region_genre">#{{ value.shop.region }}#{{ value.shop.genre }}</p>
        <div class="button_img_flex">
          <button @click="
                    $router.push({
                      path: '/shop/' + value.shop.id,
                      params: { id: value.shop.id },
                    })
                  ">詳しくみる</button>
          <img class="heart_img" src="../assets/Rheart.png" @click="fav(value.shop.id)" alt="" v-if="value.favorite !== null">
          <img class="heart_img" src="../assets/heart.png" @click="fav(value.shop.id)" alt="" v-if="value.favorite === null">
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
                  ">詳しくみる</button>
          <img class="heart_img" src="../assets/Rheart.png" alt="" v-if="value.favorite !== null">
          <img class="heart_img" src="../assets/heart.png" alt="" v-if="value.favorite === null">
        </div>
      </div>
    </div>
  </div>
  <div v-if="this.$store.state.user.type === 2">
    <div class="shopInfoFlex">
      <div class="shopInfoContent">
        <h1>{{shopInfo.shop.name}}</h1>
        <img :src="shopInfo.shop.img_url" alt="">
        <div class="infoContent">
          <p>#{{shopInfo.shop.region}}#{{shopInfo.shop.genre}}</p>
          <p>{{shopInfo.shop.info}}</p>
        </div>
      </div>
      <div v-if="shopInfo.reservation=[]">
        <h1 id="listOfReservation">予約はありません</h1>
      </div>
      <div v-for="(value, index) in shopInfo.reservation" :key="index">
        <h1 id="listOfReservation">予約一覧</h1>
        <table class="summary">
          <img 
            class="reservationImg" 
            src="../assets/cross.png"
            @click="del(value.id)" 
            alt="">
          <tr>
            <th>Table No.</th>
            <td>{{value.table_id}}</td>
          </tr>
          <tr>
            <th>Date/Time</th>
            <td>{{value.date_time}}</td>
          </tr>
          <tr>
            <th>Number</th>
            <td>{{value.number_of_people}}</td>
          </tr>
        </table>
      </div>
    </div>

  </div>
  <div v-if="this.$store.state.user.type === 3">
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
    <div class="cardfloat" v-for="(value, index) in shops" :key="`first-${index}`" v-show="allShops">
      <div class="card">
        <img :src="value.shop.img_url" alt="">
        <p id="shop_name">{{ value.shop.name }}</p>
        <p id="region_genre">#{{ value.shop.region }}#{{ value.shop.genre }}</p>
        <button @click="
                  $router.push({
                    path: '/shop/' + value.shop.id,
                    params: { id: value.shop.id },
                  })
                ">情報を編集する</button>
      </div>
    </div>
    <div class="cardfloat" v-for="(value, index) in shopsSelected" :key="`second-${index}`" v-show="selectedShops">
      <div class="card" >
        <img :src="value.shop.img_url" alt="">
        <p id="shop_name">{{ value.shop.name }}</p>
        <p id="region_genre">#{{ value.shop.region }}#{{ value.shop.genre }}</p>
        <button @click="
                  $router.push({
                    path: '/shop/' + value.shop.id,
                    params: { id: value.shop.id },
                  })
                ">情報を編集する</button>
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
      shopInfo: [],
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
        "http://127.0.0.1:8001/api/getShopDetail",{
          params: {
            user_id: this.id,
          }
        });
      this.shops = data.data;
      // console.log("this.shops",this.shops);

      // エリアの選択肢をshopsから抽出
      for(let i = 0; this.shops.length > i; i++) {
        if(this.optionAreas.includes(this.shops[i].shop.region) == false){
          this.optionAreas.push(this.shops[i].shop.region);
          // console.log('this.optionAreas',this.optionAreas)
        }
      }
      // ジャンルの選択肢をshopsから抽出
      for(let j = 0; this.shops.length > j; j++) {
        if(this.optionGenres.includes(this.shops[j].shop.genre) == false){
          this.optionGenres.push(this.shops[j].shop.genre);
          // console.log('this.optionGenres',this.optionGenres)
        }
      }

      // let shopDetail = [];
      // for (let k = 0; data.data.data.length > k; k++) {
      //   await axios
      //     .get(
      //       "http://127.0.0.1:8001/api/getShopInfo/?id=" +
      //         data.data.data[k].id
      //     )
      //     .then((response) => {
      //       shopDetail.push(response.data);
      //     });
      // }
      // this.shopDetail = shopDetail;

      // console.log("this.shopDetail",this.shopDetail);
    },
    async getShopInfo() {
      const data = await axios.get(
        "http://127.0.0.1:8001/api/getShopInfo/?id=" + this.id
        );
      this.shopInfo = data.data;
      console.log("this.shopInfo",this.shopInfo);
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
          // console.log("result",data.data.data);
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
    },
    // 予約を削除する
    del(index) {
    //  console.log("index",index)
      axios
        .delete(
          "http://127.0.0.1:8001/api/deleteReservation/?id=" +
            index
        )
        .then((response) => {
          console.log(response);
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true,
          });
        });
    },
  },
  created() {
    this.getShopsAndOptions();
    this.getShopInfo();
  },
  watch: {
    // selectedAreaが入力されたらshopsの表示をv-showで消し、代わりにshopsSelectedを表示する
    selectedArea: function() {
      // エリアとジャンルどちらも指定がない場合は全てのshop一覧を表示
      if(this.selectedGenre === "All genre" && this.selectedArea === "All area"){
        this.allShops = true;
        this.selectedShops = false;
      // エリアの指定がない場合はジャンルのみでフィルターする
      } else if(this.selectedArea === "All area"){
        this.allShops = false;
        this.selectedShops = true;
        this.shopsSelected = this.shops.filter((value) => value.shop.genre === this.selectedGenre);
      // ジャンルの指定がない場合はエリアのみでフィルターする
      } else if(this.selectedGenre === "All genre"){
        this.allShops = false;
        this.selectedShops = true;
        this.shopsSelected = this.shops.filter((value) => value.shop.region === this.selectedArea);
      // エリアとジャンルの両方が表示されている場合はshopを両方の条件でフィルターする
      } else {
        this.allShops = false;
        this.selectedShops = true;
        var areaChecked = this.shops.filter((value) => value.shop.region === this.selectedArea);
        this.shopsSelected = areaChecked.filter((value) => value.shop.genre === this.selectedGenre);
      }
    },
    // selectedGenreが入力されたらshopsの表示をv-showで消し、代わりにshopsSelectedを表示する
    selectedGenre: function() {
      // エリアとジャンルどちらも指定がない場合は全てのショップ一覧を表示
      if(this.selectedGenre === "All genre" && this.selectedArea === "All area"){
        this.allShops = true;
        this.selectedShops = false;
      // ジャンルの指定がない場合はエリアのみでフィルターする
      } else if(this.selectedGenre === "All genre"){
        this.allShops = false;
        this.selectedShops = true;
        this.shopsSelected = this.shops.filter((value) => value.shop.region === this.selectedArea);
      // エリアの指定がない場合はジャンルのみでフィルターする
      } else if(this.selectedArea === "All area"){
        this.allShops = false;
        this.selectedShops = true;
        this.shopsSelected = this.shops.filter((value) => value.shop.genre === this.selectedGenre);
      // エリアとジャンルの両方が表示されている場合はshopを両方の条件でフィルターする
      } else {
        this.allShops = false;
        this.selectedShops = true;
        var genreChecked = this.shops.filter((value) => value.shop.genre === this.selectedGenre);
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
      for(let i = 0; this.shops.length > i; i++) {
        var shops = this.shops[i];
        if(shops.shop.name.indexOf(this.searchWords) !== -1 ||
            shops.shop.region.indexOf(this.searchWords)  !== -1 ||
              shops.shop.genre.indexOf(this.searchWords) !== -1 ||
                shops.shop.info.indexOf(this.searchWords) !== -1) {
              this.shopsSelected.push(shops);
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
  height: 286px;
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

.shopInfoContent {
  position: relative;
  top: 88px;
  text-align: left;
  margin: 0px 40px;
  width: 50%;
}

.summary {
  position: relative;
  margin: 5px 20px;
  background-color: #305CFF;
  color: #fff;
  border-radius: 5px;
  padding: 15px;
  height: 80px;
  top: 88px;
}

.shopInfoFlex {
  display: flex;
}

#listOfReservation {
  position: relative;
  top: 88px;
  text-align: left;
  padding-left: 21px;
}

.summary img {
  width: 20%;
  position: relative;
  float: left;
}
</style>