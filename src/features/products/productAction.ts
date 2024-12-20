import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../services/productService";
import instance from "../../services";

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

export const createProduct = createAsyncThunk(
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
