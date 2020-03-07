//index.js
const app = getApp()

Page({
  // data: {
  //   swiperItem: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
  //   indicatorDots: true,
  //   vertical: false,
  //   autoplay: false,
  //   interval: 3000,
  //   duration: 2000
  // },
  data: {
    imgUrls: [
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