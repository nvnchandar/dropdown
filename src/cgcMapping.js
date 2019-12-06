const getCGCMap = async (
  masterData,
  commoditySelectedList,
  gsmSelectedList,
  cfgSelectedList
) => {
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  var reqObj = {};

  commoditySelectedList.forEach(x => {
    let commMasterData = masterData[x.item_value];
    commMasterData = commMasterData
      .filter(x => {
        return (
          gsmSelectedList.findIndex(
            gsm => gsm.item_value === Object.keys(x)[0]
          ) > -1
        );
      })
      .map(x => {
        let finalCfgList = Object.values(x)[0].filter(cfg => {
          return (
            cfgSelectedList.findIndex(cfgL => cfgL.item_value === cfg) > -1
          );
        });
        let newObj = {};
        newObj[Object.keys(x)[0]] = finalCfgList;
        return newObj;
      });
    reqObj[x.item_value] = commMasterData;
  });
  // console.log(reqObj);
  return reqObj;
};

module.exports = getCGCMap;
