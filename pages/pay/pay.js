// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payList: [],
    totalPrice: 0,
  },
  topay() {
    wx.showModal({
      title: '点击确定进行支付',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.showToast({
            title: '支付完成',
            icon: 'success',
            image: '',
            duration: 1500,
            mask: false,
            success: (result) => {
              //更新stauts的状态
              wx.request({
                url: 'http://42.192.64.66:80/updataStatus',
                method: 'POST',
                dataType: 'json',
                data: {
                  orderId: this.options.orderId 
                },
                success: (res) => {

                }
              })
              //支付成功跳到我的页面
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/dingdan/dingdan'
                })

              }, 1000)
            },
            fail: () => { },
            complete: () => { }
          });
        } else {
          wx.showToast({
            icon: 'none',
            title: '您取消支付'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/dingdan/dingdan'
            })
          }, 1000)
        }
      },
      fail: () => { },
      complete: () => { }
    });
  },
  getPayList() {
    var that = this
    wx.request({
      url: 'http://42.192.64.66:80/getPay',
      data: {
        orderId: that.options.orderId
      },
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        that.setData({
          payList: result.data.data[0].orderList
        })
        let price = 0
        that.data.payList.forEach(item => {
          price = price + item.SaleAmount
        })
        that.setData({
          totalPrice: price
        })
      },
      fail: () => { },
      complete: () => { }

    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPayList()
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1500)
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