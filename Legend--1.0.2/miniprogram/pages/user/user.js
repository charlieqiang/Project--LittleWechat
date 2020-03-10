//user.js
const app = getApp();

Page({
  data: {
    userOpenid: '',
    userInfo: app.globalData.userInfo,
    logged: false,
    userRight: app.globalData.userRight,
  },

  onLoad: function() {
    if (!wx.cloud) {
      return
    }
    // 获取用户信息
  },

  onGetUserInfo: function(e) {
    // console.log(e.detail);
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  loginController: function() {
    var that = this;
    //get userOpenid
    queryRight(app.globalData.userOpenid, function(queryRes) {
      //check the user in db
      if (queryRes.length==0) {
        //if has get the userRight
        addRight();
      }
      //if not return the userRight
      console.log(app.globalData.userOpenid);
      app.globalData.userRight = queryRes[0].userRight;
      that.setData({
        userRight: app.globalData.userRight,
      })
    });
  },

})

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

function queryRight(userOpenid, callback) {
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  db.collection('legendUsers').where({
    _openid: userOpenid
  }).get({
    success: res => {
      wx.showToast({
        title: '更新成功',
        icon: 'none',
        duration: 2000
      })
      return typeof callback == "function" && callback(res.data);
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败',
        duration: 2000
      })
      // console.error('[数据库] [查询记录] 失败：', err)
      return typeof callback == "function" && callback(false);
    }
  })
}