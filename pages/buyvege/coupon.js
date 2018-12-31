// pages/buyvege/coupon.js

var SUtil = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {      
      coins:0,
      tips:'金币已经放入您的账户'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id=options.id;      
      let that = this;
      SUtil.getLogin(function () { that.getCoupon(id); }); 

     
      
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
  toHome: function () {
    wx.switchTab({
      url: '../index/index',

    })
  },
  toBuy: function () {
    wx.switchTab({
      url: '../buyvege/index',

    })
  },

  getCoupon:function(cid){
    var that = this;
    var userkey = wx.getStorageSync('userkey');
    wx.request({
      url: 'https://pos.shique.net/mobile/WxAPI/getCoupon', //
      data: { userid: userkey,cid:cid },
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
        console.log(jdata);
        if (jdata.status == 1) {
          that.setData({ coins: jdata.data, tips:'金币已经放入您的账户'});
        }
        else if(jdata.status==2)
        {
          that.setData({ coins: jdata.data,tips:'您已领取过了' });
        }

      }
    })
  }

})