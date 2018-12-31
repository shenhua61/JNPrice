// pages/buyvege/remark.js
let id=0;
var SUtil = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    SUtil.getLogin(function () { that.getCoupon(); }); 
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
    return{
        title:'给你一个金币红包',
        path:'/pages/buyvege/coupon?id='+id,
      imageUrl:'http://pflf1llw2.bkt.clouddn.com/coupon.jpg'


    }

  },
  getCoupon:function(){

    var that = this;
    var userkey = wx.getStorageSync('userkey');
    wx.request({
      url: 'https://pos.shique.net/mobile/WxAPI/createCoupon', //
      data: {userid:userkey},
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
        if(jdata.status==1)
        {
          id=jdata.data;
        }
       
      }
    })
  }


})