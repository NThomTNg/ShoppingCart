import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


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
  const { cartItems, total, clearCart } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    emailAddress: '',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '');
      const formatted = cleaned.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
      setPaymentInfo(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cvv') {
      const cvv = value.replace(/\D/g, '').slice(0, 3);
      setPaymentInfo(prev => ({ ...prev, [name]: cvv }));
    } else if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned.slice(0, 4);
      if (formatted.length > 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2);
      }
      setPaymentInfo(prev => ({ ...prev, [name]: formatted }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("Please agree to the terms of service before proceeding.");
      return;
    }
    setIsLoading(true);
    console.log("Checkout data:", { deliveryInfo, paymentInfo, deliveryDate: value });
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      navigate('/', { state: { orderSent: true } });
    }, 3000);
  };


  return (
    <div className="container py-5">
      <Link to="/store" className="btn btn-outline-info text-black mb-4">
        <i className="bi bi-arrow-left me-2"></i>
        Back to Store
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge bg-secondary rounded-pill">{cartItems.length}</span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.map(cartItem => {
                const item = storeItems.find(item => item.id === cartItem.id);
                if (!item) return null;
                return (
                  <li key={cartItem.id} className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">{item.name}</h6>
                      <small className="text-muted">Quantity: {cartItem.quantity}</small>
                    </div>
                    <span className="text-muted">{formatCurrency(item.price * cartItem.quantity)}</span>
                  </li>
                );
              })}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>{formatCurrency(total)}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Delivery Information</h4>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder='Todd'
                  name="firstName"
                  value={deliveryInfo.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder='Jamerson'
                  name="lastName"
                  value={deliveryInfo.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="emailAddress" className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailAddress"
                  placeholder='example@mail.com'
                  name="emailAddress"
                  value={deliveryInfo.emailAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  maxLength={8}
                  placeholder='123-456-7890'
                  name="phoneNumber"
                  value={deliveryInfo.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">Delivery Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder='1234 Main St'
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Delivery Date</h4>
            <div className="row mb-4">
              <div className="col-12">
                <Calendar onChange={setValue} value={value} className="w-75" />
              </div>
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">Payment</h4>
            <div className="row gy-3">
              <div className="col-md-6">
                <label htmlFor="cardName" className="form-label">Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  id="cardName"
                  placeholder='Todd Jamerson Smith'
                  name="cardName"
                  value={paymentInfo.cardName}
                  onChange={handlePaymentInfoChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="cardNumber" className="form-label">Credit card number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  placeholder='0000 0000 0000 0000'
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentInfoChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="expiryDate" className="form-label">Expiration</label>
                <input
                  type="text"
                  className="form-control"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentInfoChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  placeholder='999'
                  maxLength={3}
                  value={paymentInfo.cvv}
                  onChange={handlePaymentInfoChange}
                  required
                />
              </div>
            </div>

            <hr className="my-4" />

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
              />
              <label className="form-check-label" htmlFor="agreeToTerms">
                I agree to the <Link to="/terms" className="text-primary">terms of service</Link>
              </label>
            </div>

            <hr className="my-4" />

            <button 
            className="btn btn-outline-info btn-lg text-black"
            type="submit"
            disabled={isLoading}
            >
              {isLoading ? (
                <>
                <span 
                className='spinner-border spinner-border-sm me-2'
                role="status"
                aria-hidden="true"
                ></span>
                Processing your order...
                </>
              ) : (
                'Complete Checkout'
              )}
              </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;