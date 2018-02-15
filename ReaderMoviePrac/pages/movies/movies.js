let app = getApp();
let globalData = app.globalData;
let baseUrl = globalData.baseUrl;
let util = require("../../utils/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerShow: true,
    searchShow: false,
    searchResult: {}
  },
  getMovieData: function (url, setKey, recentTitle) {
    wx.request({
      url: `${baseUrl}${url}`,
      method: 'get',
      header: {
        "Content-type": "json"
      },
      success: res => {
        console.log(res);
        this.processMovieData(res.data, setKey, recentTitle);
      },
      fail: err => {

      }
    })
  },
  processMovieData: function (movieData, setKey, recentTitle) {
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
    let readyData = {};
    readyData[setKey] = { movies: movies, recentTitle: recentTitle };
    this.setData(readyData);
  },
  moreTap: function (event) {
    let recentTitle = event.currentTarget.dataset.recenttitle;
    wx.navigateTo({
      url: `more-movie/more-movie?title=${recentTitle}`,
    })
  },
  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchShow: true
    });
  },
  cancelTap: function () {
    this.setData({
      containerShow: true,
      searchShow: false
    });
  },
  onBindChange: function (event) {
    console.log(event);
    let text = event.detail.value;
    let searchUrl = "/v2/movie/search?q=" + text;
    this.getMovieData(searchUrl, "searchResult", "");
  },
  movieTap: function (event) {

    let movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: `/pages/movies/movie-detail/movie-detail?movieId=${movieId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let inTheatersUrl = "/v2/movie/in_theaters?start=0&count=3";
    let comingSoonUrl = "/v2/movie/coming_soon?start=0&count=3";
    let top250Url = "/v2/movie/top250?start=0&count=3";
    this.getMovieData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieData(top250Url, "top250", "豆瓣top250");
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