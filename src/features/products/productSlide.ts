import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productAction";
import { IProduct } from "../../interfaces/IProduct";

type TInitialState = {
  products: IProduct[];
  loading: boolean;
  error: boolean | null;
};

const initialState: TInitialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlide = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});
const ProductReducer = productSlide.reducer;
export default ProductReducer;
