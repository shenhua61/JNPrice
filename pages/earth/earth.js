// pages/earth/earth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    region: ['云南省', '昆明市', '嵩明区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
   
    //检查是否登录态 
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: 'userkey',
          success: function (res) {           
          }
        })
      },
      fail: function () {
        //登录态过期
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.request({
                url: 'https://im.shique.net/Pc/API/Login',
                data: {
                  code: res.code
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (rdata) {
                  if (rdata.data.status == 1) {
                    //存入
                    wx.setStorage({
                      key: "userkey",
                      data: rdata.data.rdsession
                    });
                  }
                  else {
                    //登录失败
                    wx.showToast({
                      title: "登录失败!",
                      icon: 'loading',
                      duration: 5500
                    });
                  }

                }

              });

            } else {
              wx.showToast({
                title: '登录失败!',
                icon: 'loading',
                duration: 1500
              });
            }
          }
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

   bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
   formSubmit:function(e)
   {
    
     if (e.detail.value.mobile.length == 0)
      {
        wx.showToast({
         title: '手机号码不得为空!',
         icon: 'loading',
         duration: 1500
       });
       setTimeout(function () {
         wx.hideToast()
       }, 2000);
     } else if (e.detail.value.mobile.length != 11) 
     {
       wx.showToast({
         title: '请输入11位手机号码!',
         icon: 'loading',
         duration: 1500
       }); 
     }
    //获取参数
     //提交
     var userkey = wx.getStorageSync('userkey');  
     wx.request({
       url: "https://im.shique.net/index.php?m=home&a=SaveEarthInfo",
       data: {         
         userkey:userkey,
         fcontent: e.detail.value.des,
         mobile:e.detail.value.mobile,
         contact:e.detail.value.contactman,
         square:e.detail.value.square,
         dist0:e.detail.value.dist[0],
         dist1: e.detail.value.dist[1],
         dist2: e.detail.value.dist[2],
       },
       header: {
         'content-type': 'application/json'
       },
       success:function(resultres){
         if (resultres.data.status==1)
         {
          wx.showToast({
            title: '提交成功',
            icon: 'loading',
            duration: 3500
          });
          //跳转页面
          wx.navigateTo({
            url: '../../pages/myearth/myearth'
          });
         }
         else
         {
           wx.showToast({
             title: resultres.data.msg,
             icon: 'loading',
             duration: 3500
           });
         }
       }
     });
  }
})