import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function registerPayment(email, amount, info, type, dateTime){
    // add payment details to database and update user status
    return "registered and updated"

}

export async function POST(req, res){
    const payload = await req.text();
    const response = JSON.parse(payload);

    const sig = req.headers.get('Stripe-Signature');
    const dateTime = new Date(response?.created * 1000).toLocaleDateString();
    const timeString = new Date(response?.created * 1000).toLocaleTimeString();

    try {
        let event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
        console.log("Success: Event type", event.type);
        // console.log("Payment Information: ", JSON.stringify(response), )
        // handle modifications based on events
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = response.data.object;
            console.log('PaymentIntent was successful!', paymentIntent.amount_received);
            const customerId = paymentIntent.customer;

            // Retrieve customer details using the customer ID
            try {
            const customer = await stripe.customers.retrieve(customerId);
            const customerEmail = customer.email;
            const customerName = customer.name;

            console.log(`Customer details retrieved: Email - ${customerEmail}, Name - ${customerName}`);

            // Perform additional actions like updating the subscription or database
            } catch (error) {
            console.error(`Failed to retrieve customer details: ${error.message}`);
            }
        }
        const updateResponse = await registerPayment(
            response?.data?.object?.customer_details?.email,
            response?.data?.object?.amount,
            JSON.stringify(response), //info
            response?.type,
            dateTime,
            timeString
        )
        return NextResponse.json({ status: "Success", eventType: event.type});
    } catch (error) {
        console.log("Error in webhook: ", error)
        return NextResponse.json({ status: "Error", error});
    }
}
