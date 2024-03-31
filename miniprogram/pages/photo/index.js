// pages/photo/index.js
import { share5x4, share1x1 } from '@/utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urls: [],
    photos: [],
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (!options) return
    const { name, cnName } = options
    if (!name || !cnName) return
    wx.setNavigationBarTitle({
      title: cnName
    })
    this.getPhotos(name)
  },

  async getPhotos(name) {
    this.setData({
      urls: [],
      photos: [],
      loading: true,
    })
    const res = await wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'getPhotos', category: name },
    });
    const photos = res?.result?.photos?.data || []
    const urls = photos.map(photo => photo.src)
    this.setData({
      urls,
      photos,
      loading: false,
    })
  },

  preview(event) {
    const { src, cover } = event.currentTarget.dataset
    const { urls } = this.data
    wx.previewImage({
      urls,
      current: src
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

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