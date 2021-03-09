<template>
  <div>
    <home-nav-bar></home-nav-bar>

    <el-container>
<!--    侧边栏-->
    <div class="side-bar">
      <el-row class="bar-tac">
        <el-col  :span="12">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical">
            <el-menu-item index="1" @click="tabChange('UserInfo')">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">用户信息</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2" @click="tabChange('OrderInformation')">
              <i class="el-icon-menu"></i>
              <span slot="title">订单信息</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>

      <el-main class="interface">
        <div :is="currentView"></div>
      </el-main>

    </el-container>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
import HomeNavBar from "../../components/client/HomeNavBar";
import FooterBar from "../../components/content/FooterBar";
import UserInfo from "../../components/personal/UserInfo";
import OrderInformation from "../../components/personal/OrderInformation";
import axios from "axios";

export default {
  name: "PersonalInformation",
  components:{
    HomeNavBar,
    FooterBar,
    OrderInformation,
    UserInfo
  },
  data(){
    return{
      activeIndex: '1',
      currentView:''
    }
  },
  methods:{
    tabChange(tabItem) {
      this.currentView = tabItem;
    }
  }
}
</script>

<style scoped>

</style>
<style>
.side-bar{
  width: 180px;
  margin: 20px 80px 0 80px;
  overflow-x: hidden;
}
.el-menu-vertical{
  background-color: #f5f5f5;
  border: 0;
}
.bar-tac{
  background-color: #f5f5f5;
  text-color:"#6b6b6b";
  active-text-color:"#23b7b7"
}

.interface{
  width: 600px;
}
</style>
