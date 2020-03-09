//user.js
const app = getApp();

Page({
  data: {
    userOpenid: '',
    userInfo: {},
  },

  onLoad: function() {
    if (!wx.cloud) {
      // wx.redirectTo({
      //   url: '../user/user',
      // })
      return
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      userRight: app.globalData.userRight,
    })
  },

  loginController: function() {
    var that = this;
    //get userOpenid
    app.func.getUserOpenid(function(getUserRes) {
      console.log('1');
      app.globalData.userOpenid = getUserRes.openid;
      console.log("1:" + app.globalData.userOpenid);
    });
    app.func.queryRight(app.globalData.userOpenid, function(queryRes) {
      console.log('2');
      //check the user in db
      if (queryRes == '[]') {
        //if has get the userRight
        app.func.addRight();
      }
      //if not return the userRight
      app.globalData.userRight = queryRes[0].userRight;

      console.log('4');
    });
    // console.log(queryRes[0].userRight);
    //get userInfo
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.setData({
                userInfo: res.userInfo
              })
              app.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
    //set data
    console.log("5:"+app.globalData.userRight);
    that.setData({
      userInfo: app.globalData.userInfo,
      userRight: app.globalData.userRight,
    })
  },
})