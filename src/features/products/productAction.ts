import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../services/productService";
import instance from "../../services";
import { IProduct } from "../../interfaces/IProduct";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const data = await getAllProducts();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProductById = createAsyncThunk<IProduct, number | string>(
  "products/fetchProductById",
  async (id) => {
    try {
      const { data } = await instance.get(`/products/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createProduct = createAsyncThunk<IProduct, IProduct>(
  "products/createProduct",
  async (product) => {
    try {
      const { data } = await instance.post("/products", product);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProduct = createAsyncThunk<
  IProduct,
  { id: number | string; dataBody: IProduct }
>("products/editProduct", async ({ id, dataBody }, { rejectWithValue }) => {
  try {
    const { data } = await instance.patch(`/products/${id}`, dataBody);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const removeProduct = createAsyncThunk<number | string, number | string>(
  "products/removeProduct",
  async (id, { rejectWithValue }) => {
    try {
      await instance.delete(`/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
