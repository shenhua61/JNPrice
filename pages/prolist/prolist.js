// pages/prolist/prolist.js

var SUtil = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productlist:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.showToast({
      title: "正在加载",
      icon: 'loading',
      duration: 500
    });
    SUtil.getLogin(function(){that.loadData();}); 
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  loadData:function()
  {
    //加载数据
    var that=this;
    var userkey = wx.getStorageSync('userkey');
    wx.request({
      url: 'https://pos.shique.net/Pc/API/getNewPriceJson',
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
        that.setData({
          productlist: gdata
        });

      }

    }); 
  }
  ,
  tomap:function(e)
  {
    //检查权限
    this.checkBuy(e);
  },
  checkBuy: function (e) {
    var that = this;
    var userid = wx.getStorageSync('userkey');

    var icheck=e.currentTarget.dataset.check;
    if(icheck==1)
    {
      wx.navigateTo({
        url: '../../pages/charts/charts?id=' + e.currentTarget.dataset.id
      });
    }else
    {
      wx.navigateTo({
        url: '../../pages/uncheck/uncheck'
      });
    }
   
  }

})