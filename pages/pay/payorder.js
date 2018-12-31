// pages/pay/payorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  vegetablename:'',
  validtime:'',
  paymoney:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder();  

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
  getOrder:function()
  {
    var that=this;
    var userkey = wx.getStorageSync('userkey');
    //发起创建订单
    wx.request({
      url: 'https://pos.shique.net/Home/PayAPI/payment',
      data: {
        userid: userkey,        
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
        if (gdata.status == 0) {
          wx.showToast({
            title: "用户无效！",
            icon: 'loading',
            duration: 500
          });
        }
        else if(gdata.status==2) {
          wx.showToast({
            title: "没有订单！",
            icon: 'loading',
            duration: 500
          });
        }
        else if(gdata.status==1)
        {
          var ltime='';
          if (gdata.data['timetype']==1)
          {
            ltime = "一年(366天)";
          }
          else if (gdata.data['timetype'] == 3)
          {
            ltime="一个月(31天)";
          }
          //有订单
          that.setData({
            vegetablename: gdata.data['vegetable_name'],
            validtime: ltime,
            paymoney: gdata.data['order_all_price']

          });

        }

      }

    }); 
  }
})