import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

/** Props for the ShoppingCart component */
type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
// closeCart and cartItems function from shoppingCartContext
  const { closeCart, cartItems } = useShoppingCart();

// Calculates the total price of all items in the cart 
// returns the total price
  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
  };

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>  {/* Render each item in the cart */}
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          {/* Display the total price */}
          <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(calculateTotal())}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}