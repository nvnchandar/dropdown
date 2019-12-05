const getGSM = async (masterData, commoditySelectedList, gsmSelectedList) => {
  var gsmObjectArray = [];
  var gsmList = [];
  var gsmKeys = [];
  var commMasterData = {};
  // console.log(masterData);
  // Object.keys(masterData).forEach(key => {
  //   // console.log(masterData[key])
  //   gsmObjectArray.push(...masterData[key]);
  // });

  commMasterData = await Object.keys(masterData)
    .filter(x => {
      // console.log(comm.includes(x))
      if (commoditySelectedList.findIndex(y => y.item_value === x) > -1)
        return true;
      else return false;
    })
    .reduce((res, key) => ((res[key] = masterData[key]), res), {});
  console.log("commMasterData", commMasterData);
  // console.log(gsmObjectArray)
  // console.log("gsms")
  Object.keys(commMasterData).forEach(key => {
    // console.log(masterData[key])
    gsmObjectArray.push(...commMasterData[key]);
  });
  console.log("one", gsmObjectArray);
  gsmObjectArray.forEach(obj => {
    gsmKeys.push(...Object.keys(obj));
  });
  // console.log(gsmKeys)
  // console.log("gsmKeys")
  gsmList = await gsmKeys
    .reduce((a, b) => {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, [])
    .map((x, i) => {
      return { item_id: i, item_value: x };
    });
  // console.log(gsmList);
  gsmSelectedList = await gsmList.filter(x => {
    if (gsmSelectedList.findIndex(y => y.item_value === x.item_value) > -1)
      return true;
    else return false;
  });
  console.log(gsmSelectedList);
  console.log(gsmList);
};

module.exports = getGSM;
