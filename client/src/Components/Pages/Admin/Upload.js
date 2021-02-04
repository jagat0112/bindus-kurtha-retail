import React, { useState, useContext } from "react";
import axios from "axios";
import ProductContext from "../../context/Product/ProductContext";

const Upload = ({ uploadId, setUpload }) => {
  const [image, setImage] = useState();
  const [complete, setComplete] = useState(false);
  const productContext = useContext(ProductContext);

  const onUpload = async (e) => {
    e.preventDefault();

    let form = new FormData();
    form.append("file", image);

    try {
      await axios.put(
        `http://localhost:5000/api/v1/clothings/${uploadId}/image`,
        form
      );
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
        <div>
          <h1>Upload an Image</h1>
          <form onSubmit={onUpload}>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
            <button type="submit">Upload</button>
          </form>
        </div>
      ) : (
        <div>Item Successfully added</div>
      )}
    </div>
  );
};

export default Upload;
