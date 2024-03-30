// pages/album/index.js
import { share5x4, share1x1 } from '@/utils/index'
import album from '@/utils/album'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    album,
  },


  navigate(event) {
    const { name, cnName } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/photo/index?name=${name}&cnName=${cnName}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return share5x4
  },

  onShareTimeline() {
    return share1x1
  }
})