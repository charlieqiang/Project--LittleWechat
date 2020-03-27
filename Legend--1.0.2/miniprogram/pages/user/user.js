//user.js
const app = getApp();

Page({
  data: {
    userOpenid: '',
    userInfo: app.globalData.userInfo,
    logged: false,
    userRight: app.globalData.userRight,
    userCode: app.globalData.userCode,
  },

  onShow: function() {
    var that = this
    if (!wx.cloud) {
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //console.log(res.userInfo);
              that.setData({
                userInfo: res.userInfo,
              })
            }
          })
        }
      }
    })

    //secondtime
    wx.cloud.callFunction({
      name: 'dbHelper',
      data: {
        type: 'query',
        userOpenid: app.globalData.userOpenid
      }, success: function (queryRes) {
          app.globalData.userRight = queryRes.result.data[0].userRight
          app.globalData.userCode = queryRes.result.data[0].userCode
          // console.log(app.globalData.userCode)
      }, fail: function (queryRes) {
        console.log(queryRes)
      }
    })

    //hello
    that.getUserRight();

  },

  onGetUserInfo: function(e) {
    // console.log(e.detail);
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        userInfo: e.detail.userInfo,
      })
    }
  },

  getUserRight: function() {
    var that = this;
    //getUserRight
    that.setData({
      userRight: app.globalData.userRight,
      userCode: app.globalData.userCode
    })

  },

  userManager: function() {
    var that = this
    if ("bossvip" == that.data.userRight) {
      wx: wx.navigateTo({
        url: '../userManager/userManager',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  callManager: function() {
    
    wx.showModal({
      title: '温馨提示',
      content: '请 联 系 微 信：l t z f 9 9',
      showCancel: false,
      success: function (res) { },
    })
  },

  /**
   * 一键复制
   */

  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: app.globalData.userCode,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },

})