const getSuperConfig = require('./getSuperConfig/index');
const getPhotos = require('./getPhotos/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getSuperConfig':
      return await getSuperConfig.main(event, context);
    case 'getPhotos':
      return await getPhotos.main(event, context);
  }
};
        
