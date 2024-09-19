const CloudBase = require("@cloudbase/manager-node");
const { storage } = new CloudBase({
  envId: 'cloud1-7gmcl9gy8f641-3bs3559275a'
});

const fileIdPre = 'cloud://cloud1-7gmcl9gy8f641-3bs3559275a.636c-cloud1-7gmcl9gy8f641-3bs3559275a-1321709151'

// 获取照片列表
exports.get = async (event, context) => {
  try {
    if (!event.category) {
      return []
    }
    const result = await storage.listDirectoryFiles(`images/${event.category}/`);
    const list = result
      .filter(p => p.Size != '0')
      .map(p => {
        const src = `${fileIdPre}/${p.Key}`
        const cover = src.replace(`/images/${event.category}/`, '/images/cover/')
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
        