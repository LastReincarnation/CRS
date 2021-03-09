<template>
  <div class="body">
      <div style="display: flex;justify-content: center" id="login">
        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>登陆</span>
          </div>
          <div>

              <el-form :rules="rules" :model="loginRef" ref="loginRef">
              <el-form-item prop="username">
                <tr>
                  <td>用户名</td>
                  <td>
                    <el-input v-model="loginRef.username" id="loginName" placeholder="请输入用户名" name="username" style="margin-bottom:5px"></el-input>
                  </td>
              </tr>
              </el-form-item>

               <el-form-item prop="password">
                 <tr>
                    <td id="password">密码</td>
                     <td><el-input  placeholder="请输入密码" v-model="loginRef.password"  show-password
                                    id="loginPwd"
                               @keydown.enter.native="loginButton" name="password" style="width: 204px"></el-input>
                     </td>
                 </tr>
                </el-form-item>

                <el-form-item >
                  <tr class="login_btn">
                    <td colspan="2" >
                      <el-button id="loginBtn" @click="loginButton()" type="primary" round style="width: 200px; margin-top: 10px">登陆</el-button>
                    </td>
                  </tr>
                </el-form-item>
              </el-form>

            <el-link type="primary" class="f_pwd" href="http://www.baidu.cn" >忘记密码</el-link>
          </div>
        </el-card>
      </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Login",
  data(){
    const carsData = []
    return{
      loginRef:{
        username: '',
        password: '',
      },
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }

        ],
      },
      login:false
    }
  },
  methods:{
    loginButton(){

      this.$refs.loginRef.validate(async valid =>{
        //规则校验
        if(!valid){
          return this.$message.error('请输入用户名或密码')
        }

        //获取后端数据
        await axios.post("http://localhost:8080/user/userlist").then((res)=>{
          this.carsData = res;
          return this.carsData
        })
        //获取输入的用户名和密码
        let loginName = document.getElementById('loginName').value
        let loginPwd = document.getElementById('loginPwd').value

        //与数据库中的表单验证
        for(let i = 0;i<this.carsData.data.data.userinfo.length;i++){
          if(loginName ===this.carsData.data.data.userinfo[i].username
          && loginPwd ===this.carsData.data.data.userinfo[i].password){
            this.login = true
          }
        }
        //判断登录
        if(this.login === true){
          this.$message.success('登陆成功')
          await this.$router.push('Home')
        }else {
          this.$message.error('用户名或密码错误')
        }

      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .body{
      background-image: url("../../assets/photo/loginBgd.jpg");
      background-position: center;
      height: 100%;
      width: 100%;
      background-size: cover;
      position: fixed;
    }

    #login{
      width: 800px;
      position:absolute;
      top:50%;
      left:50%;
      margin:-225px 0 0 -400px;
      background-color: rgba(0,0,0,0);
    }

    .clearfix{
      font-size: 25px;
      text-align: center;
      color: rgb(100,182,255);
    }

    .login_btn{
      margin-top: 25px;
      text-align: center;
    }

    .f_pwd{
      margin: 10px 0 0 115px;
      color: rgb(140,202,241);
      text-underline: none;
    }

    td{
      padding-left: 5px;
    }
    #password{
      width: 42px;
      height: 46px;
    }

    #loginBtn{
      margin-left: 28px;
    }

    .f_pwd{
      margin-left: 100px;
    }
</style>
