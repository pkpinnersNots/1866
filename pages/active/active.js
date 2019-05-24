// pages/active/active.js
//页面注册
Page({

      /**
       * 页面的初始数据
       */
      data: {

        //活动商品列表
        hotGoodsList: []

      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {

        //获取商品数据
        var goodsList = wx.getStorageSync('goodsList');

        goodsList.forEach(v => {
          if (v.isHot) {
            this.data.hotGoodsList.push(v);
          }
        })

        this.setData({
          hotGoodsList: this.data.hotGoodsList
        })


        console.log(this.data.hotGoodsList);

      },

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {

      },

      //查看商品详情
      goPage: function (e) {
        wx.navigateTo({
          url: '../../pages/spdetail/spdetail?goodsId=' + e.currentTarget.dataset.goodsid
        })
      }
})