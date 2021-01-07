Component({
  properties: {
  
  },
  data: {
    goodsdatas: [],
    goodGoods:[],
    pageNo:1,//上拉的数量
    pageSize:10,//上拉的条数,
    classify:"401",
    sellcount: 1000
  },

  methods: {
    getGoodsDatas:function() {
      let That=this;
      wx.request({
        url: 'http://127.0.0.1:3000/goodsList',
        // data: {
        //   pageNo:That.data.pageNo,
        //   pageSize:That.data.pageSize,
        //   classify:That.data.classify
        // },
        header: {
          'Content-Type':'application/json'
        },
        success: (result) => {      
          let data=result.data.data;     
          if(data && data.length>0) {
            let newData=That.data.goodsdatas.concat(data)
            That.setData({
              goodsdatas:newData
            })     
          }
        },
      })
    },
    godetail(e) {
      let params=e.currentTarget.dataset.goodsid; 
      wx.navigateTo({
        url: '/pages/detail/detail?goodsNo='+params,
      })
    },
  },
  created() {
    this.getGoodsDatas();
  },

})
