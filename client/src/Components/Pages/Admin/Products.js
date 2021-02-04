import React, { useContext, useState, useEffect } from "react";
import ProductContext from "../../context/Product/ProductContext";
import Loading from "../../Assests/loading.gif";
import EditProduct from "./EditProduct";
import axios from "axios";
import { Link } from "react-router-dom";
import { grey } from "colors";

const Products = () => {
  const productContext = useContext(ProductContext);
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);
  const [deleteWarn, setDeleteWarn] = useState(false);

  const setEdits = () => {
    setData("");
  };
  const DeleteConfirm = async () => {
    await axios.delete(`http://localhost:5000/api/v1/clothings/${data}`);
    productContext.loadProducts();
  };

  useEffect(() => {
    productContext.loadProducts();
    // eslint-disable-next-line
  }, []);

  const onEdit = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/v1/clothings/${id}`);
    setData(res.data.data);
  };

  return (
    <div>
      <Link className="btn1 back-btn" to={"/admin"}>
        Back
      </Link>
      <h1>Products</h1>
      {productContext.loading && (
        <img className="loading-image" src={Loading} alt=""></img>
      )}
      <div>
        <div className="flex-container">
          {productContext.products &&
            productContext.products.map((item, i) => (
              <div className="item" key={i}>
                <h3>{item.name}</h3>
                <img
                  className="item-admin-image"
                  src={`http://localhost:5000/uploads/${item.photo}`}
                  alt=""
                ></img>
                {data._id !== item._id && (
                  <div>
                    <p>Price: ¥{item.price}</p>
                    {item.discount && <p>Discount : {item.discount}%</p>}
                    {item.finalPrice && <p>Final Price : ¥{item.finalPrice}</p>}
                    <p>Colors: {item.colors.join(" ")}</p>
                    <p>Size : {item.size.join(" ")}</p>
                    <p>Type : {item.type}</p>
                    <p>Publish : {item.publish.toString()}</p>
                    {deleteWarn && data == item._id ? (
                      <div>
                        <p>Are you sure to delete this item?</p>
                        <button className="btn1" onClick={DeleteConfirm}>
                          Delete
                        </button>
                        <button
                          className="btn1"
                          onClick={() => setDeleteWarn(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn1"
                          onClick={() => {
                            onEdit(item._id);
                            setEdit(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setData(item._id);
                            setDeleteWarn(true);
                          }}
                          className="btn1"
                          style={{ background: "red" }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {edit && data._id === item._id && (
                  <EditProduct data={data} setEdits={setEdits} />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
