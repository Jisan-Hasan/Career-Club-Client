import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { setPostNumber } from "../../api/pack";
import { AuthContext } from "../../contexts/AuthProvider";

const CheckoutForm = ({ pack }) => {
    const { user } = useContext(AuthContext);
    const { price, postNumber } = pack;
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [processing, setProcessing] = useState(false);
    const [post, setPost] = useState(0);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/postNumber/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
            setPost(Number(data.postNumber));
        });
    }, [user, pack, price]);
    console.log(post);

    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log(error);
            setCardError(error?.message);
        } else {
            setCardError("");
        }

        setSuccess("");
        setProcessing(true);
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                    },
                },
            });

        if (confirmError) {
            setCardError(confirmError?.message);
            setProcessing(false);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            setSuccess("Congrats! Your Payment Completed.");
            setTransactionId(paymentIntent?.id);
            setProcessing(false);
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email: user?.email,
                packageId: pack._id,
            };
            console.log(payment);
            fetch(`${process.env.REACT_APP_API_URL}/payment`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.data.insertedId) {
                        setSuccess("Congrats! Your Payment Completed.");
                        setTransactionId(paymentIntent?.id);
                        // console.log(Number(post)+Number(postNumber));
                        setPostNumber(user?.email,Number(post)+Number(postNumber));
                        setProcessing(false);
                    }
                });
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button
                    className="btn btn-sm mt-4 btn-primary"
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                >
                    Pay
                </button>
            </form>

            <p className="text-red-500">{cardError}</p>
            {success && (
                <div>
                    <p className="text-green-500">{success}</p>
                    <p>
                        Your Transaction Id:{" "}
                        <span className="font-bold">{transactionId}</span>
                    </p>
                </div>
            )}
        </>
    );
};

export default CheckoutForm;
