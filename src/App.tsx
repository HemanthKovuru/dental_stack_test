import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "./redux/productsSlice";
import ProductForm from "./components/ProductForm";

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);

  const [showInput, setShowInput] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [isSave, setIsave] = useState(false);

  type Product = {
    title: string;
    id: number;
    price: number;
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        dispatch(fetchProducts(response.data.products));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // DELETE
  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  // UPDATE PRODUCT
  const saveProduct = (product: Product) => {
    const updatedProduct = {
      ...product,
      title,
      price: parseFloat(price),
    };
    dispatch(updateProduct(updatedProduct));
    setShowInput("");
  };

  return (
    <div className="App">
      <h2>Products</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {product.title}
                {showInput === product.id && (
                  <input
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(e.target.value)
                    }
                  />
                )}
              </td>
              <td>
                {product.price}{" "}
                {showInput === product.id && (
                  <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPrice(e.target.value)
                    }
                  />
                )}
              </td>
              <td>
                {isSave && showInput === product.id ? (
                  <button
                    onClick={() => {
                      saveProduct(product);
                      setIsave(false);
                    }}
                  >
                    save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setTitle(product.title);
                      setPrice(product.price);
                      setShowInput(product.id);
                      setIsave(true);
                    }}
                  >
                    update
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductForm />
    </div>
  );
};

export default App;
