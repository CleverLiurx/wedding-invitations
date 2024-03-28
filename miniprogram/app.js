// app.js
const Event = require('./utils/event')
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-7gmcl9gy8f6410db',
        traceUser: true,
      });
    }

    const audio = wx.createInnerAudioContext({
      useWebAudioImplement: false
    })
    audio.onPlay(() => {
      Event.emit('music:status', true)
    })
    audio.onStop(() => {
      Event.emit('music:status', false)
    })
    audio.onPause(() => {
      Event.emit('music:status', false)
    })
    audio.src = 'cloud://cloud1-7gmcl9gy8f6410db.636c-cloud1-7gmcl9gy8f6410db-1321709151/kwlink_d_out.mp3'
    audio.autoplay = true
    audio.loop = true
    Event.on('music:status', play => {
      if (play) {
        audio.play()
      } else {
        audio.pause()
      }
    })
    Event.on('music:getStatus', () => {
      Event.emit('music:status', !audio.paused)
    })

    this.globalData = {};
  }
});
