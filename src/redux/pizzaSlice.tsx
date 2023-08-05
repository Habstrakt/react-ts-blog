import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    productsCart: [],
    totalPrice: 0,
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

        if (product.quantity === 0) {
          const productIndex = state.productsCart.findIndex(
            (product) => product.id === productId
          );
          state.productsCart.splice(productIndex, 1);
        }
      }
    },

    calculatedTotalPrice: (state) => {
      state.totalPrice = state.productsCart.reduce(
        (price, product) => price + product.selectedPrice * product.quantity,
        0
      );
    },
  },
});

export const {
  addProductToCart,
  incrementQuantity,
  decrementQuantity,
  calculatedTotalPrice,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
