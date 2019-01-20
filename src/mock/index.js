import Mock from 'mockjs';

Mock.setup({
	timeout: 1000 //指定被拦截ajax的请求的响应时间
})

//可以使用Mock.Random自定义随机数据 通过@占位符来使用
var Random = Mock.Random;
Random.extend({
	randomName: function(names) {
		var randomNames = ['王旭', '张安', '躺好', '马鸿雁', '王弘扬'];
		return this.pick(randomNames);
	}
})

Mock.mock('/order', {
	"code": 0,
	"data|5": [{ //键不变 随机生成5个数组
		"id|+1": 1, //id从1开始累加
		"number|1-10": 1, //number在1-10之间随机取值
		"name|1-3": "@cname", //随机生成1-3个人的名字
		"num|1-5.2-3": 1, //生成大于1小于5的小数部分在2-3之间的随机浮点数
		"reg": /[a-z][A-Z][0-9]/, //支持正则表达式
		"url|2": "@url", //随机生成两条url
		"city": "@city", //随机生成两个城市名称
		"random": "@randomName", //随机生成自定义数据里面的数据
		"yes": "@boolean", //随机生成true或false
		"arr": "@range(2)", //随机生成长度为2的数组
		"date": "@datetime(yyyy-MM-dd)", //随机生成yyyy-MM-dd格式的日期
		"now": "@now", //生成现在的时间戳
		"image": "@image('200x100', '#ffcc33')", //生成一张宽高为200*100背景为黄色的图片地址
		"base64": "@dataImage('200x100')", //生成base64格式的宽高为200*100的图片
		"color": "@color", //生成随机的颜色代码
		"paragraph": "@cparagraph", //生成随机的中文的段落
		"ip": "@ip", //随机生成一个ip
		"address": "@county(true)", //随机生成一个省市县地址
		"shuffle": "@shuffle([1,2,3,4,5,6,7,8])", //生成一个打乱的数组
		"guid": "@guid", //随机生成一个唯一的guid
		"star|1-5": "★", //随机生成1-5个星星
	}]
})