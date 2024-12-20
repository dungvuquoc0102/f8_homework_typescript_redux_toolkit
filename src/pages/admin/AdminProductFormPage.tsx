import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ProductSchema } from "../../schemas/ProductSchema";
import instance from "../../services";
import { IProduct } from "../../interfaces/IProduct";

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
  useEffect(() => {
    id &&
      (async () => {
        const res = await instance.get(`/products/${id}`);
        reset(res.data);
      })();
  }, []);

  function handleProductForm(dataBody: IProduct) {
    try {
      if (id) {
      } else {
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
            type="text"
            className="border rounded-md p-1"
            {...register("price")}
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
