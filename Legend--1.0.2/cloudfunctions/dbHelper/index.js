// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.type=='add'){
    var userOpenid = event.userOpenid
    var userRight = event.userRight
    try {
      return await db.collection('legendUsers').add({
        data: {
          userOpenid: event.userOpenid,
          userCode: event.userCode,
          userRight: 'vip'
        }
      })
    } catch (e) {
      console.log(e)
    }
  } else if (event.type == 'query') {
    var userOpenid = event.userOpenid
    try {
      return await db.collection('legendUsers').where({
        userOpenid: event.userOpenid
      }).get()
    } catch (e) {
      console.log(e)
    }
  } else if (event.type == 'update') {
    try {
      return await db.collection('legendUsers').where({
        userCode: event.userCode
      }).update({
        data: {
          userRight: event.userRight
        }
        })
    } catch (e) {
      console.log(e)
    }
  }

}