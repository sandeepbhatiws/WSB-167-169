import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';

const Context = createContext();

export default function ContextAPI({ children }) {

  const initialCart = JSON.parse(localStorage.getItem('cartItems')) ?? [];
  const [cartItems, setCartItems] = useState(initialCart);

  const addtoCart = (productData) => {

    var checkedCart = cartItems.filter((v, i) => {
      if (v.id == productData.id) {
        return v;
      }
    });

    if (checkedCart.length > 0) {
      var updatedCart = cartItems.map((v, i) => {
        if (v.id == productData.id) {

          if (v.quantity < 5) {
            v.quantity++;
            toast.success('Update cart succussfully !')
            return v;
          } else {
            toast.error('Maximum quantity reached !')
            return v;
          }

        } else {
          return v;
        }
      });

      var finalData = [...updatedCart];
      setCartItems(finalData);
      localStorage.setItem('cartItems', JSON.stringify(finalData));


    } else {
      const dataAdd = {
        id: productData.id,
        name: productData.name,
        price: productData.price,
        quantity: 1,
        image: productData.image,
        description: productData.description
      };

      var finalData = [dataAdd, ...cartItems];
      setCartItems(finalData);
      localStorage.setItem('cartItems', JSON.stringify(finalData));

      toast.success('Add to cart succussfully !')
    }
  }

  const data = { cartItems, setCartItems, addtoCart }

  return (
    <>
      <Context.Provider value={data}>
        {children}
      </Context.Provider>
    </>
  )
}


export { Context };