import axios from "axios";
const base64 = require("base-64");

export default async function handler(req, res) {
  const uname = "ARUIZ2";
  const pword = "Pruebas00";
  const url =
    "https://my357755.sapbydesign.com/sap/byd/odata/cust/v1/stockv2/StockConvertionRootCollection?$filter=id%20eq%271%27&$expand=StockConvertionsite&$format=json";
  const headers = new Headers();
  headers.set("Authorization", "Basic " + base64.encode(uname + ":" + pword));
  try {
    fetch(url, {
      method: "GET",
      headers: headers,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => res.send(JSON.stringify(json)));
  } catch (err) {
    console.log(err);
  }
}
