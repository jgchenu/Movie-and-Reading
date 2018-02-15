var postData = require("../../../data/posts-data.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app);
    let postId = options.id;
    this.setData({
      postDetail: postData.postList[postId]
    });
    this.setData({
      currentId: postId
    });
    let collecteds = wx.getStorageSync('collecteds');
    if (collecteds) {
      let collected = collecteds[postId]
      if (!collecteds[postId]) {
        collected = false;
      }
      this.setData({
        collected: collected
      })
    } else {
      collecteds = {};
      collecteds[postId] = false;
      wx.setStorageSync('collecteds', collecteds);
    }

    if (app.globalData.gPlayMusic && app.globalData.gId == this.data.currentId) {
      this.setData({
        playMusic: true
      });
      wx.playBackgroundAudio({
        dataUrl: postData.postList[this.data.currentId].music.url,
        title: postData.postList[this.data.currentId].music.title,
        coverImgUrl: postData.postList[this.data.currentId].music.coverImg
      });

    }
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        playMusic: true
      });
      app.globalData.gPlayMusic = true;
      app.globalData.gId = this.data.currentId;
    });
    wx.onBackgroundAudioPause(() => {
      this.setData({
        playMusic: false
      });
      app.globalData.gPlayMusic = false;
      app.globalData.gId = null;
    });
    wx.onBackgroundAudioStop(() => {
      this.setData({
        playMusic: false
      });
      app.globalData.gPlayMusic = false;
      app.globalData.gId = null;
    });
  },

  // methods
  collectionTap: function () {
    let collecteds = wx.getStorageSync('collecteds');
    let collected = collecteds[this.data.currentId];
    collected = !collected;
    collecteds[this.data.currentId] = collected;
    wx.setStorageSync('collecteds', collecteds);
    this.setData({
      collected: collected
    });
    wx.showToast({
      title: collected ? '收藏成功' : '取消收藏'
    })
  },
  shareTap: function () {
    let itemList = ['分享朋友圈', '分享到朋友', '分享到QQ', '分享到微博'];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        wx.showToast({
          title: itemList[res.tapIndex] + '成功',
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '取消分享'
        });
      }
    })
  },
  musicTap: function () {
    if (!this.data.playMusic) {
      this.setData({
        playMusic: true
      });
      wx.playBackgroundAudio({
        dataUrl: postData.postList[this.data.currentId].music.url,
        title: postData.postList[this.data.currentId].music.title,
        coverImgUrl: postData.postList[this.data.currentId].music.coverImg
      });
    } else {
      this.setData({
        playMusic: false
      });
      wx.pauseBackgroundAudio();
    }
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