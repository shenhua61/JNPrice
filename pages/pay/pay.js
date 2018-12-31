// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productname:'',
    productlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var that=this;
    wx.request({
      url: 'https://pos.shique.net/Pc/API/getBuys',
      data: {
        id:id,
        type:4
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
          productname: gdata[0]['wares_name'],
          productlist: gdata
        });

      }

    }); 
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
  /*创建订单并跳转*/
  createOrder:function(e)
  {
    var wareid = e.currentTarget.dataset.id;
    var userkey = wx.getStorageSync('userkey');
    //发起创建订单
    wx.request({
      url: 'https://pos.shique.net/Pc/API/setOrder',
      data: {
        userid: userkey,
        id: wareid
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
        //判断返回值
        if (gdata.result==true)
        {
          //跳转页面
          wx.navigateTo({
            url: '../../pages/pay/payorder'
          })
        }
        else
        {
          wx.showToast({
            title: "开通失败!",
            icon: 'loading',
            duration: 500
          });
        }

      }

    }); 
  }


})