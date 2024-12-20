import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../../interfaces/IProduct";
import { AppDispatch, RootState } from "../../store/store";
import { fetchProducts } from "../../features/products/productAction";
import { Link } from "react-router-dom";
const AdminProductPage = () => {
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div className="container mx-auto mt-5">
      <div>
        <Link to="/admin/product-add" className="p-2 bg-blue-500 rounded-md">
          Add Product
        </Link>
      </div>
      <div className="border rounded-md mt-3">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="p-2">Id</th>
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Description</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((item: IProduct) => (
              <tr key={item.id}>
                <td className="p-2 text-center">{item.id}</td>
                <td className="p-2 text-center">{item.title}</td>
                <td className="p-2 text-center">{item.price}</td>
                <td className="p-2 text-center">{item.description}</td>
                <td className="p-2 text-center flex gap-2 items-center">
                  <Link
                    className="p-2 bg-yellow-500 rounded-md"
                    to={`/admin/product-update/${item.id}`}
                  >
                    Update
                  </Link>
                  <button className="p-2 bg-red-500 rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductPage;
