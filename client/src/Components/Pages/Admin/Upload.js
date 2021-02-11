import React, { useState, useContext } from "react";
import axios from "axios";
import ProductContext from "../../context/Product/ProductContext";
import Success from "../../Assests/success.png";

const Upload = ({ uploadId, setUpload }) => {
  const [image, setImage] = useState();
  const [complete, setComplete] = useState(false);
  const productContext = useContext(ProductContext);

  const onUpload = async (e) => {
    e.preventDefault();

    let form = new FormData();
    form.append("file", image);

    try {
      await axios.put(`/api/v1/clothings/${uploadId}/image`, form);
      setComplete(true);
      setTimeout(() => {
        setUpload(false);
      }, 5000);
      productContext.loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // form.append("image", image);
  // console.log(image);

  return (
    <div>
      {!complete ? (
        <div className="text-center py-5">
          <p className="upload-text">Upload an Image</p>
          <form onSubmit={onUpload}>
            <input
              className="py-3 upload-form"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            <br />
            <button type="submit" className="upload-btn">
              Upload
            </button>
          </form>
        </div>
      ) : (
        <p className="item-added-success py-3">
          {" "}
          <img src={Success} width="20px" alt="" className="mx-2"></img>Item
          Successfully added!
        </p>
      )}
    </div>
  );
};

export default Upload;
