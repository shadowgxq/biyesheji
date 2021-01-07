// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,//合计
    shopCartList: [],//购物车的数据
    isCheckedAll: false,//判断全选功能是否已经选中,
    userId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = wx.getStorageSync('openid')
    this.setData({
      userId: a
    })
    this.getCartList();//调用购物车数据
    setTimeout(() => {
      this.data.shopCartList.forEach((item) => {
        item.isChecked = false
      })
      this.setData({
        shopCartList: this.data.shopCartList
      })//复选框的状态
    }, 50);
  },
  /**
   * 选中其中一个复选框
   */
  chooseChecked: function (e) {
    var That = this;
    let index = 0;//选中的商品的数量
    let all = 0;//合计总价
    for (let i = 0; i < this.data.shopCartList.length; i++) {
      //选中的值先发生改变；
      if (e.currentTarget.dataset.id == this.data.shopCartList[i].Id) {//循环遍历购物车的item项
        this.data.shopCartList[i].isChecked = !this.data.shopCartList[i].isChecked//改变选中的数据的值
      }
      // 判断选中的个数（index）
      if (this.data.shopCartList[i].isChecked == true) {
        index += 1;//每一个true中index会增加1,当全部选中时全选开启，不是的时候全选不开启
        if (index == this.data.shopCartList.length) {
          this.setData({
            isCheckedAll: true//开启全选
          })
        } else {
          this.setData({
            isCheckedAll: false//取消全选
          })
        }
        //选中时的商品总价的判断
        let onePrice = parseFloat(this.data.shopCartList[i].SaleAmount);//选中商品的单价
        let number = parseInt(this.data.shopCartList[i].Quantity);//选中商品的数量
        all += onePrice * number//总价的判断
      }
      if (index == 0) {
        all = 0
        this.setData({
          isCheckedAll: false//取消全选
        })
      }
      That.setData({
        totalPrice: all//总价的改变
      })
    }
  },
  /**
   * 跳往支付页面
   */
  toPay: function () {
    const selectt = this.data.shopCartList.find(item => item.isChecked)
    if (!selectt) {
      wx.showToast({
        title: '请选择要购买的商品',
        duration: 1000,
        icon: 'none',
        success: (result) => {
        }
      });
      return
    }
    let buyList = []//购买的商品列表
    this.data.shopCartList.forEach((item) => {
      if (item.isChecked == true) {
        buyList.push(item)
      }
    })
    wx.request({
      url: 'http://42.192.64.66:80/orderAdd',
      data: {
        userId: this.data.userId,
        status: '0',
        orderList: buyList
      },
      header: { 'content-type': 'application/json' },
      method: 'POST',
      dataType: 'json',
      success: (result) => {
        console.log(result);
        wx.navigateTo({
          url: '/pages/pay/pay?orderId=' + result.data.order_id,
        })
      }
    });
    this.setData({
      totalPrice: 0,
      isCheckedAll: false
    })

  },
  /**
   * 选择全选按钮
   */
  chooseCheckedAll() {
    let isNewCheckedAll = !this.data.isCheckedAll
    this.setData({
      isCheckedAll: isNewCheckedAll
    });
    var all = 0;
    //循环遍历每一个选中的元素
    this.data.shopCartList.forEach((item) => {
      item.isChecked = this.data.isCheckedAll;
      if (item.isChecked == true) {
        let onePrice = parseFloat(item.SaleAmount);
        let oneNumber = parseInt(item.Quantity);
        all += onePrice * oneNumber
      }
    })
    this.setData({
      shopCartList: this.data.shopCartList,
      totalPrice: all
    })
  },
  /**
   * 减少按钮的书写
   */
  toreduce: function (e) {
    //循环遍历购物车
    this.data.shopCartList.forEach((item) => {
      if (item.Id == e.currentTarget.dataset.reduce) {//判断该按钮是否点中
        item.Quantity = item.Quantity - 1//每次点击1次数量减少1
        //当点击按钮为1时的值，使得商品数量为1
        if (item.Quantity < 1) {
          item.Quantity = 1
        }
      }
    })
    //计算总价
    let total = 0;
    this.data.shopCartList.forEach((item) => {
      if (item.isChecked == true) {
        let onePrice = parseFloat(item.SaleAmount);
        let oneNumber = parseInt(item.Quantity);
        total += onePrice * oneNumber
      }
    })
    this.setData({
      shopCartList: this.data.shopCartList,//更改购物车数据,
      totalPrice: total
    })
  },
  /**
   * 增加按钮的书写
   */
  toadd: function (e) {
    //循环遍历购物车
    this.data.shopCartList.forEach((item) => {
      if (e.currentTarget.dataset.add == item.Id) {//判断购物车是否选中
        item.Quantity = item.Quantity + 1//每次增加1
      }
    })
    //计算总价
    let total = 0;
    this.data.shopCartList.forEach((item) => {
      if (item.isChecked == true) {
        let onePrice = parseFloat(item.SaleAmount);
        let oneNumber = parseInt(item.Quantity);
        total += onePrice * oneNumber
      }
    })
    this.setData({
      shopCartList: this.data.shopCartList,//更新数据
      totalPrice: total
    })
  },
  /**
   * 删除购物车
   */
  toDelete: function () {
    const selectt = this.data.shopCartList.find(item => item.isChecked)
    if (!selectt) {
      wx.showToast({
        title: '未选中商品',
        duration: 1000,
        icon: 'none',
        success: (result) => {
          let total = 0;
          this.setData({
            totalPrice: total
          })
        }
      });
      return
    }
    let that = this
    wx.showModal({
      content: '确定要将这个宝贝移除？',
      success(res) {
        if (res.confirm) {
          let arr = [];//要删除的购物车的ids
          //循环遍历购物车
          that.data.shopCartList.forEach((item) => {
            //选中的购物车；
            if (item.isChecked == true) {
              arr.push(String(item.Id))
            }
          })
          console.log(arr);
          wx.request({
            url: 'http://42.192.64.66:80/delete',
            data: {
              userId: that.data.userId,
              Ids: arr
            },
            dataType: "json",
            method: "POST",
            success: (result) => {
              console.log(result)
            },
          })
          that.getCartList();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //获取购物车列表
  getCartList: function () {
    let That = this;
    wx.request({
      url: 'http://42.192.64.66:80/loadShop',
      data: {
        userId: this.data.userId
      },
      success: (result) => {
        let data = result.data.data
        let list = []
        data.forEach(item => {
          list.push(item.goodsList)
        })
        list.forEach(item => {
          item.Quantity = 1
        })
        That.setData({
          shopCartList: list
        })
      },
    })
  },
  /**
   * 去首页购物
   */
  toHome: function () {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  godetail(e) {
    let params = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '/pages/detail/detail?goodsNo=' + params,
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
    this.getCartList();//监听购物车的变化

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