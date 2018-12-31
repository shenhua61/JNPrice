// pages/charts/charts.js
var Charts = require('wxcharts-min.js');
var SUtil = require('../../utils/util.js'); 
var vegetableid;
var sheetwidth;
var ischeck=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   width:'380px',
   height:'200px',   
   pheight:'202px',
   vegename:'',
   vegeurl:'',
   validtime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    vegetableid = id;
    var that = this;
    //登录和检查是否已经购买
    SUtil.getLogin(function () { that.checkBuy();});
    var awidth = SUtil.ScreenUtil().Width;
    sheetwidth=awidth;
    var fheight = awidth * 0.6;
    this.setData({
      width: awidth+'px',
      pheight: fheight+'px'
    });   

    var data1;
    var data2;
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
        }
        else {
          wx.showToast({
            title: "没有数据！",
            icon: 'loading',
            duration: 1500
          });
        }
      }

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
  
  },
  getYearData:function(id)
  {
    var that=this;
    //获取数据    
    wx.request({
      url: 'https://pos.shique.net/Pc/API/getYearData',
      data: {
        id: id
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

          that.DrawYearData(gdata);
        }
        else {
          wx.showToast({
            title: "没有数据！",
            icon: 'loading',
            duration: 1500
          });
        }
      }

    });
  }
  ,
  DrawYearData:function (data) {
    new Charts({
      canvasId: 'firstCanvas',
      type: 'line',
      dataPointShape: false,
      extra: {
        lineStyle: 'curve'
      },
      categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      series: [{
        name: data.time2+'年月平均',
        color: '#6A5ACD',
        data: data.data2['avg_price'],
        format: function (val) {
          return '' ;
        }
      }, {
        name: data.time1 + '年月平均',
        color: '#EE3B3B',
        data: data.data1['avg_price'],
        format: function (val) {
          return '' ;
        }
      }],
      yAxis: {
        title: '年平均价格走势(元/公斤)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: sheetwidth,
      height: 200
    });
  },
  getmonth: function (e)
  {
    var that=this;
    //点击月份按钮
     var monthnum=e.currentTarget.dataset.id;
     
     this.getmonthdata(vegetableid, monthnum);     
     
  },
  getmonthdata: function (vegetableid,monthnum)
  {
    var that = this;
    //点击后
    wx.request({
      url: 'https://pos.shique.net/Pc/API/getMonthData',
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
  showMonthData:function(data)
  {
    var tchart = new Charts({
      canvasId: 'secondCanvas',
      type: 'line',
      dataPointShape: false,
      extra: {
        lineStyle: 'curve'
      },
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      series: [{
        name: data.time2 +'.'+data.month+'月菜价',
        color: '#6A5ACD',
        data: data.data2['price'],
        format: function (val) {
          //return val.toFixed(2)+'万' ;
        }

      },
      {
        name: data.time1 + '.' + data.month + '月菜价',
        color: '#EE3B3B',
        data: data.data1['price'],
        format: function (val) {
          //return val.toFixed(2)+'万' ;
        }

      }],
      yAxis: {
        title: data.month +'月价格走势(元/公斤)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: sheetwidth,
      height: 200
    });
   
  },
  showVegetable:function(data)
  {
    this.setData({
      vegename: data.data.vegename,
      vegeurl: 'https://pos.shique.net'+data.data.firstimg
    });
  },
  checkBuy:function()
  {
    var that=this;   
    //成功
    that.getYearData(vegetableid);   
    //获取当前月份
    var date = new Date;
    var month = date.getMonth() + 1;
    var daynum = date.getDate(); //获取当前日(1-31)
    if (daynum > 3) {
      that.getmonthdata(vegetableid, month);
    }
    else {
      that.getmonthdata(vegetableid, month - 1);
    }
  }

})