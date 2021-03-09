<template>
  <div>
    <div id="nav-menu">
      <nav-menu></nav-menu>
    </div>

    <div id="order-information">
      <order-information></order-information>
    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/administrator/functionList/NavMenu";
import OrderInformation from "@/components/administrator/showPage/OrderInformation";

export default {
  name: "OrderManagement",
  components:{
    NavMenu,
    OrderInformation
  }
}
</script>

<style scoped>
  #nav-menu{
    float: left;
    height: 100%;
  }

  #order-information{
    padding: 50px 100px 0 150px;
    float: left;
    width: calc(100% - 500px);
    height: 600px;
    overflow: auto;
  }
</style>