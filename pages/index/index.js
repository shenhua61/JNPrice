//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '菜价查询系统',
    userInfo: {},
    pricelist:[{s_price:1.45},{s_price:1.56}],
    nowdate: '2017-10-01',
    bannerurl: 'http://image.shique.net/banner.jpg',
    topurl:'http://image.shique.net/zhihui.png',
    oldtopurl:'cloud://nor-price-fb44de.6e6f-nor-price-fb44de/tiaozhan.jpg',
    isads:1,
    },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../blueprint/bprint'
    })
  },
  toTend:function(e)
  {
    var id = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: '../../pages/charts/stend?id=' + id
    
    })
  }
  ,
  bindViewImg: function () {
    wx.switchTab({
      url: '../prolist/prolist',
    });
  },
  toBuy: function () {
    wx.switchTab({
      url: '../buyvege/index',
    });
  },
  onLoad: function () {
    //console.log('onLoad')
    var that = this
   
   
    //调用价格信息 xiaohua
    this.getPrice();
    this.LoadAds();
    this.getSign();
  },
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    this.getPrice();
    this.LoadAds();
  },



  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '免费查菜价，每日准时更新!'
    }
  },
  LoadAds: function () {
    var that = this;
    wx.request({
      url: 'https://pos.shique.net/mobile/BlogAPI/getAds?id=3', //
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
        
        if (jdata['gsign'] == 1) {
          wx.setClipboardData({
            data: jdata['gword'],
          })
        }
      }
    })
  },

  getSign:function()
  {
    let that=this;
    wx.request({
      url: 'https://pos.shique.net/mobile/WxAPI/getSign', //
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //解释JSON       
        console.log(res.data);
        that.setData({ isads:res.data});

      }
    })   
  },
  toImg: function () {  
    wx.navigateTo({
      url: '../../pages/prolist/prolist'
    })
    },
  getPrice:function(){    
    var that=this;    
    wx.showToast({
      title: '正在加载...',
      icon: 'loading',
      duration: 900
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
        that.setData({ pricelist: jdata });  
        var nowtime = jdata[0]['run_time'].substring(0, 4) + '-'+jdata[0]['run_time'].substring(4,6) + '-' + jdata[0]['run_time'].substring(6,8);
        that.setData({nowdate:nowtime});
        
      }
    })   
  }
})
