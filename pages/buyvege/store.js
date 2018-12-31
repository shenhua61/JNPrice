// pages/buyvege/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    emptysign:1,
    storelist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getStore();
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
    this.getStore();
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

  sell:function(e){
    let id = e.currentTarget.dataset.id;
    let vid = e.currentTarget.dataset.vegeid;
    let buycount = e.currentTarget.dataset.vcount;
    let that=this;
    wx.request({
      url: 'https://pos.shique.net/Mobile/WxAPI/getVegeInfo',
      data: {
        id: vid
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
          //that.showVegetable(vegedata);

          let price = (vegedata.data['s_price'] * 100).toFixed(0);
          that.toSell(vegedata.data['vegetable_name'], price, buycount,id);
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
  toSell:function(name,price,count,id)
  {
    let that=this;
   wx.showModal({
     title: '确认卖出',
     content: price+'金币每手卖出'+count+'手'+name,
     success:function(res)
     {
       if(res.cancel)
       {
         return;
       }
       else
       {
         var userkey = wx.getStorageSync('userkey');
         wx.request({
           url: 'https://pos.shique.net/Mobile/WxAPI/sellVege',
           data: {
             userid: userkey,
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

             if(gdata.status==10)
             {
               wx.showModal({
                 title: '提示',
                 content: '该时间段不允许交易',
               });
               return;
             }

             if (gdata.status == 1) {
               that.getStore();
             }



           }
         }
         );
       }
     }
   })
      
   
  }
  ,
  getStore: function () {
    var that = this;
    wx.showLoading ({
      title: '正在加载...',
      mask: 'true',     
    })
    var userkey = wx.getStorageSync('userkey');
    wx.request({
      url: 'https://pos.shique.net/Mobile/WxAPI/getStore',
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
        else 
        {
          gdata = rdata.data;
        }
        if (gdata.data.length==0)
        {
          that.setData({emptysign:0});
        }
        else
        {
          that.setData({ emptysign: 1 });
        }

        for(let i=0;i<gdata.data.length;i++)
        {
          gdata.data[i]['nowprice'] = (gdata.data[i]['nowprice']*100).toFixed(0);
          
          gdata.data[i]['profit'] = ((gdata.data[i]['nowprice']-gdata.data[i]['buy_price'])*gdata.data[i]['buy_count']).toFixed(0);
          gdata.data[i]['rate'] = ((gdata.data[i]['nowprice'] - gdata.data[i]['buy_price'])*100 / gdata.data[i]['buy_price']).toFixed(0);


        }

        that.setData({ storelist:gdata.data});
        wx.hideLoading();


      }
    }
    );
  }
})