// pages/buyvege/buyin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pricelist: [],
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
   this.getPrice();
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

  toBuy: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.redirectTo ({
      url: 'buy?id=' + id,
    })   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  getPrice: function () {
    var that = this;
    wx.showLoading({
      title: '正在加载...',
      mask:true
    })
    wx.request({
      url: 'https://pos.shique.net/mobile/WxAPI/getNowDataJson', //
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //解释JSON       
        var typestr = typeof (res.data);
        var jdata;
        if (typestr == "string") {
          var json = res.data;
          json = json.replace("\ufeff", "");
          jdata = JSON.parse(json);
        }
        else {
          jdata = res.data;
        }
        for( var i=0;i<jdata.length;i++)
        {
          //jdata[i]['s_price'] = (jdata[i]['s_price']*100).toFixed(0);
        }

        that.setData({ pricelist: jdata });
        var nowtime = jdata[0]['run_time'].substring(0, 4) + '-' + jdata[0]['run_time'].substring(4, 6) + '-' + jdata[0]['run_time'].substring(6, 8);
        that.setData({ nowdate: nowtime });
        wx.hideLoading();
      }
    })
  }
})