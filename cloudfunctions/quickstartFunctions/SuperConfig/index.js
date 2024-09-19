const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

// 获取配置
exports.get = async (event, context) => {
  try {
    const result = await db.collection('super_config')
      .where({ name: event.name })
      .get();
    return result?.data?.[0]
  } catch (err) {
    return null
  }
};
        