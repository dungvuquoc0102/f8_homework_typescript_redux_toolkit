import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ProductSchema } from "../../schemas/ProductSchema";
import { IProduct } from "../../interfaces/IProduct";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  createProduct,
  editProduct,
  fetchProductById,
} from "../../features/products/productAction";

const AdminProductFormPage = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    id &&
      (async () => {
        const data = await dispatch(fetchProductById(id)).unwrap();
        reset(data);
      })();
  }, []);
  const nav = useNavigate();

  function handleProductForm(dataBody: IProduct) {
    try {
      if (id) {
        dispatch(editProduct({ id, dataBody }));
        nav("/admin");
      } else {
        dispatch(createProduct(dataBody));
        confirm("Go to product list?") && nav("/admin");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-[500px] mx-auto border rounded-md p-3 mt-5">
      <h1 className="text-center text-2xl">{id ? "Update" : "Add"} Product</h1>
      <form className="mt-3" onSubmit={handleSubmit(handleProductForm)}>
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="border rounded-md p-1"
            {...register("title")}
          />
          <ErrorMessage errors={errors} name="title" />
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            step="any"
            className="border rounded-md p-1"
            {...register("price", { valueAsNumber: true })}
          />
          <ErrorMessage errors={errors} name="price" />
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="border rounded-md p-1"
            {...register("description")}
          />
          <ErrorMessage errors={errors} name="description" />
        </div>
        <div>
          <button className="p-2 bg-blue-500 rounded-md">
            {id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductFormPage;
