// pages/photo/index.js
import album from '@/utils/album'
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
    const item = album.find(p => p.name === name)
    this.name = item.name
    this.cnName = item.cnName
    this.cover = item.cover
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
    })
    // 留1s加载时间给预览图
    if (photos.length === 0) {
      this.setData({
        loading: false,
      })
    } else {
      setTimeout(() => {
        this.setData({
          loading: false,
        })
      }, 1000)
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const { name, cnName, cover } = this
    return {
      title: `刘容新&石蕊的《${cnName}》相册`,
      path: `pages/photo/index?name=${name}&cnName=${cnName}`,
      imageUrl: cover,
    }
  },
})