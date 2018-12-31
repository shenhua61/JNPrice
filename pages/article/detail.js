// pages/article/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   newsinfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNews(options.id);
  },

  getNews:function(id)
  {
    let that = this;
    wx.request({
      url: 'https://pos.shique.net/mobile/NewsAPI/getNews', //
      data: {       
        id: id
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
          newsinfo:jdata.data
        });
        

      }
    })
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

  toHome:function(){
    wx.switchTab({
      url: '../index/index',
     
    })
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
    let title=this.data.newsinfo.title
   return{
     "title":title,
     "imgUrl": ''
   }
  }
})