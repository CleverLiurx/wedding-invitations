// pages/invite/index.js
import { share5x4, share1x1 } from '@/utils/index'
import { markers1, markers2 } from '@/utils/markers'
import Event from '@/utils/event'

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
    showVideo: false,
    danmuList: [],
    inputValue: '',
    markers1,
    markers2,
  },
  gotoYSG() {
    const { latitude, longitude, posName, address } = this.data.markers1
    wx.openLocation({
      latitude,
      longitude,
      name: posName,
      address,
    })
  },
  gotoTY() {
    const { latitude, longitude, posName, address } = this.data.markers2
    wx.openLocation({
      latitude,
      longitude,
      name: posName,
      address,
    })
  },
  phoneToSR() {
    wx.makePhoneCall({
      phoneNumber: this.data.markers2.phone
    })
  },
  phoneToLRX() {
    wx.makePhoneCall({
      phoneNumber: this.data.markers1.phone
    })
  },
  handleVideoPlay() {
    this.play = true
    Event.emit('music:status', false)
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
      data: { type: 'getSuperConfig' },
    });
    const showVideo = res?.result?.video?.data?.[0].show || false
    this.setData({
      showVideo,
    })
  },
  async getDanmuList() {
    const res = await wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'getDanmuList' },
    });
    const danmuList = res?.result?.danmu?.data || []
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
  sendDanmu() {
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