const Mock = require("mockjs");
let data = Mock.mock({
  "data|100": [ //生成100条数据 数组
    {
      "carId|+1": 1,//生成商品id，自增1
      "carMsg": "@word(3,5)", //生成商品信息，长度为10个汉字
      "carModel": "@word(3,5)", //生成商品信息，长度为10个汉字
      "carName": "@cname",//生成商品名 ， 都是中国人的名字
      "carPrice|100-800":30,//租车价格
      "carTel": /^1[0-9]{10}$/,//生成随机电话号
      "carAddress": "@county", //随机生成地址
      "carStar|1-5": "★", //随机生成1-5个星星
      "salesVolume|30-1000": 30, //随机生成商品价格 在30-1000之间
      "carPhoto": "@image('213,134','#c33', '#666666','小北鼻')", //生成随机图片，大小/背景色/字体颜色/文字信息
    }
  ]
})
Mock.mock(/cars\/carsAll/, 'post', () => { //三个参数。第一个路径，第二个请求方式post/get，第三个回调，返回值
  return data
})
