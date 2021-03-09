<template>
  <div>
    <home-nav-bar></home-nav-bar>

<!--    筛选车辆信息-->
    <div id="filter-bar">
<!--      选择时间地点-->
      <div id="search-box">
        <div id="city-box">
          <img id="city-box-img" src="../../assets/icon/city-box-em.png" alt="">
          <span>上海</span>
          <span id="pick-up-city">[切换]</span>
        </div>

        <div id="time-box">
          <img id="time-box-img" src="../../assets/icon/time-box-img.png" alt="">
          <span>取车时间</span>
            <el-date-picker
              id="pick-up-data"
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-time-picker id="pick-up-time"
              v-model="value2"
              :picker-options="{selectableRange: '8:00:00 - 23:00:00'}"
              placeholder="选择时间">
            </el-time-picker>

          <span>还车时间</span>
          <el-date-picker
            id="return-data"
            v-model="value3"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-time-picker id="return-time"
                          v-model="value4"
                          :picker-options="{selectableRange: '8:00:00 - 23:00:00'}"
                          placeholder="选择时间">
          </el-time-picker>
        </div>

        <div id="btn-box">
          <input id="submit" type="text" value="查询">
        </div>
      </div>

      <div id="brand-box">
<!--      选择车辆类型-->
        <div id="type-box" >
          <span>类型:</span>
          <a href="javascript:" class="car-level"
            v-for="(item,index) in carLevelList"
          :class="levelList===index?'car-level-enter':''"
          @mouseenter="carLevelListEnter(index)"
          @mouseleave="carLevelListLeave()">{{item}}</a>
        </div>

<!--      选择车辆品牌-->
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
      </div>

    </div>

<!--    展示车辆-->
    <div id="show-car">
      <div class="car-list" v-for="(item,index) in filterBrand.slice(0,mounts)"
           :class="currentI===index?'enterCarBg':''"
           @mouseenter="enterCar(index)" @mouseleave="leaveCar()">
        <img id="car-photo" :src='item.carPhoto' alt="" >
        <span id="car-name">{{item.carName}}</span>
        <i id="car-msg">{{item.carMsg}}</i>
      </div>
<!--      点击加载更多-->
        <button @click="loadMore" v-if="mounts<carsData.length">+加载更多</button>
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
name: "ModelQuery",
  components:{
    HomeNavBar,
    FooterBar
  },
  data(){
    const carsData = []
    const domes = []
    return{
      carsData,
      brand: null,
      domes,
      newBrands:[],
      //时间选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      //清空时间
      value1: '',
      value2: '',
      value3: '',
      value4: '',

      //车辆类型
      carLevelList:['经济型','舒适型','精英型','商务型','SUV','电动型'],
      levelList:null,

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
  mounted () {
    this.initMsg();
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
  methods:{
    initMsg(){
      axios.post("http://localhost:8080/cars/carsAll").then((res)=>{
        this.carsData = res.data.data;
        return this.carsData
      })
    },

    carLevelListEnter(index){
      this.levelList = index
    },
    carLevelListLeave(){
      this.levelList = null
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
      // return this.carsData.filter(value => {
      //   value.carName === this.carsData[index].carName
      //   console.log(this.carsData[index].carName)
      //   console.log(value[0].carName)
      //   return value[0].carName
      // })
      this.currentActive = index
      this.domes = null
      this.brand = null
      this.domes = document.getElementsByClassName('brand-name')
      this.brand = Array.prototype.slice.call(this.domes)[index].innerText
      // console.log(this.brand)
    },
    filerBrandsAll(index){
      this.currentActive = index
      this.domes = null
      this.brand = null
      this.domes = document.getElementsByClassName('brand-name-all')
      this.brand = Array.prototype.slice.call(this.domes)[index].innerText
      // console.log(this.brand)
    }
  },

  filters:{

  }
}
</script>

<style scoped>

  #search-box{
    height: 60px;
    width: 1180px;
    margin: 20px 80px;
    border: 1px solid #cccccc;
    color: #666666;
  }
  #city-box{
    height: 60px;
    width: 172px;
    border-right: 1px solid #ccc;
    float: left;
    position: relative;
    font-size: 22px;
    line-height: 40px;
    text-indent: 75px;
    background-color: #f5f5f5;
  }
  #city-box-img{
    width: 26px;
    height: 26px;
    display: block;
    position: absolute;
    left: 40px;
    top: 15px;
  }

  #time-box{
    height: 47px;
    width: 820px;
    border-right: 1px solid #ccc;
    float: left;
    position: relative;
    padding-left: 43px;
    padding-top: 7px;
    background-color: #f5f5f5;
    /*居中*/
    align-items: center;
    display: flex;
  }
  #time-box-img{
    width: 28px;
    height: 26px;
    display: block;
    position: absolute;
    left: 15px;
    top: 15px;
  }
  #time-box span{
    height: 47px;
    line-height: 47px;
    font-size: 14px;
    font-weight: bolder;
    margin-left: 10px;
    margin-right: 10px;
    display: inline-block;
  }
  #time-box input{
    color: #666;
    height: 30px;
    border: 1px solid #ccc;
    display: inline-block;
    text-indent: 5px;
    line-height: 30px;
    cursor: pointer;
  }
  #btn-box{
    background-color: #f5f5f5;
    height: 60px;
    text-align: center;
  }
  #submit{
    display: inline-block;
    width: 118px;
    height: 36px;
    text-align: center;
    line-height: 45px;
    margin-top: 12px;
    background-color: orange;
    color: #FFF;
    font-size: 14px;
    font-weight: bolder;
    border: 0;
  }

  #pick-up-city{
    cursor: pointer;
    position: absolute;
    height: 20px;
    display: block;
    left: 80px;
    top: 33px;
    font-size: 12px;
    line-height: 20px;
    text-indent: 0;
  }
  div{
    display: block;
  }
  /*选择车辆类型和品牌*/
  #brand-box{
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
    border-bottom: 1px solid #23b7b7;
  }
  #brand-box span{
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
  a{
    text-decoration: none;
  }
  #type-box a{
    font-size: 14px;
    color: #666;
    cursor: pointer;
    padding: 0 10px;
    display: inline-block;
    vertical-align: 1px;
  }
  #tab-box{
    width: 1010px;
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

  /*.tab-box-all{*/
  /*  color: #23b7b7;*/
  /*  border-bottom: 3px solid #23b7b7;*/
  /*}*/
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
    color: #23b7b7;
    border-bottom: 1px solid #23b7b7;
  }
  .clickActive{
    color: #23b7b7;
    border-bottom: 1px solid #23b7b7;
  }

  /*展示车辆*/
  #show-car{
    width: 1158px;
    border: 2px solid #cccccc;
    padding: 10px;
    zoom: 1;
    margin: 0 80px;
    overflow: hidden;
  }
  .car-list{
    width: 270px;
    height: 255px;
    display: inline-block;
    border: 1px solid #cccccc;
    margin: 7px;
    position: relative;
    cursor: pointer;
    color: #666666;
  }
  #car-photo{
    width: 270px;
    height: 170px;
  }
  #car-name{
    display: inline-block;
    width: 250px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;

    font-weight: bolder;
    text-indent: 12px;
    margin-top: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  #car-msg{
    display: inline-block;
    width: 250px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    font-weight: normal;
    text-indent: 12px;
    font-style: normal;
  }
  .enterCarBg{
    box-shadow: 5px 5px 5px #23b7b7;
  }

/*  点击加载更多*/
  #show-car button{
    width: 220px;
    height: 43px;
    background-color: #23b7b7;
    border: 0;
    border-radius: 5px;

    display: block;
    margin: 0 auto;
  }
  #show-car button:hover{
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
  .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date{
    width: 145px;
  }
  .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--time{
    width: 145px;
  }
  .el-input__inner{
    width: 145px;
    background-position: 110px 13px;
    float: left;
    color: #666;
    height: 40px;
    border: 1px solid #ccc;
    display: inline-block;
    text-indent: 5px;
    line-height: 40px;
    cursor: pointer;
  }
  #pick-up-time{
    display: inline-block;
  }

</style>
