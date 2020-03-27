// pages/videolib/videolib.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    courseMsgUrl: [],
    userRight: app.globalData.userRight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    that.setData({
      lib: options.lib,
    })
    if ('vip' == options.lib) {
      this.getvipCourseMsgUrl(that.data.page);
    } else if ('svip' == options.lib) {
      this.getsvipCourseMsgUrl(that.data.page);
    }

  },

  getvipCourseMsgUrl: function(page) {
    if (page == 1) {
      wx.showLoading({
        title: '加载中',
      })
    }
    var that = this
    wx.request({
      url: 'https://api.spe.kim/vdMa/ApiController?type=video&right=vip&pageNow=' + that.data.page + '&pageSize=10',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var res = res.data;
        if ((that.data.page > 1) && (res != "")) {
          var feedTemp = that.data.courseMsgUrl;
          that.setData({
            courseMsgUrl: feedTemp.concat(res),
            page: page + 1
          })
          //console.log(res);
        } else if (res == "") {

        } else {
          that.setData({
            courseMsgUrl: res,
            page: page + 1
          })
          //console.log(res);
        }
      },

      fail: function() {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },

      complete: function() {
        if (page >= 1) {
          wx.hideLoading()
        } else {
          //wx.stopPullDownRefresh()
        }
      }
    })
  },

  //
  getsvipCourseMsgUrl: function(page) {
    var that = this
    if (page == 1) {
      wx.showLoading({
        title: '加载中',
      })
    }
    var that = this
    wx.request({
      url: 'https://api.spe.kim/vdMa/ApiController?type=video&right=svip&pageNow=' + that.data.page + '&pageSize=10',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var res = res.data;
        if ((that.data.page > 1) && (res != "")) {
          var feedTemp = that.data.courseMsgUrl;
          that.setData({
            courseMsgUrl: feedTemp.concat(res),
            page: page + 1
          })
          //console.log(res);
        } else if (res == "") {

        } else {
          that.setData({
            courseMsgUrl: res,
            page: page + 1
          })
          //console.log(res);
        }
      },

      fail: function() {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },

      complete: function() {
        if (page >= 1) {
          wx.hideLoading()
        } else {
          //wx.stopPullDownRefresh()
        }
      }
    })
  },

  //
  tapItem: function(event) {
    var that = this;
    var para = event.currentTarget.dataset.para;
    var ulevel = 1;
    var vlevel = 2;
    // console.log(para.vright + ":" + app.globalData.userRight)
    switch (that.data.userRight) {
      case "level-1":
        {
          ulevel = 1;
          break;
        }
      case "vip":
        {
          ulevel = 2;
          break;
        }
      case "svip":
        {
          ulevel = 3;
          break;
        }
      case "bossvip":
        {
          ulevel = 5;
          break;
        }
      default:
        {
          break;
        }
    }
    switch (para.vright) {
      case "level-1":
        {
          vlevel = 1;
          break;
        }
      case "vip":
        {
          vlevel = 2;
          break;
        }
      case "svip":
        {
          vlevel = 3;
          break;
        }
      case "bossvip":
        {
          vlevel = 4;
          break;
        }
      default:
        {
          break;
        }
    }
    if (1 == ulevel) {
      wx.showModal({
        title: '温馨提示',
        content: '请先登录',
        showCancel: false,
        success: function(res) {},
      })
    } else if (ulevel >= vlevel) {
      wx.navigateTo({
        url: "/pages/play/play?id=" + para.id + "&name=" + para.name + "&vright=" + para.vright + "&descp=" + para.descp + "&watchVolume=" + para.watchVolume + "&date=" + para.date
      })

    } else if (ulevel < vlevel) {
      wx.showModal({
        title: '权限不足',
        content: '请联系管理员开通svip',
        showCancel: false,
        success: function(res) {},
      })
    }

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      userRight: app.globalData.userRight,
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    wx.showLoading({
      title: '加载更多',
    })

    if ('vip' == that.data.lib) {
      this.getvipCourseMsgUrl(that.data.page);
    } else if ('svip' == that.data.lib) {
      this.getsvipCourseMsgUrl(that.data.page);
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})