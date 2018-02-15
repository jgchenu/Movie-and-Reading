// pages/movies/more-movie/more-movie.js
let app = getApp();
let util = require("../../../utils/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    recentTitle: "",
    totalCount: 0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let recentTitle = options.title;
    let dataUrl = "";
    this.setData({
      recentTitle: recentTitle
    });
    switch (recentTitle) {
      case "正在热映":
        dataUrl = app.globalData.baseUrl + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.baseUrl + "/v2/movie/coming_soon";
        break;
      case "豆瓣top250":
        dataUrl = app.globalData.baseUrl + "/v2/movie/top250";
        break;
    }
    this.setData({
      dataUrl: dataUrl
    });
    this.setData({
      totalCount: this.data.totalCount + 20
    })
    util.http(dataUrl, this.callBack);
  },
  callBack: function (data) {
    this.processMovieData(data);
  },
  processMovieData: function (movieData) {
    let movies = [];
    let subject = "";
    let title = "";
    let temp = {};
    movieData.subjects.forEach((item, index) => {
      title = item.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      temp = {
        stars: util.tostarsArray(item.rating.stars),
        title: title,
        average: item.rating.average,
        coverageUrl: item.images.large,
        movieId: item.id
      }
      movies.push(temp);
    });
    let totalMovies = [];

    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.setData({
        isEmpty: false
      });
    }
    this.setData({ movies: totalMovies });
    this.setData({
      totalCount: this.data.totalCount + 20
    });
    wx.hideNavigationBarLoading();
  },
  scrollLower: function () {
    console.log("加载更多");
    let nextUrl = this.data.dataUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processMovieData);
    wx.showNavigationBarLoading();
  },
  movieTap: function (event) {
    let movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: `/pages/movies/movie-detail/movie-detail?movieId=${movieId}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.recentTitle,
      success: function (res) {

      }
    })
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