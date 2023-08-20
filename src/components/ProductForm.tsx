import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productsSlice";

const ProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addProductToRedux = (e: React.MouseEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Math.round(Math.random() * 10000),
      title: name,
      price: parseFloat(price),
    };
    dispatch(addProduct(newProduct));
    setName("");
    setPrice("");
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button onClick={addProductToRedux} type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
