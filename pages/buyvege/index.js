// pages/buyvege/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    credit:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCoin();
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
    this.getCoin();
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
  toDetail: function () {
    wx.navigateTo({
      url: '../blueprint/creditdetail',
    })
  },
  toStore: function () {
    wx.navigateTo({
      url: 'store',
    })
  },
  buyIn: function () {
    wx.navigateTo({
      url: 'buyin',
    })
  },

  exchangeLog:function(){
    wx.navigateTo({
      url: 'historybuy',
    })

  },
  getCoin:function()
  {
    
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
          //userid
          that.setData({
            credit: gdata.coin

          });
          
      }
      }
      );
  }
  
  
})