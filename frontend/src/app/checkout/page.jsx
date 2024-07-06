"use client"

import convertToSubCurrency from "@/lib/convertToSubCurrency";
import CheckoutPage from "@/components/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined){
    throw new Error("Stripe public key is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripePayment({searchParams: { amount=99.99}}) {
    return (
        <div> 
            <main className="max-w-6xl mx-auto p-10 text-center">
                <div className="mb-10">
                    <h1 className="text-4xl mb-2">Random Test</h1>
                    <h2>{amount}</h2>
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