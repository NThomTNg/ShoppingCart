import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

/**Props for CartItem component */
type CartItemProps = {
  id: number
  quantity: number
}

/**CartItem component displays the individual items in the shopping cart */
export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  const item = storeItems.find(i => i.id === id) // Finds the item in the store items list
  if (item == null) return null // If the item is not found, return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex
        align-items-center">
            {/**Item image */}
            <img 
            src={item.imgUrl} 
            style={{ width: "125px", height: "75px", objectFit:
            "cover"}}
            />

            {/**Details of Item */}
            <div className="me-quto">
                <div className="fs-3">
                    {item.name}{" "}
                    {quantity > 1 && (
                    <span className="text-muted" style={{fontSize: 
                    ".25rem" }}>
                    x{quantity}
                    </span>)}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem"}}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            {/**Total price of Item */}
            <div>{formatCurrency(item.price * quantity)}</div>
            {/**Remove button */}
            <Button variant="outline-danger" size="sm" onClick= {() =>
                removeFromCart(item.id)
            }>&times;</Button>
        </Stack>
    )
}