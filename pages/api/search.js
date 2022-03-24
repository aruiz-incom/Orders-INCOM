const { soap } = require("strong-soap");
const access = {
  user: "ARUIZ",
  password: "Incom#724!",
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    req.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const uname = access.user;
  const pword = access.password;
  const url = "./WSDL/Stock.wsdl";
  const ProductInternalID = req.body.ProductInternalID;
  const requestArgs = {
    StockConvertionStockSaleUnitUpdateRequest_sync: {
      BasicMessageHeader: {},
      StockConvertion: {
        SAP_UUID: "00163EC9-DDFA-1EEC-A482-F361B31DA01B",
        material: ProductInternalID,
      },
    },
  };
  soap.createClient(url, {}, (err, client) => {
    let method = client["Update"];
    client.setSecurity(new soap.BasicAuthSecurity(uname, pword));
    method(requestArgs, function (err, result, envelope, soapHeader) {
      res.send(JSON.stringify(result));
    });
  });
}
