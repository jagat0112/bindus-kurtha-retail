import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/Product/ProductContext";
import Success from "../../Assests/success.gif";

const EditProduct = ({ data, setEdits }) => {
  const productContext = useContext(ProductContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  let [finalPrice, setFinalPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  let [sizes, setSizes] = useState(0);
  const [color, setColor] = useState();
  const [publish, setPublish] = useState(true);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setName(data.name);
    setPrice(data.price);
    setDescription(data.description);
    setDiscount(data.discount);
    setFinalPrice(data.finalPrice);
    setSizes(data.size);
    setColor(data.colors);
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    let colors = color.toString().split(",");
    let size = sizes.toString().split(",");
    finalPrice = price - (discount / 100) * price;
    const updated = {
      name,
      price,
      description,
      finalPrice,
      discount,
      publish,
      colors,
      size,
    };

    productContext.updateProduct(updated, data._id);
    productContext.setLoadings(true);

    setTimeout(() => {
      productContext.setLoadings(false);
      setSuccess(true);
      productContext.showEdits();
      productContext.loadProducts();
      setEdits(false);
    }, 3000);
  };

  return (
    !success && (
      <div>
        <h3>Edit </h3>
        <form onSubmit={onSubmit}>
          <label>Name</label>
          <input
            value={name}
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <br />
          <label>Description</label>
          <input
            value={description}
            name="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></input>
          <br />
          <label>Price</label>
          <input
            value={price}
            name="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></input>
          <br />

          <label>Discount</label>
          <input
            value={discount}
            name="discount"
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
          ></input>
          <br />
          <label>Final Price</label>
          <input
            value={price - (discount / 100) * price || price}
            name="finalPrice"
            onChange={(e) => {
              setFinalPrice(e.target.value);
            }}
          ></input>
          <br />
          <label>Size</label>
          <input
            value={sizes}
            name="size"
            onChange={(e) => {
              setSizes(e.target.value);
            }}
          ></input>
          <br />
          <label>Colors</label>
          <input
            value={color}
            name="size"
            onChange={(e) => {
              setColor(e.target.value);
            }}
          ></input>
          <br />
          <input
            type="checkbox"
            value={publish}
            defaultChecked
            onChange={() => {
              setPublish(publish ? false : true);
            }}
          />
          <label>Publish</label>
          <br />
          {!productContext.loadings && (
            <button className="add-item-button">Save Changes</button>
          )}
        </form>{" "}
        {!productContext.loadings && (
          <div>
            {" "}
            <button className="add-item-button">Edit Photo</button>
            <br />
            <button className="add-item-button">Cancel</button>
          </div>
        )}
        {productContext.loadings && <img src={Success} alt="" />}
      </div>
    )
  );
};

export default EditProduct;
