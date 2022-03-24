import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const axios = require("axios").default;
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CustomLoader from "../components/CustomLoader";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [found, setFound] = useState();
  const [rawData, setRawData] = useState({});
  const [stock, setStock] = useState(-1);
  const [material, setMaterial] = useState("");
  const [unit, setUnit] = useState({
    unitCode: "UN",
    unitCodeText: "Unidades",
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const notification = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
  });
  const next = () => {
    const ProductInternalID = watch("ProductInternalID");
    console.log(ProductInternalID);
    setLoading(true);
    axios
      .post("/api/search", {
        ProductInternalID: ProductInternalID,
      })
      .then(() => {
        getStock();
        setLoading(false);
        // setFound(true);
        setStep((index) => index + 1);
      })
      .catch(() => {
        setLoading(false);
        setFound(false);
      });
  };
  const back = () => {
    reset({});
    setStep((index) => index - 1);
  };
  const getStock = () => {
    axios
      .get("/api/getStock")
      .then(({ data }) => {
        setRawData(data.d.results);
      })
      .catch(() => {
        setFound(false);
      });
  };
  const onSubmit = () => {
    let ProductInternalID = watch("ProductInternalID");
    let Quantity = watch("Quantity");
    let Currency = watch("Currency");
    let unitCode = unit.unitCode;
    let unitCodeText = unit.unitCodeText;
    setLoading(true);
    axios
      .post("/api/product", {
        ProductInternalID: ProductInternalID,
        Quantity: Quantity,
        Currency: Currency,
        unitCode: unitCode,
        unitCodeText: unitCodeText,
      })
      .then((data) => {
        setLoading(false);
        notification.fire({
          icon: "success",
          title: "Pedido realizado con éxito",
        });
      })
      .catch((err) => {
        console.log(err);
        notification.fire({
          icon: "error",
          title: "Hubo un error con la realización del pedido",
        });
      });
  };
  useEffect(() => {
    if (Object.keys(rawData).length !== 0) {
      setMaterial(() => rawData[0].material);
      let rawStock = rawData[0].StockConvertionsite;
      let stock = 0;
      rawStock.map(({ quantity }) => {
        console.log(quantity);
        stock += parseInt(quantity);
      });
      setStock(() => stock);
      let unitCode = rawData[0].StockConvertionsite[0].unitCode1;
      let unitCodeText = rawData[0].StockConvertionsite[0].unitCode1Text;
      // console.log(unitCode);
      // console.log(unitCodeText);
      // if (
      //   unitCode !== undefined || unitCodeText !== undefined
      // ) {
      setUnit({
        unitCode: unitCode,
        unitCodeText: unitCodeText,
      });
      // } else {
      // setUnit({
      //   unitCode: "UN",
      //   unitCodeText: "Unidades",
      // });
      // }
    } else {
      setFound(false);
    }
  }, [rawData]);

  useEffect(() => {
    if (found === true) {
      notification.fire({
        icon: "success",
        title: "Producto encontrado!",
      });
    } else {
      setRawData({});
    }
    // else {
    //   notification.fire({
    //     icon: "error",
    //     title: "Producto no encontrado",
    //   });
    // }
  }, [found]);
  return (
    <section className="w-full max-h-full py-20">
      <div className="flex">
        {/* <div className="w-1/2 h-full flex justify-center items-center">
          <img src="https://via.placeholder.com/400" alt="Producto" />
        </div> */}
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-4/5 h-4/5 flex flex-col justify-center items-center border border-slate-400 rounded-lg shadow">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center items-center space-y-4 text-sm py-6"
            >
              {step === 0 && !loading && (
                <div className="flex flex-col justify-center items-center space-y-2">
                  <p>ID interno del producto: </p>
                  <input
                    type="text"
                    name="ProductInternalID"
                    id="ProductInternalID"
                    className="text-center px-2 py-1 ring-1 ring-slate-700 rounded bg-slate-100 focus:outline-none active:outline-none"
                    {...register("ProductInternalID", { required: true })}
                  />
                  {errors.ProductInternalID && (
                    <span className="text-red-500">Ingrese el ID interno</span>
                  )}
                  <button
                    onClick={next}
                    type="button"
                    className="text-white rounded-full py-1 px-8 bg-blue-500 hover:bg-blue-600"
                  >
                    Buscar
                  </button>
                </div>
              )}
              {step === 1 && !loading && (
                <div className="flex flex-col justify-center items-center space-y-2">
                  <p className="font-semibold">
                    Material: {material ? material : ""}
                  </p>
                  <p className="font-light">
                    En stock: <i className="font-semibold">{stock}</i>{" "}
                    {unit.unitCode ? unit.unitCodeText + "s" : "Unidades"}
                  </p>
                  <div className="flex justify-center items-center space-x-2">
                    <label htmlFor="Quantity">Cantidad: </label>
                    <input
                      type="number"
                      max={stock}
                      min={1}
                      defaultValue={1}
                      name="Quantity"
                      id="Quantity"
                      className="text-center px-2 py-1 ring-1 ring-slate-700 rounded bg-slate-100 focus:outline-none active:outline-none"
                      {...register("Quantity", {
                        required: true,
                        max: stock,
                        min: 1,
                      })}
                    />
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    <label htmlFor="Currency">Moneda</label>
                    <select
                      name="Currency"
                      id="Currency"
                      defaultValue="USD"
                      className="text-center px-2 py-1 ring-1 ring-slate-700 rounded bg-slate-100 focus:outline-none active:outline-none"
                      {...register("Currency", { required: true })}
                    >
                      <option value="USD">USD</option>
                      <option value="MXN">MXN</option>
                    </select>
                  </div>
                  <div className="flex justify-center items-center space-x-2 py-2 px-4">
                    <button
                      onClick={back}
                      type="button"
                      className="text-white rounded-full py-1 px-8 bg-gray-500 hover:bg-gray-600"
                    >
                      Atras
                    </button>
                    <button
                      onClick={onSubmit}
                      type="submit"
                      disabled={stock === 0 || stock === -1}
                      className="text-white rounded-full py-1 px-8 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      {stock === 0 || stock === -1
                        ? "Sin stock"
                        : "Realizar pedido"}
                    </button>
                  </div>
                </div>
              )}
            </form>
            {loading && (
              <div className="flex justify-center items-center w-1/2 h-full py-4">
                <CustomLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
      <Footer />
    </Layout>
  );
};
