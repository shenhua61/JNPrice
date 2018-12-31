// pages/myearth/checkearth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  
  getData: function () {
    var redata = null;
    var that = this;
    var userkey = wx.getStorageSync('userkey');
    //that.setData({ motto: '数据12' });
    wx.request({
      url: 'https://im.shique.net/index.php?m=home&a=myearth', //
      data: {
        userkey: userkey
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //解释JSON
        var typestr = typeof (res.data.data);
        if (typestr == "string") {
          var json = res.data.data;
          json = json.replace("\ufeff", "");
          var jj = JSON.parse(json);
          that.setData({ earthlist: jj });
          that.setData({ isadmin: res.data.sign });
        }
        else {
          that.setData({ earthlist: res.data.data });
          that.setData({ isadmin: res.data.sign });
        }
      },
      fail: function () {
        wx.showToast({
          title: "失败了",
          icon: 'loading',
          duration: 5500
        });
      }
    })
    return redata;
  },
  switch1Change: function (e) {
    var id = e.currentTarget.id;
    //发起网络访问
    wx.request({
      url: 'https://im.shique.net/index.php?m=home&a=IsShowSet',
      data: {
        id:id,
        sign:e.detail.value
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //解释JSON
        var typestr = typeof (res.data);
        if (typestr == "string") {
          var json = res.data;
          json = json.replace("\ufeff", "");
          var jj = JSON.parse(json);
          if (jj.data.status)
          {
            wx.showToast({
              title: "修改成功了",
              icon: 'success',
              duration: 1000
            });
          }
          else
          {
             wx.showToast({
              title: "修改失败了",
              icon: 'loading',
              duration: 1000
            });
          }
        }
        else {
          if (res.data.status)
          {
            wx.showToast({
              title: "修改成功",
              icon: 'success',
              duration: 1000
            });
          }
          else
          {
            wx.showToast({
              title: "修改失败",
              icon: 'loading',
              duration: 1000
            });
          }
         
        }
      },
      fail: function () {
        wx.showToast({
          title: "失败了",
          icon: 'loading',
          duration: 1000
        });
      }
    });
  },
  switch2Change: function (e) {
    var id = e.currentTarget.id;
    //发起网络访问
    wx.request({
      url: 'https://im.shique.net/index.php?m=home&a=IsTop',
      data: {
        id: id,
        sign: e.detail.value
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //解释JSON
        var typestr = typeof (res.data);
        if (typestr == "string") {
          var json = res.data;
          json = json.replace("\ufeff", "");
          var jj = JSON.parse(json);
          if (jj.data.status) {
            wx.showToast({
              title: "修改成功了",
              icon: 'success',
              duration: 1000
            });
          }
          else {
            wx.showToast({
              title: "修改失败了",
              icon: 'loading',
              duration: 1000
            });
          }
        }
        else {
          if (res.data.status) {
            wx.showToast({
              title: "修改成功",
              icon: 'success',
              duration: 1000
            });
          }
          else {
            wx.showToast({
              title: "修改失败",
              icon: 'loading',
              duration: 1000
            });
          }

        }
      },
      fail: function () {
        wx.showToast({
          title: "失败了",
          icon: 'loading',
          duration: 1000
        });
      }
    });
  }
})