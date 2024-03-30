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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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