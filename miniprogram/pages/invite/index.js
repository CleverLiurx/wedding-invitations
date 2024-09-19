// pages/invite/index.js
import { share5x4, share1x1 } from '@/utils/index'

Page({
  onLoad() {
    this.getSuperConfig()
    this.getDanmuList()
  },
  onReady(){
    this.videoContext = wx.createVideoContext('video')
    this.videoCurrentTime = 0
    this.play = false
    this.autoPause = false
  },
  data: {
    video: {},
    danmuList: [],
    inputValue: '',
  },
  gotoYSG() {
    wx.openLocation({
      latitude: 40.621889,
      longitude: 118.07076,
      name: '新郎家',
      address: '河北省承德市兴隆县大杖子镇邢杖子村杨树沟',
    })
  },
  gotoTY() {
    wx.openLocation({
      id: 2,
      latitude: 40.753526,
      longitude: 118.163854,
      name: '婚礼堂',
      address: '河北省承德市下板城唐韵盛世大酒店(万福厅)',
    })
  },
  handleVideoPlay() {
    this.play = true
  },
  handleTimeupdate(event) {
    this.videoCurrentTime = event.detail.currentTime
  },
  handleVideoPause() {
    this.play = false
  },
  async getSuperConfig() {
    const res = await wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'getSuperConfig', name: 'video' },
    });
    const video = res?.result || {}
    this.setData({
      video,
    })
  },
  async getDanmuList() {
    const res = await wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'getDanmuList' },
    });
    const danmuList = res?.result || []
    this.setData({
      danmuList,
    })
  },
  handleInput(event) {
    const inputValue = event.detail.value
    this.setData({
      inputValue,
    })
  },
  handleFocus() {
    this.autoPause = this.play
    this.videoContext.pause()
  },
  handleBlur() {
    if (this.autoPause) {
      this.videoContext.play()
      this.autoPause = false
    }
  },
  async sendDanmu() {
    const text = this.data.inputValue
    if (!text) return
    this.setData({
      inputValue: ''
    })
    const danmu = {
      text,
      color: '#FFFFFF',
      time: parseInt(this.videoCurrentTime,)
    }
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'addDanmu', danmu },
    });
    setTimeout(() => {
      this.videoContext.sendDanmu({
        text,
        color: '#FFFFFF',
      })
    }, 500)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return share5x4
  },
  /**
   * 用户点击分享到朋友圈
   */
  onShareTimeline() {
    return share1x1
  }
})