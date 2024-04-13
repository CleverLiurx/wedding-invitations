const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

// 获取弹幕列表
exports.get = async (event, context) => {
  try {
    const result = await db.collection('danmu')
      .field({
        text: true,
        time: true,
        color: true,
      })
      .get();
    return result.data || []
  } catch (err) {
    return []
  }
};

// 新增弹幕
exports.add = async (event, context) => {
  try {
    const text = event.danmu && event.danmu.text
    if (!text) {
      return {}
    }
  
    const {
      OPENID,
      CLIENTIP,
      CLIENTIPV6,
    } = cloud.getWXContext()
    const securityRes = await cloud.openapi.security.msgSecCheck({
      openid: OPENID,
      scene: 2,
      version: 2,
      content: text,
    })
  
    if (securityRes.result.label !== 100) {
      return { msg: '禁止发送违法信息' }
    }
  
    const result = await db.collection('danmu')
    .add({
      data: [{
        ...event.danmu,
        ip: CLIENTIP,
        ipv6: CLIENTIPV6,
        openid: OPENID,
      }]
    });
    return result

  } catch (err) {
    return { msg: '发送失败' }
  }
};


        