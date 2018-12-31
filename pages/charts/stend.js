// pages/charts/stend.js

var Charts = require('wxcharts-min.js');
var SUtil = require('../../utils/util.js');
var vegetableid;
var sheetwidth;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vegename: '',
    vegeurl: '',
    width: '380px',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var id = options.id;
    var awidth = SUtil.ScreenUtil().Width;
    sheetwidth = awidth;
    var fheight = awidth * 0.6;
    this.setData({
      width: awidth + 'px',
      pheight: fheight + 'px'
    });   
    //获取蔬菜名字和图片
    wx.request({
      url: 'https://pos.shique.net/Pc/API/getVegetableInfo',
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
          that.showVegetable(vegedata);
          that.getmonthdata(id,8);
        }
        else {
          wx.showToast({
            title: "没有数据！",
            icon: 'loading',
            duration: 1500
          });
        }
      }});
  },
  showVegetable: function (data) {
    this.setData({
      vegename: data.data.vegename,
      vegeurl: 'https://pos.shique.net' + data.data.firstimg
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  toHome: function () {
    wx.switchTab({
      url: '../index/index',

    })
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
   return{title:'快来看看菜价走势吧'}
  }

  ,
  getmonthdata: function (vegetableid, monthnum) {
    var that = this;
    //点击后
    wx.request({
      url: 'https://pos.shique.net/Pc/API/getNearlyData',
      data: {
        id: vegetableid,
        month: monthnum
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

        if (gdata.status == 1) {
          //          
          that.showMonthData(gdata);
        }
        else {
          wx.showToast({
            title: '没有数据！',
            icon: 'loading',
            duration: 1500
          });
        }
      }

    });
  },
  showMonthData: function (data) {
    console.log(data);
    var tchart = new Charts({
      canvasId: 'secondCanvas',
      type: 'line',
      dataPointShape: false,
      extra: {
        lineStyle: 'curve'
      },
      categories:data.data0['time'],
      series: [{
        name:  '近日菜价走势('+data.time0+')',
        color: '#FF6347',
        data: data.data0['price'],
        format: function (val) {
          //return val.toFixed(2)+'万' ;
        }

      }],
      yAxis: {
        title: '价格走势',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: sheetwidth,
      height: 200
    });

  },
})