<template>
  <div>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <span>车辆管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="carManagement">修改信息</el-menu-item>
            <el-menu-item index="1-2" @click="viewInformation">查看信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <span slot="title" @click="orderManagement">订单管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return{

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    carManagement(){
      this.$router.push({path:'/CarManagement'})
    },
    orderManagement(){
      this.$router.push({path:'/OrderManagement'})
    },
    viewInformation(){
      this.$router.push({path:'/ViewInformation'})
    }
  }
}
</script>

<style scoped>

  div{
    width: 200px;
    height: 630px;
    background: #545c64;
  }

  /deep/ .el-row{
    width: 200px;
  }
  /deep/ .el-submenu__title{
    width: 200px;
  }
  /deep/ .el-menu-item{
    width: 200px;
  }
  /deep/ span{
    color: white;
  }
  /deep/ .el-menu-item-group__title{
    width: 200px;
    padding: 7px 0!important;
    background: #545c64;
  }
</style>
