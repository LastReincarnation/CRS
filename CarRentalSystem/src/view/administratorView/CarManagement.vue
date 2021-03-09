<template>
  <div>
    <div id="nav-menu">
      <nav-menu></nav-menu>
    </div>
    <div id="vehicle-management">
      <vehicle-management></vehicle-management>
    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/administrator/functionList/NavMenu";
import VehicleManagement from "@/components/administrator/showPage/VehicleManagement";
export default {
  name: "CarManagement",
  components:{
    NavMenu,
    VehicleManagement
  }
}
</script>

<style scoped>
  #nav-menu{
    float: left;
    height: 100%;
  }

  #vehicle-management{
    float: left;
    width: calc(100% - 200px);
    height: 600px;
    overflow: auto;
  }
</style>