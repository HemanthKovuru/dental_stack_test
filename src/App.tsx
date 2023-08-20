import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "./redux/productsSlice";

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);

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

  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));
  };
  return (
    <div>
      <button>Add proudct</button>
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
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
