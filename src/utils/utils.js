/** 
 * utils.js  封装项目需要的工具函数
 * author:wteano 2022-12-02
 **/

const utils = {
  // 参数处理函数==>转换为form表单的数据格式
  stringifyParams (params) {
    let str = ''
    for (let key in params) {
      str += `&${key}=${params[key]}`
    }
    return str.slice(1)  //'name=xxx&id=123'
  },
  // 格式化url的传值==>转换为对象
  formatSearch (str) {
    // 防止中文乱码，转换URI编码
    str = decodeURI(str.substr(1)).split('&');

    let obj = {}
    str.forEach(item => {
      item = item.split('=');
      obj[item[0]] = item[1];
    })
    return obj    //{id:31213,name:'xxx'}
  },
  // 时间转换 函数
  getTime (val) {
    let date = new Date(val)   //把 传入的时间 转换为 格林威治时间

    let yy = date.getFullYear();       // 年 
    let MM = date.getMonth() + 1; //月 //月份获取的是0-11
    let DD = date.getDate();           // 日
    let hh = date.getHours();          // 小时
    let mm = date.getMinutes();        // 分钟
    let ss = date.getSeconds();        // 秒
    let ww = date.getDay();            // 星期几
    let ms = date.getMilliseconds();   // 毫秒
    // 添0补齐
    MM = MM < 10 ? '0' + MM : MM;
    DD = DD < 10 ? '0' + DD : DD;
    hh = hh < 10 ? '0' + hh : hh;
    mm = mm < 10 ? '0' + mm : mm;
    ss = ss < 10 ? '0' + ss : ss;

    return (yy + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss)
  },
  //获取数据的数据类型=> 封装函数
  getDataType: function (data) {
    let type = Object.prototype.toString.call(data)
    return type.slice(8, - 1)
  },
  // 深拷贝算法
  /* 获得一个数组 /或对象 
     返回一个 数组/或对象 */
  deepClone: function (data) {
    let newData;   // 新创建数据存储空间
    // 1.判断当前传入的数据 是 数组还是对象
    // （如果是数组，需要创建一个数组 接收老数组的数据,
    // 否则创建一个对象，接收老对象的数据）
    if (data instanceof Object) { // 判断数据的数据类型
      if (Array.isArray(data)) {
        newData = [];
      } else {
        newData = {}
      }
    } else {
      newData = data;   //是基本数据类型，直接复制
    }
    //循环数组/对象 拿到每个key 和 属性值/元素值
    //判断这个元素值，如果这个元素值 是一个引用数据类型--->创建一个一模一样的空数组/空对象-循环
    //否则：元素值是一个基本数据类型 直接写入到 新数组/新的对象身上
    for (const key in data) {  //数组对象都能用
      // 数据元素为引用数据类型， 重新调用 deepClone() 
      //当前元素/属性值是 一个 引用数据类型的数据-->递归调用 重新遍历生成 小的数组/对象对应的新小的数组和对象
      if (data[key] instanceof Object && typeof data[key] != "function") {
        newData[key] = deepClone(data[key]);
      } else {
        //当前元素/属性值 是一个 基本数据类型的数据  直接写入到 新创建数组/新的对象身上
        newData[key] = data[key];
      }
    }
    //循环结束：newData 新数据就组装完成了 return出去 
    return newData
  }

}

//  暴露这个对象
// module.exports = utils;
export default utils;

//挂载到window上，
// 需要配置webpack.config.js（enntry入口配置，plugins中chunks）
// window.utils = utils