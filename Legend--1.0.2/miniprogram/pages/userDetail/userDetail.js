// pages/userDetail/userDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userCode: '',
    userRight: ''

  },
  onLoad: function(options) {
    var that = this;
    that.setData({
      userCode: options.userCode,
      userRight: options.userRight
    });
    console.log(that.data.userCode);
  },

  formSubmit: function(e) {
    var that = this
    let {
      userRight,
      userCode
    } = e.detail.value;
    console.log(userRight + "" + userCode);
    that.onUpdate(userCode, userRight)


  },

  onUpdate: function(userCode, userRight) {

    wx.cloud.callFunction({
      name: 'dbHelper',
      data: {
        type: 'update',
        userCode: userCode,
        userRight: userRight
      },
      success: function(updateRes) {
        if (1 == updateRes.result.stats.updated) {
          wx: wx.navigateTo({
            url: '../userManager/userManager',
            success: function (res) {
              wx.showToast({
                title: '修改成功',
                icon: 'success'
              })
             },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      fail: function(updateRes) {
        console.log(updateRes)
      }
    })

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