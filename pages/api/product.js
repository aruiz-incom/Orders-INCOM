const { soap } = require("strong-soap");
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const access = {
  user: "ARUIZ2",
  password: "Pruebas00",
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    req.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const ProductInternalID = req.body.ProductInternalID;
  const Quantity = req.body.Quantity;
  const Currency = req.body.Currency;
  const unitCode = req.body.unitCode;
  const unitCodeText = req.body.unitCodeText;
  const timeStamp = dayjs().utc().format();
  const uname = access.user;
  const pword = access.password;
  const url = "./WSDL/SalesOrderIn.wsdl";
  const requestArgs = {
    SalesOrderBundleMaintainRequest_sync: {
      BasicMessageHeader: {},
      SalesOrder: {
        $attributes: { actionCode: "01" },
        SalesAndServiceBusinessArea: {
          $attributes: { actionCode: "04" },
          DistributionChannelCode: "Z4",
        },
        AccountParty: {
          $attributes: { actionCode: "04" },
          PartyID: "MOSTRADOR",
        },
        SalesUnitParty: {
          $attributes: { actionCode: "04" },
          PartyID: "101022",
        },
        EmployeeResponsibleParty: {
          $attributes: { actionCode: "04" },
          PartyID: "1000",
        },
        PricingTerms: {
          $attributes: { actionCode: "04" },
          CurrencyCode: Currency,
          PriceDateTime: {
            $attributes: { timeZoneCode: "UTC" },
            $value: timeStamp,
          },
          GrossAmountIndicator: false,
        },
        Item: {
          $attributes: { actionCode: "04" },
          ID: "10",
          ReleaseToExecute: false,
          ItemProduct: {
            $attributes: { actionCode: "04" },
            ProductInternalID: ProductInternalID,
          },
          ItemScheduleLine: {
            $attributes: { actionCode: "04" },
            ID: "1",
            TypeCode: "1",
            Quantity: {
              $attributes: { unitCode: unitCode },
              $value: Quantity,
            },
          },
          PriceAndTaxCalculationItem: {
            $attributes: { actionCode: "04" },
            ItemMainDiscount: {
              $attributes: { actionCode: "04" },
              Rate: {
                DecimalValue: "0.0",
              },
            },
          },
        },
      },
    },
  };
  soap.createClient(url, {}, (err, client) => {
    let method = client["MaintainBundle"];
    client.setSecurity(new soap.BasicAuthSecurity(uname, pword));
    method(requestArgs, function (err, result, envelope, soapHeader) {
      res.send(JSON.stringify(result));
    });
  });
}
