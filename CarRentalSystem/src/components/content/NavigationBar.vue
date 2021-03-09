<template>
  <div style="width: 1349px ; border-bottom: 3px solid #23b7b7;">
    <div id="top-bar">
      <p id="top-bar-welcome">你好！{{user}}&ensp;|&ensp;九州租车</p>
      <ul id="top-bar-item">
        <li>帮助中心</li>
        <li>网站导航</li>
        <li>退出登录</li>
      </ul>
    </div>

    <img id="icon" src="../../assets/photo/icon.png" alt="">
    <dl id="navigation-bar">

      <dt class="bar">
        <router-link class="home" tag="dt" to="/Home">首页</router-link>
      </dt>
      <dt class="bar">
        <router-link class="model-query" tag="dt" to="/ModelQuery">车型查询</router-link>
      </dt>
      <dt class="bar">
        <router-link class="self-driving-carRental" tag="dt" to="/SelfDrivingCarRental">自驾租车</router-link>
      </dt>
      <dt class="bar">
        <router-link class="personal-information" tag="dt" to="/PersonalInformation">个人中心</router-link>
      </dt>

    </dl>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  data(){
    return{
      user:'IU',
    }
  },
  computed:{

  },
  methods:{
  }
}
</script>

<style scoped>
.home.router-link-active,.model-query.router-link-active,.self-driving-carRental.router-link-active,.personal-information.router-link-active{
  color: #23b7b7;
}
#icon{
  margin-top: 10px;
  margin-left: 80px;
  height: 60px;
  float: left;
}

#top-bar{
  background-color: #f2f2f2;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  display: flex;
}

#top-bar-item{
  display: flex;
  /*position: absolute;*/
  float: right;
  /*right: 60px;*/
  margin-left: 900px;
}

#top-bar-welcome{
  margin-left: 80px;
}

li{
  margin-right: 30px;
  cursor: pointer;
  list-style: none;
}

#navigation-bar {
  /* 本身的样式 */
  /*background-color: #f6f6f6;*/
  height: 80px;
  /*border-top: 1px solid #eee;*/
  box-shadow: 0 -1px 1px rgba(150,150,150,.1);

  /* 定位相关 */
  /*position: fixed;*/
  left: 0;
  right: 0;

  /* 利用flex进行布局 */
  display: flex;
  text-align: center;
}

.bar {
  flex: 1;
  text-align: center;
  line-height: 80px;
  height: 49px;
  font-size: 20px;
  cursor: pointer;
}

</style>
