// pages/invite/index.js
import { share5x4, share1x1 } from '@/utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers1: {
      id: 1,
      latitude: 40.621998,
      longitude: 118.071376,
      iconPath: '../../images/nav.png',
      width: 30,
      height: 30,
      posName: '新郎家',
      address: '河北省承德市兴隆县大杖子镇邢杖子村杨树沟',
      phone: '13131451002',
    },
    markers2: {
      id: 2,
      latitude: 40.770167,
      longitude: 118.158086,
      iconPath: '../../images/nav.png',
      width: 30,
      height: 30,
      posName: '婚礼堂',
      address: '河北省承德市承德县唐韵大酒店',
      phone: '15733181121',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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