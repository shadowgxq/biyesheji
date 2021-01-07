// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsNo:"",
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    swipertips:1,
    userId: '',
    details:{
      "Id": 39,
      "ShopId": 2,
      "GoodsNo": "5678518",
      "DataStatus": 2,
      "Title": "进口|巅峰|牛肉狗粮454g",
      "Classify": 402,
      "ClassifyName": "狗粮",
      "GoodsImage": "https://www.maohz.com/mhzapi/api/Common/ImageFile/goodsimgderek20181105021506740139.jpg",
      "Stock": 10,
      "SaleAmount": 195,
      "CreateDate": "2018-11-04T18:15:20.000Z",
      "UpdateDate": "2018-11-19T08:16:58.000Z",
      "Brand": "巅峰",
      "OrderNum": 0,
      "SwiperImgList": [
        "https://www.maohz.com/mhzapi/api/Common/ImageFile/goodsimgderek20181105021506740139.jpg",
        "https://www.maohz.com/mhzapi/api/Common/ImageFile/goodsimgderek20181119174911711201.jpg",
        "https://www.maohz.com/mhzapi/api/Common/ImageFile/goodsimgderek20181114120643144118.jpg"
      ],
      "DetailImgList": [
        "https://www.maohz.com/mhzapi/api/Common/ImageFile/goodsimgderek20181105023609436883.jpg",
        "https://www.maohz.com/mhzapi/api/Common/ImageFile/goodsimgderek20181105023609077672.jpg",
        "https://www.maohz.com/mhzapi/api/Common/ImageFile/goodsimgderek20181105023609780116.jpg",
        "https://www.maohz.com/mhzapi/api/Common/ImageFile/goodsimgderek20181105023610467126.jpg",
        "https://www.maohz.com/mhzapi/api/Common/ImageFile/goodsimgderek20181105023610170702.jpg"
      ]
    }
  },
  /**
   * 前往首页
   */
  toHome:function() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 资讯10086
   */
  toTalk:function() {
    wx.makePhoneCall({
      phoneNumber: '10086' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 前往购物车
   */
  toShopCart:function() {
    wx.switchTab({
      url: '/pages/shopcart/shopcart',
    })
  },
  /**
   * 加入购物车
   */
  joinCart:function() {
    let That=this;
    wx.request({
      // url: 'https://ys.lumingx.com/api/miniapps/addCart',
      url: 'http://42.192.64.66:80/saveGoodsList',
      data: {
        userId: this.data.userId,
        goodsId: That.data.details.Id,
        goodsList: That.data.details,

      },
      method: "POST",
      dataType:"json",
      success: (result) => {
        console.log(result);
        if(result && result.data.success) {
          wx.showToast({
            title: '添加成功',
            icon:'success',
            duration: 2000
          })
        }else if(result.data.success == false){
          wx.showToast({
            title: '商品已经在购物车存在',
            icon:'none',
            duration: 2000
          })
        }      
      },
      fail: (err)=>{
        console.log(err);
      },
    })
  },
  /**
   * 购买商品
   */
  buy:function() {
    let orderList = []
    orderList.push(this.data.details)
    wx.request({
      url: 'http://42.192.64.66:80/orderAdd',
      data: {
        userId: this.data.userId,
        status:'0',
        orderList: orderList
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      success: (result)=>{
        console.log(result);
        wx.navigateTo({
          url: '/pages/pay/pay?orderId='+ result.data.order_id,
        })
      }
    });
  },  
  /**
   * 显示图片 
   */
  showImage:function() {
    wx.previewImage({
      current: this.data.details.SwiperImgList[this.data.swipertips-1], // 当前显示图片的http链接
      urls: this.data.details.SwiperImgList// 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = wx.getStorageSync('openid')
    this.setData({
      goodsNo:options.goodsNo,
      userId: userId
    })
    this.getDetails();
  },
  //幻灯片中tips的改变值
  changeSwiper:function(e) {
    this.setData({
      swipertips:e.detail.current+1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 发送请求，获取details页面的数据
   */
  getDetails:function() {
    let That=this;
    wx.request({
      url: 'https://ys.lumingx.com/api/miniapps/getWXGoodsInfo',
      data: {
        goodsNo:That.data.goodsNo
      },
      success: (result) => {
        let data=result.data.data;
        if(data) {
          That.setData({
            details:data
          })
        }
      },
    })
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