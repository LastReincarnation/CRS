<template>
  <div style="width: 100%" >
    <div style="width: 80%;margin: auto">
      <div style="width: 40%;margin-left: 30%">
        <h1 style="font-size: 40px;margin-top: 30px">用户信息</h1>
      </div>
      <div style="width: 37%;margin-left: 27%;margin-top: 4%">
        <el-form  label-width="80px"  size="small">
          <el-form-item label="用户名">
            <el-input ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" icon="el-icon-s-promotion" >立即更新</el-button>
            <el-button  icon="el-icon-s-home">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderInformation"
}
</script>

<style scoped>

</style>
