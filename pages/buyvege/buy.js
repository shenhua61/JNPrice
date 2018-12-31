// pages/buyvege/buy.js
let price = 897;
let mycoin=20000;
let vegeid=0;
let buycount=0;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    coins:0,
    mycoins:20000,
    sprice: 897,
    vname:'',
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    vegeid=id;
    this.getCoin();
    this.getVegeinfo(id);
  },

  getVegeinfo:function(id){
    let that=this;
    wx.request({
      url: 'https://pos.shique.net/Mobile/WxAPI/getVegeInfo',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (rdata) {
        var typestr = typeof (rdata.data);
        var vegedata;
        if (typestr == "string") {
          var json = rdata.data;
          json = json.replace("\ufeff", "");
          var jj = JSON.parse(json);
          vegedata = jj;
        }
        else {
          vegedata = rdata.data;
        }
        if (vegedata.status == 1) {
          //that.showVegetable(vegedata);
          
          price=(vegedata.data['s_price']*100).toFixed(0);
          that.setData({ sprice:price,vname:vegedata.data['vegetable_name']});
          //that.setData({ sprice: vegedata.s_price });
        }
        else {
          wx.showToast({
            title: "没有数据！",
            icon: 'loading',
            duration: 1500
          });
        }
      }

    });
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

  },
  buyCount:function(e)
  {
      let pvalue=e.detail.value;
      let total=price*pvalue;
      if (total > mycoin)
      {
        let maxbuy =parseInt(mycoin/price);
        maxbuy=maxbuy.toFixed(0);
        buycount=maxbuy;
        total = price * maxbuy;
        this.setData({ coins: total });
        return maxbuy;        
      }
      buycount=pvalue;
      this.setData({ coins: total});
  },
  getCoin: function () {

    var that = this;
    var userkey = wx.getStorageSync('userkey');
    wx.request({
      url: 'https://pos.shique.net/Pc/API/getCoin',
      data: {
        userid: userkey
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (rdata) {
        var typestr = typeof (rdata.data);
        var gdata;
        if (typestr == "string") {
          var json = rdata.data;
          json = json.replace("\ufeff", "");
          var jj = JSON.parse(json);
          gdata = jj;
        }
        else {
          gdata = rdata.data;
        }
        mycoin=gdata.coin;
        //userid
        that.setData({
          mycoins: mycoin

        });

      }
    }
    );
  },
  toBuy:function()
  {
    var that = this;
    if(buycount<1)
    {
      wx.showModal({
        title: '操作错误',
        content: '买入数量要大于0',
      })
    }

    var userkey = wx.getStorageSync('userkey');
    wx.request({
      url: 'https://pos.shique.net/Mobile/WxAPI/buyVege',
      data: {
        userid: userkey,
        buycount:buycount,
        id:vegeid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (rdata) {
        var typestr = typeof (rdata.data);
        var gdata;
        if (typestr == "string") {
          var json = rdata.data;
          json = json.replace("\ufeff", "");
          var jj = JSON.parse(json);
          gdata = jj;
        }
        else {
          gdata = rdata.data;
        }

        if (gdata.status == 10) {
          wx.showModal({
            title: '提示',
            content: '该时间段不允许交易',
          });
          return;
        }

        if(gdata.status==1)
        {
            wx.redirectTo({
              url: 'store',
            })
        }
        else
        {
          wx.showModal({
            title: '错误',
            content: '买入失败,请稍后再试',
          })
        }
        

      }
    }
    );
  }
})