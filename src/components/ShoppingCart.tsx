import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { useEffect } from "react";

/** Props for the ShoppingCart component */
type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  // closeCart and cartItems function from shoppingCartContext
  const { closeCart, cartItems } = useShoppingCart();
  const location = useLocation(); // Get current location

  // Calculates the total price of all items in the cart 
  // returns the total price
  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
  };

  // Effect to close the cart when navigating to the checkout page
  useEffect(() => {
    if (location.pathname === "/checkout") {
      closeCart(); // Close cart when navigating to checkout
    }
  }, [location.pathname, closeCart]); // Run effect when path changes

  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><strong>Cart</strong></Offcanvas.Title>
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
          <Link
            to="/checkout"
            className="btn btn-outline-info"
            style={{ color: 'black' }}
          >
            Go to checkout
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
