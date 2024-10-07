import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import storeItems from "../data/items.json";

/* Props for ShoppingCartProvider.*/
type ShoppingCartProviderProps = {
  children: ReactNode;
};

/* Represents an item in the shopping cart.*/
type CartItem = {
  id: number;
  quantity: number;
};
/* Context for ShoppingCart functionality.*/
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  total: number;
};

/* Create the context with an empty object as the default value.*/
const ShoppingCartContext = createContext({} as ShoppingCartContext);

/* Custom hook to use ShoppingCart, returns the context of the ShoppingCart.*/
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

/* Component for the shopping cart functionality.*/
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

/* Calculate the quantity of items din the cart*/
  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

/**Calculate the total price of items in the cart */
  const total = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find(i => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

/* Opens and closes the cart.*/
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

/* Gets the quantity of a spesific item in the cart.*/
  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }
  
 /* Clear all items from the cart */
  function clearCart() {
    setCartItems([]);
  }

/* Increase the quantity of a item in the cart.*/
  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

/* Decrease the quantity of a item in the cart.*/
  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

/* Remove an item from the cart*/
  function removeFromCart(id: number) {
    setCartItems(currItems => currItems.filter(item => item.id !== id));
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        clearCart,
        cartItems,
        cartQuantity,
        total,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}