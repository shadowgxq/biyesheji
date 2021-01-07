// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    background: ['/images/swiper3.jpg', '/images/swiper2.jpg', '/images/swiper1.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular:true,
    goodsdatas: [],
    xianshi:[],
    special:[],
    goodGoods:[],
    pageNo:1,//上拉的数量
    pageSize:10,//上拉的条数,
    isComputed:false,//下拉完成，
    classify:"",//分类,
    active:500,
    sellcount: 1000,
    oldItem: []
  },
  //得到限时抢购和特色专区的数据；
 
  /**
   * 点击更多的效果，弹出以下即为全部商品
   */
  toMore:function() {
    wx.showToast({
      title: '以下商品即为全部的商品',
      duration: 2000,
      icon:'none'
    })
  },
  /**
   * 前往search页面
   */
  toDetail:function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //得到tab数据，发送请求
  getGoodsDatas:function() {
    wx.showLoading({
      title: '加载中',
    })  
    let That=this;
    // wx.request({
    //   url: 'https://ys.lumingx.com/api/manage/GoodsList',
    //   data: {
    //     pageNo:That.data.pageNo,
    //     pageSize:That.data.pageSize,
    //     classify:That.data.classify
    //   },
    //   header: {
    //     'Content-Type':'application/json'
    //   },
    //   success: (result) => {    
    //     wx.stopPullDownRefresh();
    //     wx.hideNavigationBarLoading();
    //     wx.hideLoading();
    //     let data=result.data.data;     
    //     if(data && data.length>0) {
    //       let newData=That.data.goodsdatas.concat(data)
    //       That.setData({
    //         goodsdatas:newData
    //       })     
    //     }else {  
    //       That.setData({
    //         isComputed:true
    //       })
    //     }
    //   }
    // })
    wx.request({
      url: 'http://127.0.0.1:3000/goodsList',
      success: (res) => {
        console.log(res);
        wx.hideLoading()
        let data=res.data.data;
        let newData=That.data.goodsdatas.concat(data)
        That.setData({
          goodsdatas:newData
        }) 
      }
    })
  },
  //跳转到detail页面
  godetail(e) {
    let params=e.currentTarget.dataset.goodsid; 
    wx.navigateTo({
      url: '/pages/detail/detail?goodsNo='+params,
    })
    this.data.oldItem.push(e.currentTarget.dataset.item)
    const newItem = this.data.oldItem
    wx.setStorageSync('history', newItem)
  },
  /**
   * 返回顶部
   */
  toTop:function() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDatas();//第一次加载
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
   * 会员
   */
  huiyuan:function() {
    wx.showToast({
      title: '功能尚不能使用',
      icon: 'none',
      duration: 1500
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()//加载
    //将数据先清空；
    this.data.goodsdatas=[];
    //设置page页；
    this.setData({
      pageNo:1
    })
    //发送请求；
    this.getGoodsDatas()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNo:this.data.pageNo+1
    })
    this.getGoodsDatas();
  },
  changeNavName(e) {
    this.setData({
      active:e.currentTarget.id
    })
    if(e.currentTarget.id==500 ) {
      this.setData({
        classify:"",
        pageNo:1
      })
      this.data.goodsdatas=[];
      this.getGoodsDatas()
    }else if(e.currentTarget.id==501) {
      this.setData({
        classify:401,
        pageNo:1
      })//改变分类
      this.data.goodsdatas=[];//清空数据
      this.getGoodsDatas();//重新获取数据
    }else if(e.currentTarget.id==502){
      this.setData({
        classify:402,
        pageNo:1
      })
      this.data.goodsdatas=[];
      this.getGoodsDatas();
    }else if(e.currentTarget.id=='503'){
      this.setData({
        classify:102,
        pageNo:1
      })
      this.data.goodsdatas=[];
      this.getGoodsDatas();
    }else if(e.currentTarget.id==504 ) {
      this.setData({
        classify:"",
        pageNo:1
      })
      this.data.goodsdatas=[];
      this.getGoodsDatas()
    }else if(e.currentTarget.id==505) {
      this.setData({
        classify:401,
        pageNo:1
      })//改变分类
      this.data.goodsdatas=[];//清空数据
      this.getGoodsDatas();//重新获取数据
    }else if(e.currentTarget.id==506){
      this.setData({
        classify:402,
        pageNo:1
      })
      this.data.goodsdatas=[];
      this.getGoodsDatas();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})