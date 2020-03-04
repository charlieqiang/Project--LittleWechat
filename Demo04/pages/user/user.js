// pages/user/user.js
const app = getApp()

Page({

  data: {
    phone: "",
    password: "",
    hasLogin:false,
  },
  onLoad: function() {

  },
  bindPhoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindPasswordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function(e) {
    var that=this
    wx: wx.showToast({
      title: '登录请求中',
      icon: 'loading',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {

      },
      fail: function(res) {},
      complete: function(res) {},
    });
    //requese
    wx: wx.request({

      url: 'https://www.spe.kim/Legend/Login',
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        wx.hideToast();
        if (res.data.LoginStatus == "OK") {
          //jump
          that.setData({
            hasLogin:true,
          })

        } else {
          wx.showModal({
            title: '登录失败',
            content: '请检查您填写的用户信息',
            showCancel: false,
            success: function(res) {},
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  }

})