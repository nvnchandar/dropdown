import "./styles.css";
import * as data1 from "../data1.json";
import * as data2 from "../data2.json";
const getGSM = require("./gsm");
const getCFG = require("./cfg");
const getCGCMap = require("./cgcMapping");

var masterData = {};
// console.log("com1", data1);
// console.log("com2", data2);

if (masterData["com1"] === undefined) {
  masterData["com1"] = data1.com1;
  // console.log("masterData", masterData);
}
//

if (masterData["com2"] === undefined) {
  masterData["com2"] = data2.com2;
  // console.log("masterData", masterData);
}

var commoditySelectedList = [
  { item_id: 0, item_value: "com1" },
  { item_id: 1, item_value: "com2" }
];

var gsmSelectedList = [
  // { item_id: 0, item_value: "gsm3" },
  // { item_id: 1, item_value: "gsm4" }
];

var cfgSelectedList = [
  { item_id: 0, item_value: "cf1" },
  { item_id: 1, item_value: "cf11" }
];

var gsmList = [];
var cfgList = [];
var reqComGsmCfgMap = {};

// console.log("masterdata", masterData)

getGSM(masterData, commoditySelectedList, gsmSelectedList).then(x => {
  gsmList = JSON.parse(JSON.stringify(x.gsmList));
  gsmSelectedList = JSON.parse(JSON.stringify(x.gsmSelectedList));
});

getCFG(
  masterData,
  commoditySelectedList,
  gsmSelectedList,
  cfgSelectedList
).then(x => {
  cfgList = JSON.parse(JSON.stringify(x.cfgList));
  cfgSelectedList = JSON.parse(JSON.stringify(x.cfgSelectedList));
});

getCGCMap(
  masterData,
  commoditySelectedList,
  gsmSelectedList,
  cfgSelectedList
).then(x => {
  reqComGsmCfgMap = x;
});
