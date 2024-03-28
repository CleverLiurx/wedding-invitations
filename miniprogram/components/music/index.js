// components/music/index.js
const Event = require('../../utils/event')
Component({

  /**
   * 组件的属性列表
   */
  lifetimes: {
    created() {
      Event.on('music:status', isMusicPlay => {
        this.setData({
          isMusicPlay
        })
      })
    },
    ready() {
      Event.emit('music:getStatus', 0)
    },
  },
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    isMusicPlay: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle() {
      Event.emit('music:status', !this.data.isMusicPlay)
    }
  }
})