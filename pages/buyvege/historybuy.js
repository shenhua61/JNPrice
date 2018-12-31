// pages/buyvege/historybuy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptysign: 1,
    storelist: []
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
      this.getHisStore();
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

  }
  , getHisStore: function () {
    var that = this;
    wx.showLoading({
      title: '正在加载...',
      mask: 'true',
    })
    var userkey = wx.getStorageSync('userkey');
    wx.request({
      url: 'https://pos.shique.net/Mobile/WxAPI/getHisStore',
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
        if (gdata.data.length == 0) {
          that.setData({ emptysign: 0 });
        }
        else {
          that.setData({ emptysign: 1 });
        }

        for (let i = 0; i < gdata.data.length; i++) {
          gdata.data[i]['nowprice'] = (gdata.data[i]['nowprice'] * 100).toFixed(0);

          gdata.data[i]['profit'] = ((gdata.data[i]['sell_price'] - gdata.data[i]['buy_price']) * gdata.data[i]['buy_count']-gdata.data[i]['sell_fee']).toFixed(0);
          gdata.data[i]['rate'] = ((gdata.data[i]['sell_price'] - gdata.data[i]['buy_price']) * 100 / gdata.data[i]['buy_price']).toFixed(0);


        }

        that.setData({ storelist: gdata.data });
        wx.hideLoading();


      }
    }
    );
  }

})