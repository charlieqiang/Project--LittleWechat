//app.js
App({
  globalData: {
    userInfo: null,
    userRight: '',
    openid: '',
  },
  onLaunch: function() {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.spe.kim/Legend/GetOpenid',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              code: res.code
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
              
              //set logic
              if (res.data!=null) {
                //
                console.log(res.data);
                that.globalData.openid = res.data.openid
                that.globalData.userRight = res.data.userRight
              } else {

              }
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },

})