import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const { data } = useLoaderData();
    const { title, postNumber, price } = data;
    return (
        <div>
            <p>Payment for {title} Package</p>
            <p>Please Pay ${price}</p>
            <div className="w-96 my-12">
                <Elements stripe={stripePromise}>
                    <CheckoutForm pack={data} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
