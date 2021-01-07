// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsdatas:[],
    classify:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 搜索功能
   */
  toSearch:function(e) {  
    if(e.detail.value=="a" || e.detail.value=="全部" || e.detail.value=="热门" || e.detail.value=='e' || e.detail.value=="f" || e.detail.value=='g' || e.detail.value=='h') {
      this.data.classify=""
      this.data.goodsdatas=[];
       this.getData();//
    }else if(e.detail.value=="b" || e.detail.value=="猫粮" || e.detail.value=="最新" || e.detail.value=='h' || e.detail.value=='i' || e.detail.value=='j' || e.detail.value=='l' || e.detail.value=='m' ||e.detail.value=='n' ) {
      this.data.classify="401"
      this.data.goodsdatas=[];
      this.getData();
      console.log(e.detail.value);
      
     }else if(e.detail.value == "c" || e.detail.value=="狗粮" || e.detail.value=="推荐" || e.detail.value=='o' || e.detail.value=='p' || e.detail.value=='q' || e.detail.value=='r' || e.detail.value=='s' || e.detail.value=='t') {
      this.data.classify="402"
      this.data.goodsdatas=[];
      this.getData();
     }else if(e.detail.value == "d" || e.detail.value=="其他"||e.detail.value=='u'||e.detail.value=='v'||e.detail.value=='w'||e.detail.value=='x'||e.detail.value=='y'||e.detail.value=='z') {
      this.data.classify="102"
      this.data.goodsdatas=[];
      this.getData();
      
     }
    
  },
  /**
   * 前往详情页
   */
  toDetail:function(e) {
    console.log(e.currentTarget.dataset.goodsid);
    wx.navigateTo({
      url: '/pages/detail/detail?goodsNo='+e.currentTarget.dataset.goodsid,
    })
  },
  /**
   * 获取数据
   */
  getData:function() {
    wx.showLoading({
      title:"加载中"
    })
    var That=this;
    wx.request({
      url: 'http://127.0.0.1:3000/goodsList', 
      data: {
        pageNo: 1,
        pageSize: 10,
        classify:That.data.classify
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        let data=res.data.data;
        if(data.length>0) {
          let newData=That.data.goodsdatas.concat(data)//下拉触底时的新请求事件
          That.setData({
            goodsdatas:newData
          })
          wx.hideLoading({
          })
        }
      }
    })
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
    this.getData();//重新加载数据
  },
  /**
   * 返回顶部
   */
  toTop:function() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration:1000
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})