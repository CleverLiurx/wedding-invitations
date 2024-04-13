const cloud = require('wx-server-sdk');
const CloudBase = require("@cloudbase/manager-node");
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const { storage } = new CloudBase();
const db = cloud.database();

const fileIdPre = 'cloud://cloud1-7gmcl9gy8f6410db.636c-cloud1-7gmcl9gy8f6410db-1321709151'

// 获取照片列表
exports.get = async (event, context) => {
  try {
    if (!event.category) {
      return []
    }
    const result = await storage.listDirectoryFiles(`image/${event.category}/`);
    const list = result
      .filter(p => p.Size != '0')
      .map(p => {
        const src = `${fileIdPre}/${p.Key}`
        const cover = src.replace(`/image/${event.category}/`, '/image/cover/')
        return {
          src,
          cover,
        }
      })
    return list
  } catch (err) {
    return []
  }
};
        