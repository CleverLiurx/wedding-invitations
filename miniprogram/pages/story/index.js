// pages/story/index.js
import { share5x4, share1x1 } from '@/utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stories: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSuperConfig()
  },

  async getSuperConfig() {
    const res = await wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'getSuperConfig', name: 'story' },
    });
    const stories = res?.result?.data?.[0].value || []
    this.setData({
      stories,
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