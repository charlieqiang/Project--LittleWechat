// pages/userManager/userManager.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryResult: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  onShow: function(options) {
    this.onQuery();
  },

  onQuery: function() {
    const db = wx.cloud.database({
      env: 'little-potato'
    })
    // 查询当前用户所有的
    db.collection('legendUsers').get({
      success: res => {
        this.setData({
          queryResult: res.data
        })
        //console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  onTap: function(event) {
    var para = event.currentTarget.dataset.para;
    wx: wx.navigateTo({
      url: '../userDetail/userDetail?userCode=' + para.userCode + '&userRight=' + para.userRight,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onSearch: function(e) {
    var that = this
    const db = wx.cloud.database({
      env: 'little-potato'
    })

    // 查询当前用户所有的
    db.collection('legendUsers').where({
      userCode: e.detail.value
    }).get({
      success: res => {
        that.setData({
          queryResult: res.data
        })
        //console.log('[数据库] [查询记录] 成功: ', userCode)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

  },

  home: function() {
    wx.switchTab({
      url: '/pages/user/user',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})