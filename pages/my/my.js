// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },
  /**
   * 小程序登录信息获取
   */
  bindGetUserInfo: function (e) {
    this.setData({
      user: e.detail.userInfo
    })
    wx.setStorageSync('userInfo', e.detail.userInfo)
  },
  /**
   * 调用相机相册
   */
  toShowImage: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  toSetting() {
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  toHistory() {
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  toshopcart() {
    wx.navigateTo({
      url: '/pages/dingdan/dingdan',
    })
  },
  /**
   * 跳转到订单页面
   */
  toOrder: function () {
    wx.switchTab({
      url: '/pages/order/order',
    })
  },
  topreferentail() {
    wx.navigateTo({
      url: '/pages/preferential/preferential',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wxb270eb3b4c8c0964',  //你的小程序的APPID
            secret: 'd521bf7a5142169c81e657c2c07551de',   //你的小程序的APPSecret       
            js_code: res.code,          //通过wx.login接口获得的登录凭证
            grant_type: 'authorization_code'
          },     //看官方文档   
          method: 'GET',
          header: { 'content-type': 'application/json' },
          success: (res) => {
            console.log(res.data.openid)
            wx.setStorageSync('openid', res.data.openid)  //存入本地缓存,key为openid 
            // app.globalData.openid = res.data.openid       			             
            console.log("返回成功" + wx.getStorageSync('openid'))
          }
        })
      }
    })
    let newUserInfo = wx.getStorageSync('userInfo')
    if (newUserInfo) {
      this.setData({
        user: newUserInfo
      })
    }
  },
  onShow() {
    let newUserInfo = wx.getStorageSync('userInfo')
    this.setData({
      user: newUserInfo
    })
  }
})