Page({
  tapName: (target) => {
    wx.switchTab({
      url: '/pages/posts/post',
      success: () => {
        // console.log("success");
      },
      fail: () => {
        console.log("fail");
      },
      complete: () => {
        // console.log("complete")
      }
    });
  },
  cathTap: () => {
    console.log("cath tap")
  }
})