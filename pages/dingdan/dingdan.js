// pages/dingdan/dingdan.js
Page({

  //   {
  //     "Id": 36,
  //     "Title": "进口|渴望|六种鱼猫粮1.8kg",
  //     "ClassifyName": "猫粮",
  //     "GoodsImage": "https://www.maohz.com/mhzapi/api/Common/ImageFile/goodsimgderek20181105021407380102.jpg",
  //     "SaleAmount": 330,
  //     "status": 3,
  //     "statusData": "待收货"
  //   }
  data: {
    orderList: [],
    activeIndex: 0,
    userId: '',
    order_id: ''
  },

  getGoodsDate(callback) {
    wx.showLoading({
      title: '加载中',
      success: (res) => { },
    })
    var That = this;
    wx.request({
      url: 'http://42.192.64.66:80/getOrder',
      dataType: "json",
      method: "POST",
      data: {
        userId: That.data.userId
      },
      success: (res) => {
        wx.hideLoading({})
        let orderList = []
        res.data.data.forEach(item => {
          orderList.push({ list: item.orderList, status: item.status,_id:item._id })
        })
        That.setData({
          orderList: orderList
        })
        That.addStatus()
        if(callback){
        callback()
        } 
      }
    })
  },

  switchItem(e) {
    let index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      activeIndex: index
    })
    const that = this
    this.getGoodsDate(
      function () {
        if (!index == 0) {
          const newOrderList = that.data.orderList.filter(item => parseInt(item.status) == index - 1)
              that.setData({
            orderList: newOrderList
          })
        }
      })
  },
  addStatus() {
    this.data.orderList.forEach(item => {
      let status = parseInt(item.status)
      switch (status) {
        case 0:
          item.statusData = "待支付"
          break;
        case 1:
          item.statusData = "待发货"
          break;
        case 2:
          item.statusData = "待收货"
          break;
        case 3:
          item.statusData = "已完成"
          break;
      }
      const newOrderList = this.data.orderList
      this.setData({
        orderList: newOrderList
      })

    })
  },
  toPay(event) {
    console.log(event.target.dataset.id);
    // wx.showToast({
    //   title: '支付成功'
    // })

    wx.navigateTo({
      url: '/pages/pay/pay?orderId=' + event.target.dataset.id,
    })
  },
  toBuy() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  onLoad: function (options) {
    var userId = wx.getStorageSync('openid')
    this.setData({
      userId: userId
    })
    this.getGoodsDate()
  }
})