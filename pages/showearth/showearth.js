// pages/showearth/showearth.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {    
    motto: '土地流转信息',
    userInfo: {},
    earthlist: [{ contentstr:'加载中...' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    this.getData();
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
    this.getData();
    wx.showToast({
      title: "刷新中...",
      icon: 'loading',
      duration: 1500
    });
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
  getData: function () {
    var redata = null;
    var that = this;
    //that.setData({ motto: '数据12' });
    wx.request({
      url: 'https://im.shique.net/index.php?m=home&a=showearth', //
      data: {},     
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //解释JSON
        var typestr=typeof (res.data);
        if(typestr=="string")
        {
          var json = res.data;
          json = json.replace("\ufeff", "");
          var jj = JSON.parse(json);
          that.setData({ earthlist:jj }); 

        }
        else{
          that.setData({ earthlist: res.data});    
        }
      },
      fail:function()
      {
        wx.showToast({
          title: "失败了",
          icon: 'loading',
          duration: 5500
        }); 
      }
    })
    return redata;

  }



})