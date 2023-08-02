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
    incrementQuantity: (state, action) => {
      const productId = action.payload;

      const product = state.productsCart.find(
        (product) => product.id === productId
      );

      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;

      const product = state.productsCart.find(
        (product) => product.id === productId
      );

      if (product) {
        product.quantity -= 1;
      }
    },
  },
});

export const { addProductToCart, incrementQuantity, decrementQuantity } =
  pizzaSlice.actions;

export default pizzaSlice.reducer;
