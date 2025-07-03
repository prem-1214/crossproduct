import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

interface CartState {
  items: CartItem[];
}

const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const cartData = localStorage.getItem("cart");
    if (cartData) return JSON.parse(cartData);
    return [];
  } catch {
    return [];
  }
};

const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.min(
          item.quantity + action.payload.quantity,
          item.stock
        );
      } else {
        state.items.push({
          ...action.payload,
          quantity: Math.min(action.payload.quantity, action.payload.stock),
        });
      }
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; change: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(
          1,
          Math.min(item.quantity + action.payload.change, item.stock)
        );
      }
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

const handleQuantity = (id: string, delta: number) => {
  const item = items.find((item) => item.id === id);
  if (!item) return;
  if (delta > 0 && item.quantity >= item.stock) return; // Prevent exceeding stock
  dispatch(updateQuantity({ id, change: delta }));
};
