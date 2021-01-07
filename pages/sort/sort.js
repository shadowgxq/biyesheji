// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1000,//左侧栏目的切换
    goodsdatas:[],
    pageSize:10,
    classify:"",
    pageNo:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDate();
    wx.request({
      url: 'http://mobilecdnbj.kugou.com/api/v3/tag/list',
      data: {
        pid:0,
        apiver:2,
        plat:0
      },
      success: (result) => {
        console.log(result);
      },
    })
  },
  /**
   * 搜索功能的提示
   */
  toSearch:function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /**
   * 返回顶部
   */
  toTop:function() {
    wx.pageScrollTo({
      duration: 1000,
      scrollTop: 0,
    })
  },
  /**
   * 得到数据发送请求
   */
  getGoodsDate:function() {
    wx.showLoading({
      title: '加载中',
      success: (res) => {},
    })
    var That=this;
    wx.request({
      url: 'http://127.0.0.1:3000/goodsList',
      // data: {
      //   pageNo:That.data.pageNo,
      //   pageSize:That.data.pageSize,
      //   classify:That.data.classify
      // },
      success: (result) => {
        wx.hideLoading({
        })
        let data=result.data.data;
        if(data && data.length>0) {
          var newData=That.data.goodsdatas.concat(data)
          That.setData({
            goodsdatas:newData
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 左侧的选择类别栏目
   */
  toChooseName:function(e) {
    if(e.currentTarget.dataset.index==1000) {
      this.setData({
        current:1000,
        classify:"",
        goodsdatas:[]
      })
      this.getGoodsDate();//调用的数据
    }else if(e.currentTarget.dataset.index==1001) {
      this.setData({
        current:1001,
        classify:401,
        goodsdatas:[]
      })
      this.getGoodsDate()
    }if(e.currentTarget.dataset.index==1002) {
      this.setData({
        current:1002,
        classify:402,
        goodsdatas:[]
      })
      this.getGoodsDate();
    }if(e.currentTarget.dataset.index==1003) {
      this.setData({
        current:1003,
        classify:102,
        goodsdatas:[]
      })
      this.getGoodsDate();
    }if(e.currentTarget.dataset.index==1004) {
      this.setData({
        current:1004,
        classify:401,
        goodsdatas:[]
      })
      this.getGoodsDate()
    }if(e.currentTarget.dataset.index==1005) {
      this.setData({
        current:1005,
        classify:402,
        goodsdatas:[]
      })
      this.getGoodsDate();
    }if(e.currentTarget.dataset.index==1006) {
      this.setData({
        current:1006,
        classify:102,
        goodsdatas:[]
      })
      this.getGoodsDate();
    }
  },
  /**
   * 前往详情页
   */
  godetail:function(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?='+e.currentTarget.dataset.goodsid,
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
    this.setData({
      pageNo:this.data.pageNo+1
    })//如果触底时goodsdatas增加10每次增加10
    this.getGoodsDate();//重新渲染数据
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})