import { CartError, CartLoading, CartSuccess } from "./cart.types";

let initialData = {
  loading: false,
  data: [],
  error: false,
  dataLength: 0,
  totalPrice: 0,
  paybalPrice: 0,
  coupon: 0,
};

const CartReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case CartLoading: {
      return {
        ...state,
        loading: true,
      };
    }
    case CartSuccess: {
      const totalPrice = payload.reduce((acc, item) => {
        const productPrice = item.cart[0].prodPrice * item.quantity;
        return acc + productPrice;
      }, 0);

      return {
        ...state,
        loading: false,
        data: payload,
        error: false,
        dataLength: payload.length,
        totalPrice,
        paybalPrice: totalPrice,
      };
    }
    case "UPDATE_CART": {
      const totalPrice = payload.reduce((acc, item) => {
        const productPrice = item.cart[0].prodPrice * item.quantity;
        return acc + productPrice;
      }, 0);

      return {
        ...state,
        data: payload,
        totalPrice,
        paybalPrice: totalPrice,
      };
    }
    case CartError: {
      return {
        ...state,
        loading: false,
        data: [],
        error: true,
        dataLength: 0,
        totalPrice: 0,
      };
    }
    case "code": {
      let finalprice = state.paybalPrice;
      let coupon = 0;

      if (state.paybalPrice >= 1000 && payload === "DATN") {
        finalprice = state.paybalPrice - 500000;
        coupon = 500000;
      } else if (payload === "NPNT") {
        finalprice = state.paybalPrice * 0.9; // Apply 10% discount
        coupon = state.paybalPrice * 0.1; // Amount discounted
      }

      return {
        ...state,
        paybalPrice: finalprice,
        coupon: coupon,
      };
    }
    case "priceIncrease": {
    return {
      ...state,
      totalPrice: state.totalPrice + payload,
      paybalPrice: state.totalPrice + payload, // Cập nhật giá thanh toán
    };
    }
    
    case "priceDecrease": {
      return {
        ...state,
        totalPrice: state.totalPrice - payload,
        paybalPrice: state.totalPrice - payload,
      };
    }
    case "priceChange": {
      return {
        ...state,
        totalPrice: payload,
        paybalPrice: payload,
      };
    }
    
    default: {
      return state;
    }
  }
};

export default CartReducer;
