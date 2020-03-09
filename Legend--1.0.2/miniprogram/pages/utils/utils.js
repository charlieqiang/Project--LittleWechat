const app = getApp();

function getUserOpenid(callback){
  // 调用云函数
  
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      //console.log('[云函数] [login] userOpenid: ', res.result.openid);
      return typeof callback == "function" && callback(res.result)
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
      return typeof callback == "function" && callback(false)
    }
  })
  
}

function addRight() {
  const db = wx.cloud.database()
  db.collection('legendUsers').add({
    data: {
      userRight: 'vip'
    },
    success: res => {
      // 在返回结果中会包含新创建的记录的 _id
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000
      })
      //console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '新增记录失败'
      })
      console.error('[数据库] [新增记录] 失败：', err)
    }
  })
}

function queryRight(userOpenid,callback) {
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  db.collection('legendUsers').where({
    _openid: userOpenid
  }).get({
    success: res => {
      // wx.showToast({
      //   title: '添加成功',
      //   duration: 2000
      // })
      //console.log('[utils] [查询记录]:' + JSON.stringify(res.data, null, 2))
      return typeof callback == "function" && callback(res.data);
    },
    fail: err => {
      // wx.showToast({
      //   icon: 'none',
      //   title: '查询记录失败'
      // })
      // console.error('[数据库] [查询记录] 失败：', err)
      return typeof callback == "function" && callback(false);
    }
  })
}

module.exports = {
  getUserOpenid: getUserOpenid,
  queryRight: queryRight,
  addRight: addRight,
}