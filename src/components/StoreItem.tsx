import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";


/**Props for StoreItem component */
type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
}

/**StoreItem component displats individual items that are available to buy */
export function StoreItem({ id, name, price, imgUrl}: 
    StoreItemProps ) {
      const { 
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      } = useShoppingCart()
      const quantity = getItemQuantity(id)
        return (
          <Card className="h-100">
          {/* Item image */}
          <Card.Img
            variant="top"
            src={imgUrl}
            height="200px"
            style={{ objectFit: "cover" }}
          />
          {/* Item title and price */}
          <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
              <span className="fs-2">{name}</span>
              <span className="ms-2 text-muted">{formatCurrency(price)}</span>
            </Card.Title>
            <div className="mt-auto">
              {quantity === 0 ? (
                // Add to cart button when item is not in cart
                <Button className="w-100 btn-info" onClick={() => increaseCartQuantity(id)}>
                  Add to cart
                </Button>
              ) : (
                // Controls when item is in cart
                <div
                  className="d-flex align-items-center flex-column"
                  style={{ gap: ".5rem" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ gap: ".5rem" }}
                  >
                    <Button className="btn-info" onClick={() => decreaseCartQuantity(id)}>-</Button>
                    <div>
                      <span className="fs-3">{quantity}</span> in cart
                    </div>
                    <Button className="btn-info" onClick={() => increaseCartQuantity(id)}>+</Button>
                  </div>
                  <Button
                    onClick={() => removeFromCart(id)}
                    variant="danger"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
    );
}