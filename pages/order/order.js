// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    orderData: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取订单数据
    var orderData = wx.getStorageSync('order');

    orderData = !orderData ? [] : orderData;

    this.setData({
      orderData
    })

  },


  //查看商品详情
  previewDetail: function(e) {
    wx.navigateTo({
      url: '../../pages/spdetail/spdetail?goodsId=' + e.currentTarget.dataset.goodsid
    })
  },

  //删除订单
  removeOrder: function (e) {

    var index = e.currentTarget.dataset.index;

    var orderId = e.currentTarget.dataset.orderid;

    this.data.orderData.splice(index, 1);

    this.setData({
      orderData: this.data.orderData
    })

    //获取订单数据
    var orderData = wx.getStorageSync('order');
    for (var i = 0; i < orderData.length; i++) {
      if (orderData[i].orderId == orderId) {
        orderData.splice(i, 1);
        break;
      }
    }

    //修改订单数据
    wx.setStorageSync('order', orderData);

  }

  
})