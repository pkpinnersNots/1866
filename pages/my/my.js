// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: ["我的收藏", "我的订单", "我的地址", "联系客服", "关于我们"],

    mode: [
      { title: '我的收藏', url: '../../pages/like/like' },
      { title: '我的订单', url: '../../pages/order/order' },
      { title: '我的地址', url: '../../pages/address/address' },
      { title: '联系客服', url: '../../pages/contact/contact' },
      { title: '关于我们', url: '../../pages/aboutus/aboutus' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          // 获取用户信息
          wx.getUserInfo({
            success(res) {
              console.log(res);
              _this.setData(res.userInfo);
            }
          })
        } else {
          console.log("登录失败" + res.errMsg);
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },

  //页面跳转
  goPage: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})