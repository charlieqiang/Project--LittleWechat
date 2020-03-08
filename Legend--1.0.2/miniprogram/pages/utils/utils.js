// pages/utils/utils.js
const app = getApp()

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
      console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '新增记录失败'
      })
      console.error('[数据库] [新增记录] 失败：', err)

    }
  })
  return addRes;
}

function queryRight() {
  
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  db.collection('legendUsers').where({
    _openid: app.globalData.openid
  }).get({
    success: res => {
      this.setData({
        //
        queryResult: JSON.stringify(res.data, null, 2),
        queryRes: true
      })
      console.log('[数据库] [查询记录] 成功: ', res)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err)

    }
  })

  return this.data.queryRes;
}

module.exports = {
  queryRight: queryRight,
  addRight: addRight,
}