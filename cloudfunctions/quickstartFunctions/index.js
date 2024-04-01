const getSuperConfig = require('./getSuperConfig/index');
const getPhotos = require('./getPhotos/index');
const getDanmuList = require('./getDanmuList/index');
const addDanmu = require('./addDanmu/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getSuperConfig':
      return await getSuperConfig.main(event, context);
    case 'getPhotos':
      return await getPhotos.main(event, context);
    case 'getDanmuList':
      return await getDanmuList.main(event, context);
    case 'addDanmu':
      return await addDanmu.main(event, context);
  }
};
        
