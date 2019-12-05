import "./styles.css";
import * as data1 from "../data1.json";
import * as data2 from "../data2.json";
const getGSM = require("./gsm");

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

var gsmSelectedList = [
  { item_id: 0, item_value: "gsm5" },
  { item_id: 1, item_value: "gsm4" }
];

var commoditySelectedList = [
  { item_id: 0, item_value: "com1" },
  { item_id: 1, item_value: "com2" }
];

getGSM(masterData, commoditySelectedList, gsmSelectedList);
