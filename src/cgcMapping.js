const getCGCMap = async (
  masterData,
  commoditySelectedList,
  gsmSelectedList,
  cfgSelectedList
) => {
  // async function asyncForEach(array, callback) {
  //   for (let index = 0; index < array.length; index++) {
  //     await callback(array[index], index, array);
  //   }
  // }
  // console.log("masterdata", masterData)

  var reqObj = {};
  // 0 step: if no gsm and no cfg
  if (!(gsmSelectedList.length > 0) && !(cfgSelectedList.length > 0)) {
    commoditySelectedList.forEach(x => {
      reqObj[x.item_text] = [];
    });
  } else if (gsmSelectedList.length > 0) {
    commoditySelectedList.forEach(x => {
      let commMasterData = masterData[x.item_text];
      // 1st step: Extract array of gsm object for each selected commodity
      commMasterData = commMasterData
        .filter(x => {
          // 2nd step: Filter selected gsms array
          return (
            gsmSelectedList.findIndex(
              gsm => gsm.item_text === Object.keys(x)[0]
            ) > -1
          );
        })
        .map(x => {
          //  3rd step: In each gsm object, filter the selected cfg's
          let finalCfgList = Object.values(x)[0].filter(cfg => {
            return (
              cfgSelectedList.findIndex(cfgL => cfgL.item_text === cfg) > -1
            );
          });
          let newObj = {};
          // 4th step: Create a new object of gsm, with selected cfg's
          newObj[Object.keys(x)[0]] = finalCfgList;
          return newObj;
        });
      // 5th step: Assign the array of proper gsm/cfg mapping to reqObj.
      reqObj[x.item_text] = commMasterData;
    });
  } else {
    // 6th step: if no gsm is selected, extract selected cfg's
    var selectedCFGL = cfgSelectedList.map(x => {
      return x.item_text;
    });
    await commoditySelectedList.forEach(comm => {
      let commCFGList = [];
      let selectedcommCFGList = [];
      let gsmObj = {};
      masterData[comm.item_text].forEach((gsm, i) => {
        // 7th step: Extract all cfgs for each selected commodity
        // console.log(comm.item_value,i,Object.values(masterData[comm.item_value][i])[0])
        commCFGList.push(...Object.values(masterData[comm.item_text][i])[0]);
      });
      // 8th step: Extract selected cfg's belong to each commodity
      selectedcommCFGList = selectedCFGL.filter(x => {
        return commCFGList.includes(x);
      });
      // 9th step: Since no GSM selected, assing to DBNULL object.
      gsmObj["DBNULL"] = selectedcommCFGList;
      let gsmArray = [];
      gsmArray.push(gsmObj);
      reqObj[comm.item_text] = gsmArray;
    });
  }
  return reqObj;
};

module.exports = getCGCMap;
