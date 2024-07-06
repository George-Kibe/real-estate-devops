// import { NextRequest, NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { amount } = await request.json();
    if (!amount) {
        return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            //payment_method_types: ['card'],
            automatic_payment_methods: { enabled: true },
        });
    
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.log("Internal server Error: ", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}