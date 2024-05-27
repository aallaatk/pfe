import React from 'react';

interface CartProps {
  cart: string[];
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((tourId, index) => (
          <li key={index}>{tourId}</li>
        ))}
      </ul>
      {/* Calculate total amount and display it */}
      <button className="btn btn-grad p-3 mt-3" style={{ color: 'white', fontWeight: 'bold' }}>
        Pay
      </button>
    </div>
  );
};

export default Cart;
