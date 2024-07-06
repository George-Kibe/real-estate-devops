import React from 'react'

const PaymentSuccess = ({searchParams: {amount}}) => {
  return (
    <main className='flex items-center justify-center min-h-96'>
        <div className="mb-10">
            <h1 className="text-2xl font-extrabold mb-2">Thank you for subscribing to our services</h1>
            <h2 className="text-xl font-bold">Your payment of usd: {amount} was successful</h2>
        </div>
    </main>
  )
}

export default PaymentSuccess
