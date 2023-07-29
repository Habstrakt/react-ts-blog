import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    productsCart: [],
  },
  reducers: {
    addProductToCart: (state, action) => {
      const newProduct = action.payload;

      const existingProduct = state.productsCart.find(
        (product) =>
          product.id === newProduct.id &&
          product.selectedSize === newProduct.selectedSize
      );

      if (existingProduct) {
        existingProduct.quantity += newProduct.quantity;
      } else {
        state.productsCart.push({ ...newProduct, quantity: 1 });
      }
    },
  },
});

export const { addProductToCart } = pizzaSlice.actions;

export default pizzaSlice.reducer;
