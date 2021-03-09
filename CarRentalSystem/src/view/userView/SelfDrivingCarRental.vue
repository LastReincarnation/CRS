<template>
  <div>
    <home-nav-bar></home-nav-bar>

<!--    时间地点-->
    <div class="term">
<!--      城市-->
      <ul class="first">
        <li>
          <span class="key" >取车城市：</span>
          <div>
            <input class="city-sel" type="text" placeholder="成都">
          </div>
          <span></span>
        </li>
        <li>
          <span class="key" >还车城市：</span>
          <div>
            <input class="city-sel" type="text" placeholder="成都">
          </div>
        </li>
      </ul>
<!--      时间-->
      <ul class="second">
        <li>
          <span class="key">取车时间：</span>
          <el-date-picker
            id="pick-up-data"
            v-model="value1"
            value-format="yyyy-MM-dd"
            @change="getTime1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </li>

        <li>
          <span class="key">还车时间：</span>
          <el-date-picker
            class="return-data"
            v-model="value3"
            value-format="yyyy-MM-dd"
            @change="getTime2"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </li>

      </ul>
      <input id="reviseBtn" type="submit" @click="computedDays">
    </div>

<!--    显示借车天数-->
    <div class="prompt-box">
      <div class="days">
        当前选定租期：{{this.days}}天
      </div>

    </div>

<!--    选车-->
    <div class="car-box-body">
      <div id="type-box" >
        <span>类型:</span>
        <a href="javascript:" class="car-level"
           v-for="(item,index) in carLevelList"
           :class="levelList===index?'car-level-enter':''"
           @mouseenter="carLevelListEnter(index)"
           @mouseleave="carLevelListLeave()">{{item}}</a>
      </div>

<!--    车型品牌-->
      <div id="brand-box-list">
        <span>品牌:</span>
        <div style="display: inline-block; width: 1010px">

          <div id="tab-box">
            <ul>
              <li @mouseenter="enterA"
                  :class="{active:isActive}"
              >热门</li>
              <li class="tab-box-all" @mouseenter="enterB"
                  :class="{active:isActiveAll}">全部</li>
            </ul>
          </div>

          <!--            默认品牌-->
          <div id="tab-con" v-show="seen">
            <a class="brand-name" href="javascript:" v-for="(item,index) in carsData"
               :class="[currentIdx===index?'itemBg':'', currentActive===index?'clickActive':'']"
               @mouseenter="enter(index)" @mouseleave="leave()"
               @click="filerBrands(index)">
              {{item.carName}}
            </a>
          </div>
          <!--            全部品牌-->
          <div id="tab-con-all" v-show="seenAll" >
            <a class="brand-name-all" href="javascript:" v-for="(item,index) in carsData"
               :class="[currentIdx===index?'itemBg':'', currentActive===index?'clickActive':'']"
               @mouseenter="enter(index)" @mouseleave="leave()"
               @click="filerBrandsAll(index)">
              {{item.carName}}
            </a>
          </div>

        </div>
      </div>

<!--      车辆价格-->
      <div class="cars-price">
        <span>价格:</span>
        <a href="javascript:"
           v-for="(item,index) in carPricesList"
           :class="priceList===index?'car-price-enter':''"
           @mouseenter="carPriceListEnter(index)"
           @mouseleave="carPriceListLeave()">{{item}}</a>
      </div>

<!--    车辆排序-->
      <div class="sort">

      </div>

<!--    车辆展示-->
      <div class="det-car-list" v-for="(item,index) in filterBrand.slice(0,mounts)"
           :class="currentI===index?'enterCarBg':''"
           @mouseenter="enterCar(index)" @mouseleave="leaveCar()">
        <ul>
          <li class="licar-picbox">
            <div class="licar-picinfo">
              <img :src='item.carPhoto' alt="">
            </div>
          </li>
          <li>
            <p class="car-name-info">
              <span>{{item.carName}}</span>
            </p>
          </li>
          <li class="licar-info">
            <p class="condition1">
              <span class="car-price">￥{{item.carPrice}}/日均</span>
              <button class='btnOpen'>预定</button>
            </p>
          </li>
        </ul>
      </div>

      <button class="moreBtn" @click="loadMore" v-if="mounts<carsData.length">+加载更多</button>
      <div class="no-more" v-else>没有更多了^_^</div>
    </div>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
import HomeNavBar from "../../components/client/HomeNavBar";
import FooterBar from "../../components/content/FooterBar";
import axios from "axios";

export default {
  name: "SelfDrivingCarRental",
  components:{
    HomeNavBar,
    FooterBar
  },
  data(){
    const carsData = []
    const domes = []
    return{
      //清空时间
      value1:'',
      value2:'',
      value3:'',
      value4:'',
      //借车、还车数据
      year1:'',
      month1:'',
      day1:'',
      year2:'',
      month2:'',
      day2:'',
      days:'',

      carsData,

      //车辆类型
      carLevelList:['经济型','舒适型','精英型','商务型','SUV','电动型'],
      carPricesList:['全部','100以下','100-200','200-300','300以上'],
      levelList:null,
      priceList:null,
      brand: null,
      domes,
      newBrands:[],

      //是否选中当前分类
      isActive:true,
      isActiveAll:false,

      //是否选中当前标签
      currentIdx:null,
      currentActive:null,
      currentCheckIdx:null,

      //是否显示品牌
      seen:true,
      seenAll:false,

      //选中当前车辆
      currentI:null,

      //加载更多
      mounts:20
    }
  },
  computed:{
    //筛选点击的车辆
    filterBrand(){
      if(this.brand===null){
        return this.carsData
      }else{
        for(let i = 0;i<this.carsData.length;i++){
          if(this.brand===this.carsData[i].carName){
            this.newBrands.push(this.carsData[i])
          }
        }
        // console.log(this.newBrands)
        return this.newBrands
      }
    }
  },
  mounted () {
    this.initMsg();
  },
  methods:{
    initMsg(){
      axios.post("http://localhost:8080/cars/carsAll").then((res)=>{
        this.carsData = res.data.data;
        return this.carsData
      })
    },
    //获取借车、还车时间数据
    getTime1(val){
      this.value1=val
      const d = new Date(this.value1);
      this.year1 = d.getFullYear()
      this.month1 = d.getMonth()+1
      this.day1 = d.getDate()
      console.log(this.year1)
      console.log(this.month1)
      console.log(this.day1)
    },
    getTime2(val){
      this.value2=val
      const d = new Date(this.value2);
      this.year2 = d.getFullYear()
      this.month2 = d.getMonth()+1
      this.day2 = d.getDate()
      console.log(this.year2)
      console.log(this.month2)
      console.log(this.day2)
    },
    //计算借车天数
    computedDays(){
      this.days = (this.year2-this.year1)*365 + (this.month2-this.month1)*30 + this.day2-this.day1
    },
    carLevelListEnter(index){
      this.levelList = index
    },
    carLevelListLeave(){
      this.levelList = null
    },
    carPriceListEnter(index){
      this.priceList = index
    },
    carPriceListLeave(){
      this.priceList = null
    },
    enter(idx){
      this.currentIdx = idx
    },
    leave(){
      this.currentIdx =null
    },
    enterA(){
      this.seen = true
      this.seenAll = false;
      this.isActive = true;
      this.isActiveAll = false
    },
    enterB(){
      this.seen = false
      this.seenAll = true;
      this.isActive = false;
      this.isActiveAll = true
    },
    enterCar(index){
      this.currentI = index
    },
    leaveCar(){
      this.currentI = null
    },
    loadMore(){
      this.mounts += 20
    },
    //过滤品牌
    filerBrands(index){
      this.currentActive = index
      this.domes = null
      this.brand = null
      this.domes = document.getElementsByClassName('brand-name')
      this.brand = Array.prototype.slice.call(this.domes)[index].innerText
    },
    filerBrandsAll(index){
      this.currentActive = index
      this.domes = null
      this.brand = null
      this.domes = document.getElementsByClassName('brand-name-all')
      this.brand = Array.prototype.slice.call(this.domes)[index].innerText
    }

  }
}
</script>

<style scoped>

div{
  display: block;
}

.term{
  height: 100px;
  width: 1120px;
  background: #f5f5f5;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  margin: 20px 80px 20px 80px;
  padding-left: 30px;
  padding-right: 30px;
}
.first{
  padding-left: 200px;
}
.second{
  padding-left: 40px;
  padding-right: 30px;

}
.term ul{
  display: inline-block;
}
.term ul li{
  height: 40px;
  width: 300px;
  line-height: 40px;
  padding-bottom: 7px;
  list-style-type: none;
}
.second div{
  display: inline;
}
.key{
  display: inline-block;
  float: left;
  font-size: 18px;
  color: #666666;
  font-weight: bold;
  position: relative;
  cursor: default;
}
.term input{
  width: 145px;
  height: 40px;
  padding: 0 6px;
  line-height: 40px;
  text-align: center;
  color: #666666;
  font-size: 16px;
  border: solid 1px #cdcdcd;
  border-radius: 5px;
}
.city-sel{
  display: inline-block;
  float: left;
  width: 72px;
  margin-right: 4px;
}
#reviseBtn{
  color: white;
  font-size: 20px;
  position: relative;
  border: none;
  cursor: pointer;
  background-color: #23b7b7;
}

.prompt-box{
  display: block;
  width: 200px;
  position: relative;
  top: 0;
  left: 1050px;

}
.days{
  float: right;
}

/*选择车辆类型和品牌*/
.car-box-body{
  position: relative;
  width: 1120px;
  overflow: hidden;
  border: 1px solid #ccc;
  margin: -21px 80px 20px 80px;
  line-height: 30px;
  padding-left: 30px;
  padding-right: 30px;
}
#type-box{
  height: 70px;
}
.car-level-enter{
  /*border-bottom: 1px solid #23b7b7;*/
  border: 1px solid #23b7b7;
}
.car-price-enter{
  border: 1px solid #23b7b7;
}
#type-box span{
  width: 100px;
  display: inline-block;
  font-size: 16px;
  font-weight: bolder;
  color: #666;
  text-align: right;
  line-height: 70px;
}
#brand-box-list span{
  width: 100px;
  display: inline-block;
  font-size: 16px;
  font-weight: bolder;
  color: #666;
  text-align: right;
  line-height: 70px;
}
.cars-price span{
  width: 100px;
  display: inline-block;
  font-size: 16px;
  font-weight: bolder;
  color: #666;
  text-align: right;
  line-height: 70px;
}
#brand-box-list span{
  position: absolute;
  top: 60px;
}
.car-box-body a{
  text-decoration: none;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  padding: 0 10px;
  display: inline-block;
  vertical-align: 1px;
}
#tab-box{
  position: relative;
  overflow: hidden;
  margin-left: 112px;
  margin-bottom: 15px;
}
#tab-box ul{
  height: 32px;
  border-bottom: 1px solid #ccc;
  list-style: none;
}
#tab-box li{
  float: left;
  position: relative;
  height: 30px;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
  margin-right: 5px;
}

.active{
  color: #23b7b7;
  border-bottom: 3px solid #23b7b7;
}
#tab-con{
  display: block;
  height: 60px;
  overflow: hidden;
  margin-top: 15px;
  margin-left: 110px;
}
#tab-con-all{
  display: block;
  margin-left: 110px;
}
#brand-box-list a{
  height: 30px;
  line-height: 30px;
  display: inline-block;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 0 10px;
}
.itemBg{
  /*color: #23b7b7;*/
  /*border-bottom: 1px solid #23b7b7;*/
  border: 1px solid #23b7b7;
}
.clickActive{
  color: #23b7b7;
  border-bottom: 1px solid #23b7b7;
}

/*车辆展示*/
.det-car-list{
  margin: 0 50px;
  padding: 26px 10px 24px 5px;
  min-height: 100px;
  border-bottom: 1px solid #eaeaea;
  position: relative;
}
.det-car-list ul{
  display: table;
  width: 100%;
  list-style: none;
}
.det-car-list li{
  display: table-cell;
  vertical-align: middle;
}
.licar-picinfo {
  position: relative;
}
li img{
  width: 158px;
  height: 100px;
  border: 0;
}
.licar-picbox {
  width: 178px;
  text-align: center;
}
.car-name-info{
  font-size: 16px;
  color: #666;
}
.car-name-info span{
  font-weight: bold;
}
.condition1{
  padding: 20px 0;
  position: relative;
}
.car-price{
  position: absolute;
  right: 100px;
  width: 120px;
  display: inline-block;
  text-align: right;
  color: #EB5C00;
  font-style: normal;
  font-size: 18px;
  margin-right: 2px;
}
.btnOpen{
  background-position: 0 0;
  color: #fff;
  width: 82px;
  height: 29px;
  line-height: 29px;
  position: absolute;
  right: 0;
  background-color: orange;
  text-align: center;
  font-size: 14px;
  display: inline-block;
  border:0;
}

/*  点击加载更多*/
.moreBtn{
  width: 220px;
  height: 43px;
  background-color: #23b7b7;
  border: 0;
  border-radius: 5px;
  display: block;
  margin: 0 auto;
}
.moreBtn:hover{
  cursor: pointer;
}
.no-more{
  font-size: 30px;
  color: #666666;

  margin: 0 auto;
  text-align: center;
}
</style>
<style>
.el-input__inner{
  display: inline;
  width: 200px;
  /*height: 24px;*/
  line-height: 24px;
  font-size: 14px;
}
.el-date-editor .pick-up-data .el-input .el-input--prefix .el-input--suffix .el-date-editor--date{
  width: 500px;
}
.el-input__icon{
  visibility: hidden;
}
</style>
