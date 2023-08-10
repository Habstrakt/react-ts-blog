import { createSlice } from "@reduxjs/toolkit";

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    productsCart: [],
    totalPrice: 0,
    deliveryMethod: "Самовывоз",
    paymentMethod: "Оплата картой онлайн",
    deliveryInfo: {
      phone: null,
      name: null,
      email: null,
      address: null,
      house: null,
      apartment: null,
    },
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

    updateDeliveryMethod: (state, action) => {
      state.deliveryMethod = action.payload;
    },

    updatePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    setClientName: (state, action) => {
      state.deliveryInfo.name = action.payload;
    },
  },
});

export const {
  addProductToCart,
  incrementQuantity,
  decrementQuantity,
  calculatedTotalPrice,
  updateDeliveryMethod,
  updatePaymentMethod,
  setClientName,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;
