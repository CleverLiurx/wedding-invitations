// pages/invite/index.js
import { share5x4, share1x1 } from '@/utils/index'
const Event = require('../../utils/event')
Page({
  onLoad() {
    this.getSuperConfig()
  },
  data: {
    showVideo: false,
    markers1: {
      id: 1,
      latitude: 40.621998,
      longitude: 118.071376,
      iconPath: '../../images/invite/nav.png',
      width: 30,
      height: 30,
      posName: '新郎家',
      address: '河北省承德市兴隆县大杖子镇邢杖子村杨树沟',
      phone: '13131451002',
      label: {
        content: "开始导航",
        color: '#FFF',
        bgColor: '#000',
        fontSize: 12,
        anchorX: -24
      }
    },
    markers2: {
      id: 2,
      latitude: 40.770167,
      longitude: 118.158086,
      iconPath: '../../images/invite/nav.png',
      width: 30,
      height: 30,
      posName: '婚礼堂',
      address: '河北省承德市承德县唐韵大酒店',
      phone: '13131451002',
      label: {
        content: "开始导航",
        color: '#FFF',
        bgColor: '#000',
        fontSize: 12,
        anchorX: -24
      }
    }
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
    Event.emit('music:status', false)
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