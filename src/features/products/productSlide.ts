import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  editProduct,
  fetchProducts,
  removeProduct,
} from "./productAction";
import { IProduct } from "../../interfaces/IProduct";

interface ProductState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const setLoading = (state: ProductState): void => {
  state.loading = true;
  state.error = null;
};

const setError = (state: ProductState) => {
  state.loading = false;
  state.error = "Error";
};

const productSlide = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, setLoading)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, setError)
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...state.products, action.payload];
      })
      .addCase(createProduct.rejected, setError)
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(editProduct.rejected, setError)
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (item) => item.id !== +action.payload
        );
      })
      .addCase(removeProduct.rejected, setError);
  },
});
const ProductReducer = productSlide.reducer;
export default ProductReducer;
