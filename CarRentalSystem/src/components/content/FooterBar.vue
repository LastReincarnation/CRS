<template>
  <div id="footer">

    <div id="footer-top">
      <div class="footer-top-d">
        <img class="footer-icon" src="../../assets/icon/city.png" alt="">
        <p class="footer-text">400多座城市</p>
      </div>
      <div class="footer-top-d">
        <img class="footer-icon" src="../../assets/icon/car.png" alt="">
        <p class="footer-text">200余种车型</p>
      </div>
      <div class="footer-top-d">
        <img class="footer-icon" src="../../assets/icon/service.png" alt="">
        <p class="footer-text">24小时服务</p>
      </div>
    </div>

    <div id="footer-bottom">
      <p>
        <a href="javascript:">帮助中心</a>|
        <a href="javascript:">建议专区</a>|
        <a href="javascript:">联系我们</a>|
        <a href="javascript:">友情链接</a>|&nbsp;投诉通道：111-1111-1111
      </p>
      <p>
        &nbsp;Copyright © 2020-2021&nbsp;成都九州信息技术服务有限公司&nbsp;&nbsp;
      </p>
    </div>
  </div>
</template>

<script>
export default {
name: "FooterBar"
}
</script>

<style scoped>
#footer{
  width: 1349px;
  background-color: #F2F2F2;

  overflow: hidden;

  /*水平垂直居中排列*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  zoom:1;
}

#footer-top{
  width: 1180px;
  height: 113px;
  padding: 24px 0 0 0;
  display: table;

  border-bottom: 1px solid #cccccc;
}
.footer-top-d{
  width: 494px;

  display :table-cell;

}
.footer-icon{
  width: 64px;
  height: 50px;
  margin-left: 160px;
}
.footer-text{
  font-size: 20px;
  color: #707070;
  margin: 0 auto;
  text-align: center;
}

#footer-bottom{
  width: 1180px;
  height: 113px;
  padding: 24px 0 0 0;
  display: table;
  background-color: #f2f2f2;
  color: #707070;
  font-size: 14px;
}
#footer-bottom:after{
  display: block;
  visibility: hidden;
  height: 0;
  clear: both;
  content: "";
}
#footer-bottom a{
  color: #707070;
  margin: 0 3px;
  outline: none;
  text-decoration: none;
}
#footer-bottom p{

  padding-bottom: 12px;
  margin-left: 40px;
}
p{
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
}
</style>
