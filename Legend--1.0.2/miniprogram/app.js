//app.js

App({

  globalData: {
    userOpenid: '',
    userRight: 'level-1',
    userInfo: {
      avatarUrl: './user-unlogin.png',
      nickName: "id_1568",
    },
    userTicket: '548DECFSA',
  },

  onLaunch: function () {
    var that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    wx.cloud.callFunction({
      
      name: 'getUserOpenid',
      data: {},
      success: getUserOpenidRes => {
        
        wx.cloud.callFunction({
          name: 'dbHelper',
          data: {
            type: 'query',
            userOpenid: getUserOpenidRes.result.userOpenid
          }, success: function (queryRes) {
            if (queryRes.result.data.length==0){
              wx.cloud.callFunction({
                name: 'dbHelper',
                data: {
                  type: 'add',
                  userOpenid: getUserOpenidRes.result.userOpenid
                }, success: function (addRes) {
                  that.globalData.userOpenid = getUserOpenidRes.result.userOpenid
                  that.globalData.userRight = 'vip'
                }, fail: function (addRes) {
                  console.log(addRes)
                }
              })
            }else{
              that.globalData.userOpenid = getUserOpenidRes.result.userOpenid
              that.globalData.userRight = queryRes.result.data[0].userRight
            }
          }, fail: function (queryRes) {
            console.log(queryRes)
          }
        })

      },
      fail: err => {
        console.error('[云函数] [getUserOpenid] 调用失败', err)
      }
    })
  },
})

