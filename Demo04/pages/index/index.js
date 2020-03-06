// pages/index/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    vedioList: [
      {
        'title': "解套必胜",
        'right': "vip",
        'num': "678",
        'date': "03-05"
      },
      {
        'title': "解套必胜",
        'right': "vip",
        'num': "678",
        'date': "03-05"
      }
    ],
    //my data
    openid: '',
    userRight: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    this.getFeeds(that.data.page);
    wx.showLoading({
        title: '加载更多视频',
      }),

      setTimeout(function() {
        wx.hideLoading()
      }, 1000)
  },

  //事件处理函数
  bindViewTap: function() {
    var that=this;
    console.log('haha'+app.globalData.userRight);
    if (that.data.userRight == ''){
      that.setData({

        userRight: app.globalData.userRight,

      })
    }
    if (that.data.userRight=='svip'){
      wx.showToast({
        title: '权限满足',
        duration: 3000
      })
      wx.navigateTo({
        url: '../play/play',
      })
    }else{
      wx.showModal({
        title: '权限不足',
        content: '请联系管理员免费开通vip',
        showCancel: false,
        success: function (res) { },
      })
    }

  },

  getFeeds: function (page) {
    if (page == 1) {
      wx.showLoading({
        title: '加载中',
      })
    }
    var that = this;
    wx.request({
      url: 'https://www.spe.kim/Legend/GetVedioList?page=' + page,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var res = res.data;

        if (that.data.page > 1) {
          var feedTemp = that.data.feeds;
          that.setData({
            feeds: feedTemp.concat(res),
            page: page + 1
          })
        } else {
          console.log(res);
          that.setData({
            feeds: res,
            page: page + 1
          })
        }
      },

      fail: function () {
        wx.showToast({
          title: '服务器异常',
          icon: 'none',
          duration: 1500
        })
      },
      complete: function () {
        if (page >= 1) {
          wx.hideLoading()
        } else {
          //wx.stopPullDownRefresh()
        }
      }
    })
  },
})