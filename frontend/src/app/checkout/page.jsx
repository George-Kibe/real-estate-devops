"use client"

import convertToSubCurrency from "@/lib/convertToSubCurrency";
import CheckoutPage from "@/components/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMainProvider } from "@/providers/MainProvider";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
    throw new Error("Stripe public key is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripePayment({searchParams: { amount=99.99}}) {
    const {currentUser} = useMainProvider()
    // TODO: handle successful payments
    // if amount = 99.99 upgrade user to premium/organization
    // if amount =199.99 updgrade user to enterprise
    return (
        <div> 
            <main className="max-w-6xl mx-auto p-10 text-center">
                <div className="mb-10">
                    <h1 className="text-4xl mb-2">{currentUser?.name}-Test</h1>
                    <h2>Amount: {amount}</h2>
                </div>
                <Elements stripe={stripePromise}
                    options={{
                        mode: 'payment',
                        //clientSecret: "your_client_secret_here",
                        currency: 'usd',
                        amount: convertToSubCurrency(amount),
                    }}
                >
                    <CheckoutPage amount={amount} />
                </Elements>
            </main>
        </div>
    )
}