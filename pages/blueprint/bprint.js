// bprint.js

var SUtil = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'1004',
    showstatus:'青铜会员',
    bannerurl:'http://image.shique.net/37758PICvw9.jpg',
    wxnum:'quebao_data',
    credit:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showToast({
      title: "正在加载",
      icon: 'loading',
      duration: 500
    });
    SUtil.getLogin(function () { that.getUser();that.getwx(); }); 
   

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
    var that = this;
    SUtil.getLogin(function () { that.dayCheck(); }); 
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
  dayCheck: function () {
    var that = this;
    var userkey = wx.getStorageSync('userkey');
    wx.request({
      url: 'https://pos.shique.net/Pc/API/dayCheck',
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
          credit: gdata.credit

        });

        if (gdata.status==1) {
          wx.showToast({
            title: '+'+gdata.data+'签到成功',
            duration:3000
          })
        }
        else {
         

        }
      }

    });
  },
  getUser:function()
  {
    var that = this;
    var userkey = wx.getStorageSync('userkey');
    wx.request({
      url: 'https://pos.shique.net/Pc/API/getInfo',
      data: {
        userid:userkey
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
          userid:gdata.userid
        });
        if(gdata.is_buy)
        {
          that.setData({
            showstatus:'黄金会员 有效期:'+gdata.valid_time
          });
        }
        else
        {
           that.setData({
             showstatus:'青铜会员'
             }
           )

        }
      }

    });
  },
  toDetail:function(){
    wx.navigateTo({
      url: 'creditdetail',
    })
  }
  ,
  getwx:function(){
    var that=this;
    wx.request({
      url: 'https://pos.shique.net/Mobile/WxAPI/getwxNum',
      data: {     
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (rdata) {
        that.setData({
          wxnum:rdata.data
        });
        }});

  },
  setBo:function(e){
    var txt = e.currentTarget.dataset.wxnum;
    wx.setClipboardData({
      data: txt,
      success: function (res) {
       wx.showToast({
         title: '复制成功',
       })
      }
    })

  }
})