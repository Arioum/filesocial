import React, { useState, FormEvent, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const UpgradePlan: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [stripeLoaded, setStripeLoaded] = useState<boolean>(false);
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const { token, updateUser } = useAuth();

  useEffect(() => {
    if (stripe && elements) {
      setStripeLoaded(true);
    }
  }, [stripe, elements]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe hasn't loaded yet. Please try again or check your internet connection.");
      setIsLoading(false);
      return;
    }

    if (!token) {
      setError('Authentication token is missing. Please log in again.');
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Create a PaymentIntent
      const { data: paymentIntent } = await axios.post<{ clientSecret: string }>(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/subscribe/pro/payment-intent`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Step 2: Confirm the payment
      const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        setError(result.error.message || 'An unknown error occurred during payment confirmation.');
      } else if (result.paymentIntent?.status === 'succeeded') {
        // Step 3: Create the subscription
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/subscribe/pro`,
          {
            paymentIntentId: result.paymentIntent.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update the user data
        updateUser(response.data.user);
        console.log('Updated user data:', response.data.user);

        setSuccess(true);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      if (err.response && err.response.status === 403) {
        setError('Authentication failed. Please log in again.');
      } else {
        setError(err.response?.data?.message || 'An error occurred. Please check your internet connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you for your subscription!</h2>
        <p>Your pro plan is now active.</p>
        <Button onClick={() => navigate(0)}>Refresh to see your plan</Button>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Subscribe to Pro Plan</h2>
      {!stripeLoaded && (
        <div className="text-yellow-600 mb-4">
          Stripe is loading. If this message persists, please check your internet connection and disable any ad blockers.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit" disabled={isLoading || !stripeLoaded || !token} className="w-full">
          {isLoading ? 'Processing...' : 'Subscribe Now'}
        </Button>
      </form>
    </div>
  );
};

export default UpgradePlan;
