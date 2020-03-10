//index.js
const app = getApp()

Page({
  data: {
    page: 1,
    courseMsgUrl: [
      {
        'title': "解套必胜",
        'right': "vip",
        'num': "678",
        'date': "03-05"
      }
    ],
    welImgUrl: [
      './shoes.jpeg',
      './shoes.jpeg',
      './shoes.jpeg',
      './shoes.jpeg'
    ],
    swiperIndex: 0 //这里不写第一次启动展示的时候会有问题
  },

  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  jump: function(){
    wx.navigateTo({
      url: '../play/play',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})