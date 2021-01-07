// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  toQuit:function() {
    var That=this;
    wx.showModal({
      title: '提示',
      content: '是否需要退出',
      success (res) {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          That.setData({
            user:{}
          })
          wx.switchTab({
            url: '/pages/my/my',
          })
          wx.clearStorageSync()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  toPets:function() {
    wx.navigateTo({
      url: '/pages/pets/pets',
    })
  },
  toPerson:function() {
    wx.navigateTo({
      url: '/pages/person/person',
    })
  },
  toAdress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  safe() {
    wx.showToast({
      title: '为您开启安全模式',
      icon: 'none'
    })
  },
  toWx() {
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const user = wx.getStorageSync("userInfo")
    this.setData({
      userInfo: user
    })
    console.log(this.data.userInfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})