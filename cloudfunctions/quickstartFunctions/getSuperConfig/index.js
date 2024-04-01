const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  const result = await db.collection('super_config')
    .where({ name: event.name })
    .get();
  return result;
};
        