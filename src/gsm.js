const getGSM = async (masterData, commoditySelectedList, gsmSelectedList) => {
  var gsmObjectArray = [];
  var gsmList = [];
  var gsmKeys = [];
  var commMasterData = {};

  // console.log("masterdata", masterData)

  // 1st step: Extract Masterdata related to selected commodity
  commMasterData = await Object.keys(masterData)
    .filter(x => {
      if (commoditySelectedList.findIndex(y => y.item_text === x) > -1)
        return true;
      else return false;
    })
    .reduce((res, key) => ((res[key] = masterData[key]), res), {});

  // 2nd step: Extract all the gsm object from commodity MatserData
  Object.keys(commMasterData).forEach(key => {
    gsmObjectArray.push(...commMasterData[key]);
  });

  // 3rd step: Extract all the gsm keys
  gsmObjectArray.forEach(obj => {
    gsmKeys.push(...Object.keys(obj));
  });

  // 4th step: Remove duplicate gsm keys
  gsmList = await gsmKeys
    .reduce((a, b) => {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, [])
    .map((x, i) => {
      return { item_id: i, item_text: x };
    });

  // 5th step: Form the gsm selected from the available gsm keys.
  gsmSelectedList = await gsmList.filter(x => {
    if (gsmSelectedList.findIndex(y => y.item_text === x.item_text) > -1)
      return true;
    else return false;
  });

  // console.log(gsmSelectedList);
  // console.log(gsmList);

  return {
    gsmSelectedList: gsmSelectedList,
    gsmList: gsmList
  };
};

module.exports = getGSM;
