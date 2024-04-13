const SuperConfig = require('./SuperConfig/index');
const Photos = require('./Photos/index');
const Danmu = require('./Danmu/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getSuperConfig':
      return await SuperConfig.get(event, context);
    case 'getPhotos':
      return await Photos.get(event, context);
    case 'getDanmuList':
      return await Danmu.get(event, context);
    case 'addDanmu':
      return await Danmu.add(event, context);
  }
};
        
