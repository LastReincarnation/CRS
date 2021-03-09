// import Mock from 'mockjs'
const Mock = require("mockjs");

const userList = Mock.mock({  //定义用户数据
  data: {
    total: 3,

    //前两个用户数据分别固定设为管理员和普通用户，为后续权限设置做准备，其他用户随机生成
    userinfo: [{
      username: '123456',
      password: '123456',
      roles: 'admin',
      // name: '张三',
      // age: 23,
      // job: '前端工程师',
      // token: '000111222333444555666',
      id: '100',
    }, {
      username: 'editor',
      password: '123456',
      roles: 'editor',
      // name: '测试1',
      // 'age|20-30': 23,
      // job: '前端工程师',
      // token: '145145145123123123111',
      id: '101',
    }, {
      username: '@word(3, 5)',
      password: '123456',
      roles: 'editor',
      // name: '@cname',
      // 'age|20-30': 23,
      // 'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师'],
      // token: '@guid()',
      id: '102',
    }, ],
    meta: {
      status: 200,
      message: 'success',
    }
  },
});

export default {
  'post|/user': userList,
}

//路径与请求方式
Mock.mock(/user\/userlist/, 'post', (config) => {
  //将传递进来的数据保存
  // const { username, password } = JSON.parse(config.body);
  // let user = userList.data.userinfo
  // for (let i = 0; i < user.length; i++) {
  //   //判断userList中是否存在该用户并且用户密码是否正确
  //   if (username === user[i].username && password === user[i].password) {
  //     console.log('success')
  //     return {
  //       meta: {
  //         msg: 'success',
  //         status: 200,
  //       },
  //       user: {
  //         username: user[i].username,
  //         //roles: userList.data.userinfo[i].roles
  //       }
  //     }
  //   }
  // }
  return userList
})
