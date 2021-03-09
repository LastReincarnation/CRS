<template>
  <div>
    <div id="nav-menu">
      <nav-menu></nav-menu>
    </div>

    <div id="information-sheet">
      <information-sheet></information-sheet>
    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/administrator/functionList/NavMenu";
import InformationSheet from "@/components/administrator/showPage/InformationSheet";
export default {
  name: "ViewInformation",
  components:{
    NavMenu,
    InformationSheet
  }
}
</script>

<style scoped>
#nav-menu{
  float: left;
  height: 100%;
}

#information-sheet{
  float: left;
  width: calc(100% - 200px);
  height: 600px;
  overflow: auto;
}
</style>