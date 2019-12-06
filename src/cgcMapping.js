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
  // console.log("masterdata", masterData)

  var reqObj = {};

  if (gsmSelectedList.length > 0) {
    commoditySelectedList.forEach(x => {
      let commMasterData = masterData[x.item_value];
      // 1st step: Extract array of gsm object for each selected commodity
      commMasterData = commMasterData
        .filter(x => {
          // 2nd step: Filter selected gsms array
          return (
            gsmSelectedList.findIndex(
              gsm => gsm.item_value === Object.keys(x)[0]
            ) > -1
          );
        })
        .map(x => {
          //  3rd step: In each gsm object, filter the selected cfg's
          let finalCfgList = Object.values(x)[0].filter(cfg => {
            return (
              cfgSelectedList.findIndex(cfgL => cfgL.item_value === cfg) > -1
            );
          });
          let newObj = {};
          // 4th step: Create a new object of gsm, with selected cfg's
          newObj[Object.keys(x)[0]] = finalCfgList;
          return newObj;
        });
      // 5th step: Assign the array of proper gsm/cfg mapping to reqObj.
      reqObj[x.item_value] = commMasterData;
    });
  } else {
    var selectedCFGL = cfgSelectedList.map(x => {
      return x.item_value;
    });
    await commoditySelectedList.forEach(comm => {
      let commCFGList = [];
      let selectedcommCFGList = [];
      let gsmObj = {};
      masterData[comm.item_value].forEach((gsm, i) => {
        // console.log(comm.item_value,i,Object.values(masterData[comm.item_value][i])[0])
        commCFGList.push(...Object.values(masterData[comm.item_value][i])[0]);
      });
      selectedcommCFGList = selectedCFGL.filter(x => {
        return commCFGList.includes(x);
      });
      // console.log("selectedcommCFGList", selectedcommCFGList)
      gsmObj["DBNULL"] = selectedcommCFGList;
      reqObj[comm.item_value] = gsmObj;
      // comCFGMap[comm.item_value] = commCFGList;
    });
  }
  // console.log(reqObj);
  return reqObj;
};

module.exports = getCGCMap;
