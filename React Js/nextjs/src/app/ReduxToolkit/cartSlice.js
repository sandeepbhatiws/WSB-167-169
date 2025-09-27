import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

var cartData = localStorage.getItem('cartItems');
var cartData = JSON.parse(cartData);

const initialState = {
  cartItems: cartData ?? [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {

      const checkCart = state.cartItems.filter((v) => {
        if (v.id == action.payload.id) {
          return v;
        }
      })

      if (checkCart.length > 0) {

        const newCartItems = state.cartItems.map((v) => {
          if(v.id == action.payload.id){
            if(v.quantity < 5){
              v.quantity++;
              toast.success('Update Cart Succussfully!')
              return v;
            } else {
              toast.error('Maximum limit reached !')
              return v;
            }
            
          } else {
            return v;
          }
        })

        localStorage.setItem('cartItems', JSON.stringify([...newCartItems]))

        state.cartItems = [...newCartItems];

        
      } else {
        const cartProduct = {
          description : action.payload.description,
          id : action.payload.id,
          image : action.payload.image,
          name : action.payload.name,
          price : action.payload.price,
          quantity : 1
        }

        localStorage.setItem('cartItems', JSON.stringify([cartProduct, ...state.cartItems]))

        state.cartItems = [cartProduct, ...state.cartItems];

        toast.success('Add to Cart Succussfully!')
      }
    },
    removeCart : (state, action) => {
      if(confirm('Are you sure you want to remove ?')){
        const filterCart = state.cartItems.filter((v) => {
          if (v.id != action.payload) {
            return v;
          }
        })

        localStorage.setItem('cartItems', JSON.stringify([...filterCart]));
        state.cartItems = [...filterCart];
        toast.success('Remove cart succussfully !');
      }
    },
    updateCart: (state, action) => {

        const newCartItems = state.cartItems.map((v) => {
          if(v.id == action.payload.id){
            if(action.payload.type == 'plus'){
              if(v.quantity < 5){
                v.quantity++;
                toast.success('Cart updated');
                return v;
              } else {
                toast.error('Maximum value reached');
                return v;
              }
            } else {
              if(v.quantity > 1){
                v.quantity--;
                toast.success('Cart updated');
                return v;
              } else {
                toast.error('Product removed');
                v.quantity--;
                return v;
              }
            }
          } else {
            return v;
          }
        })

        const finalCartItems = newCartItems.filter((v) => {
          if(v.quantity > 0){
            return v;
          }
        })

        localStorage.setItem('cartItems', JSON.stringify([...finalCartItems]))
        state.cartItems = [...finalCartItems];
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeCart, updateCart } = cartSlice.actions

export default cartSlice.reducer