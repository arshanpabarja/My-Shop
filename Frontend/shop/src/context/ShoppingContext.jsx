import React, { createContext, useContext, useEffect, useState } from 'react';
import { AddCartItem, DeleteCartItem, getCartItem } from '../../service/api';
import { useLoginContext } from './LoginContext';
import { useLocalStorage } from '../Hooks/useLocalStorage';

export const ShoppingContext = createContext({});

export const useShoppingContext = () => useContext(ShoppingContext);

export default function ShoppingCartContextProvider({ children }) {
  const [total, setTotal] = useState(0);
  const [cartItem, setCartItem] = useLocalStorage("cartItems", [])
  const { token, login } = useLoginContext();
  const [loadings, setLoading] = useState(false)
  // یک تابع برای گرفتن اطلاعات به‌روز از سرور
  const refreshCartFromServer = async () => {
    try {
      const res = await getCartItem(token);
      setTotal(res.totalPrice);
      setCartItem(res.items);
    } catch (err) {
      console.error('Error refreshing cart:', err);
    }
  };

  // در بار اول
  useEffect(() => {
    refreshCartFromServer();
  }, []);

  // افزودن یک واحد به آیتم
  const handleIncressQty = async (id) => {


    if (!login) {
      setCartItem((currentItems) => {
        let selectedItem = currentItems.find((item) => item.product == id);
        if (selectedItem == null) {
          return [...currentItems, { product: id, qty: 1 }]
        }
        else {
          return currentItems.map(item => {
            if (item.product == id) {
              return { ...item, qty: item.qty + 1 }
            } else {
              return item;
            }
          })
        }
      })
    }
    else {
      setLoading(true)
      try {
        await AddCartItem(token, id, 1);
        await refreshCartFromServer();
      } catch (err) {
        console.error('Error increasing qty:', err);
      } finally {
        setLoading(false)
      }
    }
  };

  // کاهش یک واحد از آیتم (یا حذف کامل)
  const handleDecressQty = async (id) => {
    const selectedItem = cartItem.find((item) => item.product === id);
    if (!login) {
      setCartItem((currentItems) => {
        let selectedItem = currentItems.find(item => item.product === id)
        if (selectedItem?.qty === 1) {
          return currentItems.filter(item => item.product !== id)
        }
        else {
          return (currentItems.map((item) => {
            if (item.product === id) {
              return { ...item, qty: item.qty - 1 };
            }
            else {
              return item;
            }
          }))
        }
      })
    }
    else {
      if (!selectedItem) return;
      setLoading(true)
      try {
        if (selectedItem.qty > 1) {
          await AddCartItem(token, id, -1);
        } else {
          await DeleteCartItem(token, id);
        }
        await refreshCartFromServer();
      } catch (err) {
        console.error('Error decreasing qty:', err);
      } finally {
        setLoading(false)
      }
    };
  }

  // گرفتن مقدار فعلی یک محصول در سبد
  const getProductQty = (id) => {
    if (login) {
      return cartItem.find(item => item.product === id)?.qty || 0
    } else {
      return cartItem.find(item => item.product === id)?.qty || 0
    }
  };
  const totalQty = cartItem.reduce((totalQty, item) => (totalQty + item.qty), 0)

  // حذف کامل یک آیتم از سبد
  const handleDeleteCartItem = async (id) => {
    try {
      await DeleteCartItem(token, id);
      await refreshCartFromServer();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <ShoppingContext.Provider
      value={{
        cartItem,
        handleIncressQty,
        handleDecressQty,
        loadings,
        totalQty,
        setCartItem,
        getProductQty,
        handleDeleteCartItem,
        total,
        refreshCartFromServer
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}