Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [
      '../../image/swiper1.jpg',
      '../../image/test.jpg',
      '../../image/swiper1.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    iconArray: [{
        iconurl: "../../image/icon-qiandao.png",
        icontext: "签到"
      },
      {
        iconurl: "../../image/icon-fujin.png",
        icontext: "附近"
      },
      {
        iconurl: "../../image/icon-zhanhui.png",
        icontext: "游展"
      },
      {
        iconurl: "../../image/icon-fuli.png",
        icontext: "福利"
      },
      {
        iconurl: "../../image/icon-muma.png",
        icontext: "玩乐"
      },
      {
        iconurl: "../../image/icon-xingxing.png",
        icontext: "周边"
      },
      {
        iconurl: "../../image/icon-tiyu.png",
        icontext: "体育"
      },
      {
        iconurl: "../../image/icon-qinzi.png",
        icontext: "亲子"
      }
    ],
    movieList: [{
        title: "唐人街探案",
        image: "../../image/movie01.jpg"
      },
      {
        title: "唐人街探案1",
        image: "../../image/movie01.jpg"
      }
    ],

    //商品列表
    goodsList: [],

    //判断是否存在懒加载数据
    isHasLazyData: true,

    //初始化预加载数据数量
    initCount: 5,

    //开始截取数据下标
    start: 0,

    //每次懒加载数据数量
    dataCount: 10

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   var _this = this;
  //  登录
    wx.login({
      success(res) {
        console.log('res ==> ', res);
        if (res.code) {
          // 获取用户信息
          wx.getUserInfo({
            success(res) {
              console.log('res ==> ', res);
            }
          })
        } else {
          console.log("登录失败" + res.errMsg);
        }
      }
    })

    //预加载数据
    this.lazyLoadData(this.data.initCount);
  },

  //懒加载商品数据
  lazyLoadData: function(count) {
    //count: 表示一次预加载数据数量

    //如果不存在懒加载数据
    if (!this.data.isHasLazyData) {
      return;
    }

    wx.showToast({
      title: '正加载...',
      icon: 'none',
      duration: 2000
    })

    let self = this;

    var start = self.data.start;
    var dataCount = count || self.data.dataCount;

    var goodsList = wx.getStorageSync('goodsList');

    if (!goodsList) {
      //如果没有缓存数据

      wx.request({
        //请求地址
        url: 'http://127.0.0.1:1015',

        //请求类型, GET默认
        method: 'GET',

        success: function (result) {

          self.setData({
            goodsList: result.data.slice(start, dataCount),
            start: self.data.start + dataCount,
            dataCount: self.data.dataCount + dataCount
          })

          //缓存数据
          wx.setStorageSync('goodsList', result.data);
        }

      })
    } else {
      //如果存在缓存数据

      var sliceData = goodsList.slice(start, dataCount);

      if (sliceData.length == 0) {
        this.setData({
          isHasLazyData: false
        })
        return;
      }

      this.data.goodsList.push(...sliceData);

      this.setData({
        goodsList: this.data.goodsList,
        start: this.data.start + dataCount,
        dataCount: this.data.dataCount + dataCount
      })
    }


    console.log('this.data.start ==> ', this.data.start);
    console.log('this.data.dataCount ==> ', this.data.dataCount);
  },

  //获取用户信息
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },

  //跳转页面
  goPage(e) {
    //e: 事件对象
    console.log("e",e)
    wx.navigateTo({
      url: '../../pages/spdetail/spdetail?goodsId=' + e.currentTarget.dataset.goodsid
    })
  },

  //上拉刷新
  onReachBottom: function () {
    
    //懒加载数据
    this.lazyLoadData();
  },

  //下拉刷新
  onPullDownRefresh: function () {
    console.log('下拉刷新');
  }
})