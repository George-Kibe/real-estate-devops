"use client";
import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import convertToSubCurrency from '@/lib/convertToSubCurrency';
import { Button } from './ui/button';
import LoadingPage from './Loading';

const CheckoutPage = ({amount}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    const handlePayment = async () => {
        if (!stripe || !elements) {
            return;
        }
        const  {error: submitError} = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }
        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success?amount=${amount}`,
            },
        });
        if (error) {
            setErrorMessage(error.message);
        }else{
            // payment Ui will close with an automation and customer redirected to return url
        }

        setLoading(true);
    }
    if(!clientSecret || !stripe || !elements){
        return <LoadingPage />
    }

    return (
        <div>
            {clientSecret && <PaymentElement />}
            {errorMessage && <div className='text-red-500'>{errorMessage}</div>}
            <h1>Checkout</h1>
            <Button onClick={handlePayment}>{loading? 'Processing...': `Pay ${amount}`}</Button>
        </div>
    )
}
export default CheckoutPage;