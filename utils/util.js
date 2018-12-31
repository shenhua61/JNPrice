function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getLogin:getLogin,
  ScreenUtil: ScreenUtil
}

function ScreenUtil() {
  var ScreenSize = {};
   //获取屏幕宽高  
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;     
      ScreenSize.Width = windowWidth;      
      ScreenSize.Height = windowHeight;
      }    
  })
  return ScreenSize;
}

function getLogin(callback)
{
  //检查是否登录态 
  wx.checkSession({
    success: function () {
      var userkey = wx.getStorageSync('userkey');
      if(!userkey)
      {
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.request({
                url: 'https://pos.shique.net/Pc/API/Login',
                data: {
                  code: res.code
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (rdata) {
                  var typestr = typeof (rdata.data);  
                  var jdata;
                  if (typestr == "string") {
                    var json = rdata.data;
                    json = json.replace("\ufeff", "");
                    jdata = JSON.parse(json);
                  }
                  else {
                    jdata = rdata.data;
                  }
                  if (jdata.status == 1) {
                    //存入
                    wx.setStorageSync('userkey', jdata.rdsession);
                    callback(); 
                    return;                  
                  }
                  else {
                    //登录失败
                    wx.showToast({
                      title: "登录失败01!",
                      icon: 'loading',
                      duration: 1500
                    });
                  }
                }
              });
      }
      }
      });
      }
      else
      {
        callback();
        return;
      }
     
    },
    fail: function () {
      //登录态过期
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: 'https://pos.shique.net/Pc/API/Login',
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (rdata) {
                var typestr = typeof (rdata.data);  
                var jdata;             
                if (typestr == "string") {
                  var json = rdata.data;
                  json = json.replace("\ufeff", "");
                  jdata = JSON.parse(json);  
                }
                else
                {
                  jdata=rdata.data;
                }
                if (jdata.status == 1) {
                  //存入
                  wx.setStorageSync('userkey', jdata.rdsession);   
                  callback();
                  return;
                }
                else {
                  //登录失败
                  wx.showToast({
                    title: "登录失败02!",
                    icon: 'loading',
                    duration: 1500
                  });
                }
              }
            });
          } else {
            wx.showToast({
              title: '登录失败03!',
              icon: 'loading',
              duration: 1500
            });
          }
        }
      });
    }
  });
  return true;
}  