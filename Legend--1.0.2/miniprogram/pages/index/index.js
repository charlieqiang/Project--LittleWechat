//index.js
const app = getApp()

Page({
  data: {
    page: 1,
    courseMsgUrl: [],
    userRight: app.globalData.userRight,

    welImgUrl: [
      './shoes.jpeg',
      './shoes.jpeg',
      './shoes.jpeg',
      './shoes.jpeg'
      ] ,

    swiperIndex: 0 //这里不写第一次启动展示的时候会有问题
  },

  onLoad: function () {
    var that = this;
    this.getcourseMsgUrl(that.data.page);
  },

  onShow: function(){
    this.setData({
      userRight: app.globalData.userRight,
    })
  },

  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  onReachBottom: function () {
    wx.showLoading({
      title: '加载更多文章',
    })
    var that = this;
    this.getcourseMsgUrl(that.data.page);
  },

  getcourseMsgUrl: function (page) {
    if (page == 1) {
      wx.showLoading({
        title: '加载中',
      })
    }
    var that = this
    wx.request({
      url: 'https://api.spe.kim/vdMa/ApiController?pageNow=' + page,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var res = res.data;
        if ((that.data.page > 1) && (res != "")) {
          var feedTemp = that.data.courseMsgUrl;
          that.setData({
            courseMsgUrl: feedTemp.concat(res),
            page: page + 1
          })
          //console.log(res);
        } else if (res == ""){
          
        } else {
          that.setData({
            courseMsgUrl: res,
            page: page + 1
          })
          //console.log(res);
        }
      },

      fail: function () {
        wx.showToast({
          title: '服务器异常',
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

  //
  tapItem: function (event) {
    var that = this;
    var para = event.currentTarget.dataset.para;
    console.log(para.vright + ":" + app.globalData.userRight)
    if ("level-1" == that.data.userRight){
      wx.showModal({
        title: '温馨提示',
        content: '请先登录',
        showCancel: false,
        success: function (res) { },
      })
    } else if (para.vright == that.data.userRight) {
      wx.navigateTo({
        url: "/pages/play/play?id=" + para.id
      })
      
    } else if (para.vright != that.data.userRight){
      wx.showModal({
        title: '权限不足',
        content: '请联系管理员开通svip',
        showCancel: false,
        success: function(res) {},
      })
    } 

  }

})