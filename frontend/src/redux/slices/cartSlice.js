import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage if exists
const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: initialCart
  },
  reducers: {
    addToCart: (state, action) => {
        const item = action.payload;
      
        const existingItem = state.cartItems.find(
          i => i._id === item._id && i.selectedSize === item.selectedSize
        );
      
        const productInStore = item; // or fetch from products slice if needed
        const selectedSizeStock = productInStore.sizes.find(
          s => s.size === item.selectedSize
        )?.stock || 0;
      
        if (existingItem) {
          if (existingItem.quantity < selectedSizeStock) {
            existingItem.quantity += item.quantity || 1;
          }
        } else {
          if (item.quantity <= selectedSizeStock) {
            state.cartItems.push({ ...item, quantity: item.quantity || 1 });
          }
        }
      
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      },
          

    removeFromCart: (state, action) => {
        const { id, selectedSize } = action.payload;
        state.cartItems = state.cartItems.filter(item =>
            !(item._id === id && item.selectedSize === selectedSize)
        );
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },

    increaseQuantity: (state, action) => {
        const { id, selectedSize, stock } = action.payload;
        const item = state.cartItems.find(i => i._id === id && i.selectedSize === selectedSize);
      
        if (item && item.quantity < stock) {
          item.quantity += 1;
          localStorage.setItem('cart', JSON.stringify(state.cartItems));
        }
        
      },  
    decreaseQuantity: (state, action) => {
        const { id, selectedSize } = action.payload;
        const item = state.cartItems.find(i => i._id === id && i.selectedSize === selectedSize);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        } else {
            // Optionally remove item if quantity hits 0
            state.cartItems = state.cartItems.filter(i =>
                !(i._id === id && i.selectedSize === selectedSize)
            );
        }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(i => i._id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(state.cartItems));
      }
    }
  }
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
