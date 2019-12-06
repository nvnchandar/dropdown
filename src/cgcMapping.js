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
    commMasterData = commMasterData.filter(x => {
      // console.log(Object.keys(x)[0])
      return (
        gsmSelectedList.findIndex(gsm => gsm.item_value === Object.keys(x)[0]) >
        -1
      );
    });
    reqObj[x.item_value] = commMasterData;
    console.log(reqObj);
    // asyncForEach(commMasterData, async(gsmObj)=>{
    //   gsmSelectedList.for
    //   Object.keys(gsmObj).includes()
    // })
  });

  var cfgList = [];

  if (gsmSelectedList.length > 0) {
    // 1st step: if gsm is selected, extract all cfgs for comm,gsm combination.
    await commoditySelectedList.forEach(comm => {
      masterData[comm.item_value].forEach((gsm, i) => {
        gsmSelectedList.forEach(selGsm => {
          if (Object.keys(gsm).includes(selGsm.item_value))
            cfgList.push(...Object.values(masterData[comm.item_value][i])[0]);
        });
      });
    });
  } else {
    // 2nd step: if gsm is not selected, extract all cfgs for only comm combination.
    await commoditySelectedList.forEach(comm => {
      masterData[comm.item_value].forEach((gsm, i) => {
        cfgList.push(...Object.values(masterData[comm.item_value][i])[0]);
      });
    });
  }

  // 3rd step: Remove duplicate cfg keys
  cfgList = await cfgList
    .reduce((a, b) => {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, [])
    .map((x, i) => {
      return { item_id: i, item_value: x };
    });

  // 4th step: Form the cfg selected from the available cfg keys.
  cfgSelectedList = await cfgList.filter(x => {
    if (cfgSelectedList.findIndex(y => y.item_value === x.item_value) > -1)
      return true;
    else return false;
  });

  return {
    cfgSelectedList: cfgSelectedList,
    cfgList: cfgList
  };
};

module.exports = getCGCMap;
