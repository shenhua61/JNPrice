// pages/article/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   tips:"下拉加载更多...",
   newslist:[],
   pagesize: 5,
   pageindex: 1,
   pagecount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewsList(1);
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

  toDetail:function(e)
  {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail?id='+id,
    })
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

  getNewsList: function (pindex) {
    let that = this;
    wx.request({
      url: 'https://pos.shique.net/mobile/NewsAPI/getPageNews', //
      data: {
        psize:5,
        pindex:pindex
      },
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
        that.setData({
          newslist: that.data.newslist.concat(jdata.data), pageindex: jdata.pindex, pagecount: jdata.pcount
        });
        if (jdata.pcount >= jdata.pindex) {
          that.setData({ tips: '没有更多内容了' });
        }
        
      }
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var pagesize = this.data.pagesize;
    var pageindex = this.data.pageindex;
    var pagecount = this.data.pagecount;
    if (pageindex >= pagecount) {
      this.setData({ tips: '没有更多内容了' });

    }
    else {
      pageindex = pageindex + 1;
      this.getNewsList(pageindex);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})