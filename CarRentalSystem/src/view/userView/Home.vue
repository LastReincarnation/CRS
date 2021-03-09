<template>
  <div style="width: 1349px">
    <home-nav-bar></home-nav-bar>

    <div class="banner-pic">
      <img id="home-bgd" style="width: 1349px" src="../../assets/photo/homeBgd.jpg" alt="">
    </div>

    <div id="carAddress">
      <ul>
        <li>北京</li>
        <li>上海</li>
        <li>广州</li>
        <li>深圳</li>
        <li>成都</li>
        <li>重庆</li>
        <li @click="toModelQuery">更多</li>
      </ul>
    </div>

    <div style="width: 1343px">
    <div id="nav-photo">
      <img id="nav-img"  src="../../assets/photo/loginBgd.jpg" alt="">
    </div>


    <div id="flexed">
      <div id="details" v-for="(item,index) in carsData">
        <p id="car-name">{{item.carName}}</p>
        <p id="car-price">￥{{item.carPrice}} 元/天</p>
        <p id="car-msg">{{item.carMsg}}</p>
        <img :src='item.carPhoto' alt="" id="car-photo">
      </div>
    </div>
    </div>

    <footer-bar></footer-bar>

  </div>
</template>

<script>
import HomeNavBar from "../../components/client/HomeNavBar";
import FooterBar from "../../components/content/FooterBar";
import axios from "axios";

export default {
name: "Home",
  components:{
    HomeNavBar,
    FooterBar
  },
  data(){
    const carsData = []
    return{
      carsData,
    }
  },
  mounted () {
    this.initMsg();

  },
  methods:{
    initMsg(){
      axios.post("http://localhost:8080/cars/carsAll").then((res)=>{
        console.log(res)
        console.log(res.data.data[1].carAddress)
        this.carsData = res.data.data;
        console.log(this.carsData)
        console.log(this.carsData[1].carAddress)
        return this.carsData
      })
    },
    toModelQuery(){
      this.$router.push('ModelQuery')
    }
  },
  created() {

  }
}
</script>

<style scoped>
  .banner-pic{
    overflow: hidden;
    display: flex;
    justify-content: center;
    width: 100%;
    height: auto;
  }
  #car-bgd{
    min-height: 400px;
  }

  #carAddress{
    width: 504px;
    overflow: hidden;
    display: flex;
    /*padding-top: 8px;*/
    padding-left: 758px;
  }
  ul{
    list-style: none;
    display: block;
    margin-block-start: 1em;
  }
  ul li{
    float: left;
    width: 70px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    cursor: pointer;
    border-width: 1px 1px 0 1px;
    border-style: solid;
    border-color: #ebebeb #ebebeb #fff #ebebeb;
    text-align: center;
    display: list-item;
  }
  ul li:hover{
    color: #23b7b7;
  }

  #nav-photo{

    background-color: #cccccc;
    margin-left: 76px;
    float: left;
    margin-bottom: 10px;
  }
  #nav-img{
    width: 440px;
    height: 396px;
  }
  #flexed{
    margin-right: 76px;
    width: 750px;
    height: 400px ;
    overflow: hidden;
    float: right;
  }
  #details{
    width: 369px;
    height: 196px;
    display: inline-block;
    border: 1px solid #cccccc;
  }
  #car-name{
    font-size: 20px;
    color: #333;
    float: left;
    margin: 10px 140px 0 20px;
  }
  #car-price{
    font-size: 26px;
    color: #E8591D;
    float: right;
    margin: 10px 20px 0 0 ;
  }
  #car-msg{
    font-size: 14px;
    color: #666;
    float: left;
    margin: 11px 0 0 20px;
  }
  #car-photo{
    width: 213px;
    height: 134px;
    float: right;
    margin-top: 26px;
    border: none;
  }


</style>
