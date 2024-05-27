import React, { useState, useEffect } from "react";
import axios from "axios";
import CartTourItem from "./CartTourItem";
import { loadStripe } from "@stripe/stripe-js";

interface Tour {
  tourname: string;
  creator: string;
  date: Date | string;
  price: number;
  description?: string;
  attendees?: number;
  location?: string;
  duration?: string;
  _id: string;
}

interface DashboardReservedToursProps {
  userId: string; // Pass userId as a prop
}

const DashboardReservedTours: React.FC<DashboardReservedToursProps> = ({ userId }) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const stripePromise = loadStripe("pk_test_51PKPiKRwQL00CT5o7dHPgJduEFOeUOvhNdfnfJkQnse5FkjS0GtrHHpkTmVUZhCObndzFwAdWnKAU22nEoupga0400XibCrGkr"); // Use your test public key

  useEffect(() => {
    fetchReservedTours();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [tours]);

  const fetchReservedTours = async () => {
    try {
      const response = await axios.get<Tour[]>(`http://localhost:3000/api/tours/reserved/${userId}`);
      setTours(response.data);
    } catch (error) {
      console.error("Error fetching reserved tours:", error);
    }
  };

  const calculateTotalPrice = () => {
    const total = tours.reduce((acc, tour) => acc + tour.price, 0);
    setTotalPrice(total);
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/create-checkout-session', {
        amount: totalPrice * 100, // Convert to cents
      });

      const { id: sessionId } = response.data;
      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe.js has not yet loaded.");
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error redirecting to Stripe Checkout:", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const deleteTour = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/tours/${id}`);
      setTours(prevTours => prevTours.filter(tour => tour._id !== id));
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  return (
    <div className="tour-list">
      <div>
        {tours.length === 0 ? (
          <p className="text-center">No booked tours available</p>
        ) : (
          tours.map(tour => (
            <CartTourItem
              key={tour._id}
              tour={tour}
              deleteTour={deleteTour}
            />
          ))
        )}
      </div>

      {/* Display total price */}
      <div className="text-center mt-4">
        <p style={{fontSize:'18px'}}>Total Price: <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{totalPrice} dt</span></p>
        <button className="btn btn-primary" style={{width:'10%',color:'white',padding:'10px'}} onClick={handlePayment}>Pay</button>
      </div>
    </div>
  );
};

export default DashboardReservedTours;
