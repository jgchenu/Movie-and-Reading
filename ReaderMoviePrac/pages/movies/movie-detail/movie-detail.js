// pages/movies/movie-detail/movie-detail.js
let app = getApp();
let util = require('../../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  processMovieData: function (data) {
    if (!data) {
      return;
    }
    let director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars.large != null) {
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.id;
    }
    let movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      year: data.year,
      genres: data.genres.join("、"),
      stars: util.tostarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.toCastString(data.casts),
      castsInfo: util.toCastInfo(data.casts),
      summary: data.summary,
      commentCount: data.comments_count
    }
    this.setData({
      movie: movie
    })
    console.log(movie);

  },
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },
  onLoad: function (options) {
    console.log(options.movieId);
    let movieId = options.movieId;
    let url = app.globalData.baseUrl + "/v2/movie/subject/" + movieId;
    util.http(url, this.processMovieData)
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

  }
})