import React, { useState } from "react";
import axios from "axios";
import Upload from "./Upload";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [upload, setUpload] = useState(false);
  const [uploadId, setUploadId] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    finalPrice: "",
    description: "",
    type: "",
    sizes: "",
    color: "",
  });
  const [check, setCheck] = useState(true);
  const onChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    product.size = product.sizes.split(",");
    product.colors = product.color.split(",");
    !product.discount || product.discount === 0
      ? (product.finalPrice = undefined)
      : (product.finalPrice = Math.floor(
          product.price - (product.discount / 100) * product.price
        ));
    product.publish = check;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/v1/clothings", product, config);
      if (res.data.success) {
        setUpload(true);
        setUploadId(res.data.data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Link className="btn1 back-btn btn" to={"/admin"}>
        Back
      </Link>
      <p className="admin-dashboard-text">Add a Product</p>{" "}
      {!upload ? (
        <div className=" text-center">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name of the product"
              onChange={onChange}
            />
            <br />
            <input
              type="text"
              name="description"
              placeholder="Description of the product"
              onChange={onChange}
            />
            <br />
            <input
              type="number"
              name="price"
              placeholder="Price of the product"
              onChange={onChange}
            />{" "}
            <br />
            <input
              type="number"
              name="discount"
              placeholder="Discount Percentage"
              onChange={onChange}
            />{" "}
            <br />
            <input
              type="number"
              name="finalPrice"
              placeholder="Final Price of the product"
              value={product.price - (product.discount / 100) * product.price}
              onChange={onChange}
            />
            <br />
            <select type="text" onChange={onChange} name="type">
              <option>Kurtha</option>
              <option>Sari</option>
            </select>
            <br />
            <input
              type="text"
              name="sizes"
              placeholder="Size of the product"
              onChange={onChange}
            />{" "}
            <br />
            <input
              type="text"
              name="color"
              placeholder="Colors of the product"
              onChange={onChange}
            />{" "}
            <br />
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              value={check}
              defaultChecked
              onChange={(e) => setCheck(check ? false : true)}
            />
            <label htmlFor="publish"> Publish</label>
            <br />
            <button type="submit" className="add-item-button btn">
              Add Item
            </button>
            <br />
          </form>
        </div>
      ) : (
        <Upload uploadId={uploadId} setUpload={setUpload} />
      )}
    </div>
  );
};

export default AddProduct;
