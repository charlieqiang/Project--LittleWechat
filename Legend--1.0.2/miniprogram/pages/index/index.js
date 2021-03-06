//index.js
const app = getApp()

Page({
  data: {
    page: 1,
    desp: [],
    vipCourseMsgUrl: [],
    svipCourseMsgUrl: [],
    userRight: app.globalData.userRight,
    welImgUrl: [],
    swiperIndex: 0 //这里不写第一次启动展示的时候会有问题
  },

  onShow: function() {
    this.setData({
      userRight: app.globalData.userRight,
    })
    var that = this;
    this.getvipCourseMsgUrl(that.data.page);
    this.getsvipCourseMsgUrl(that.data.page);
    this.getImgUrl();
    this.getDesp();
  },

  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  gotoslib: function() {
    wx: wx.navigateTo({
      url: '../videolib/videolib?lib=svip',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  gotolib: function() {
    wx: wx.navigateTo({
      url: '../videolib/videolib?lib=vip',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getDesp: function() {
    var that = this
    wx.request({
      url: 'https://api.spe.kim/vdMa/ApiController?type=desp',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var res = res.data;
        // console.log(res)
        that.setData({
          desp: res.desp,
        })
      },

      fail: function() {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },

  getvipCourseMsgUrl: function(page) {
    if (page == 1) {
      wx.showLoading({
        title: '加载中',
      })
    }
    var that = this
    wx.request({
      url: 'https://api.spe.kim/vdMa/ApiController?type=video&right=vip&pageNow=1&pageSize=3',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var res = res.data;
        if ((that.data.page > 1) && (res != "")) {
          var feedTemp = that.data.courseMsgUrl;
          that.setData({
            vipCourseMsgUrl: feedTemp.concat(res),
            // page: page + 1
          })
          //console.log(res);
        } else if (res == "") {

        } else {
          that.setData({
            vipCourseMsgUrl: res,
            // page: page + 1
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
        wx.hideLoading()
      }
    })
  },

  //
  getsvipCourseMsgUrl: function(page) {
    if (page == 1) {
      wx.showLoading({
        title: '加载中',
      })
    }
    var that = this
    wx.request({
      url: 'https://api.spe.kim/vdMa/ApiController?type=video&right=svip&pageNow=1&pageSize=3',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.showLoading({
          title: '加载更多',
        })
        var res = res.data;
        if ((that.data.page > 1) && (res != "")) {
          var feedTemp = that.data.courseMsgUrl;
          that.setData({
            svipCourseMsgUrl: feedTemp.concat(res),
            // page: page + 1
          })
          //console.log(res);
        } else if (res == "") {

        } else {
          that.setData({
            svipCourseMsgUrl: res,
            // page: page + 1
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
        wx.hideLoading()
      }
    })
  },

  //
  getImgUrl: function(page) {
    var that = this
    wx.request({
      url: 'https://api.spe.kim/vdMa/ApiController?type=img',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.showLoading({
          title: '加载更多',
        })
        var res = res.data;
        that.setData({
          welImgUrl: res,
        })
      },
      fail: function() {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },
      complete: function() {
        wx.hideLoading()
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

})