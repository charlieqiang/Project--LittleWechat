//index.js
const app = getApp()

Page({
  data: {
    page: 1,
    courseMsgUrl: [{
      'title': "解套必胜",
      'right': "svip",
      'num': "678",
      'date': "03-05"
    }],
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

  jump: function() {
    
    wx.showModal({
      title: '权限不足',
      content: '请联系管理员开通svip',
      showCancel: false,
      success: function (res) { },
    })
  }

})