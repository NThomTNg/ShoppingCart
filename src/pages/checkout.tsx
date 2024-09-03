import React, { useState } from 'react';
import Calendar from 'react-calendar'; //Calender taken from wojtekmaj/react-calendar
import 'react-calendar/dist/Calendar.css'; 
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
import { Link } from 'react-router-dom';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DeliveryInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  emailAddress: string;
}

interface PaymentInfo {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}

const Checkout: React.FC = () => {
  const [value, setValue] = useState<Value>(new Date());
  const { cartItems, total } = useShoppingCart();
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address:'',
    emailAddress:'',
  });


  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("Please agree to the terms of service before proceeding.");
      return;
    }
    console.log("Checkout data:", { deliveryInfo, paymentInfo, deliveryDate: value });
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-container">
        <div className="cart-items-summary">
        <h2>Your Cart</h2>
        <ul>
          {cartItems.map(cartItem => {
            const item = storeItems.find(item => item.id === cartItem.id);
            if (!item) return null;
            return (
              <li key={cartItem.id}>
                {item?.name} x{cartItem.quantity} - {formatCurrency(item?.price * cartItem.quantity)}
              </li>
            );
          })}
        </ul>
        <h3>Total: {formatCurrency(total)}</h3>
      </div>
      <div className="delivery-info">
        <h2>Delivery Information</h2>
        <div>
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={deliveryInfo.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={deliveryInfo.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={deliveryInfo.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="address">Email Address:</label>
          <input
            type="text"
            id="emailAddress"
            name="emailAddress"
            value={deliveryInfo.emailAddress}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="address">Delivery Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={deliveryInfo.address}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="calendar-container">
        <h2>Select Delivery Date</h2>
        <Calendar onChange={setValue} value={value} />
      </div>
      <div className="payment-info">
        <h2>Payment Information</h2>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentInfoChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardName">Name on Card:</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={paymentInfo.cardName}
            onChange={handlePaymentInfoChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            value={paymentInfo.expiryDate}
            onChange={handlePaymentInfoChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handlePaymentInfoChange}
            required
          />
        </div>
      </div>

      <div className="terms-agreement">
        <input
          type="checkbox"
          id="agreeToTerms"
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
          required
        />
        <label htmlFor="agreeToTerms">
          I agree to the terms of service
        </label>
        <Link
            to="/terms"
            className="link"
            style={{ color: 'blue' }}
          >
            Terms Of Service
          </Link>
      </div>
      <button type="submit" className="checkout-button">Complete Checkout</button>
    </form>
  );
};

export default Checkout;