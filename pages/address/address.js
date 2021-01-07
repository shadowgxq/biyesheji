// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [
      {
        username: "shaodw",
        tel: "1555*******",
        default: true,
        address: "浙江省宁波市江北区宁波广播电视大学"
      },
      {
        username: "shaodw",
        tel: "1381*******",
        default: false,
        address: "Home"
      }
    ],
    showAdd: false,
    username:'',
    tel: '',
    toADD: ''
  },
  configAdd() {
    const regTel = /^1[34578]\d{9}$/
    const reg1 = /\S+/
    if(!regTel.test(this.data.tel) || !reg1.test(this.data.username) || !reg1.test(this.data.toADD) ){
      wx.showToast({
        title: "添加失败,请输入合法的内容",
        icon: 'none'
      })
      return 
    }
    const add = {
      username: this.data.username,
      tel: this.data.tel,
      address: this.data.toADD,
    }
    this.data.address.push(add)
    let address = this.data.address
    this.setData({
      showAdd: false,
      address,
      username: '',
      toADD: '',
      tel: ''
    })
  },
  add() {
    const add = !this.data.showAdd
    this.setData({
      showAdd: add
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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