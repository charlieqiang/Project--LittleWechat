//user.js
const app = getApp();

Page({
  data: {
    userOpenid: '',
    userInfo: app.globalData.userInfo,
    logged: false,
    userRight: app.globalData.userRight,
  },

  onShow: function() {
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
              this.setData({
                userInfo: res.userInfo,
                userRight: app.globalData.userRight
              })
            }
          })
        }
      }
    })

  },

  onGetUserInfo: function(e) {
    // console.log(e.detail);
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        userInfo: e.detail.userInfo,
        userRight: app.globalData.userRight
      })
    }
  },

  getUserRight: function() {
    var that = this;
    //getUserRight

  },

})

