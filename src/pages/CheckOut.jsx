import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";

const CheckOut = () => {
  const publishableKey =
    "pk_test_51Og5yNAkhZxvXRixvqrwLrmfUWSXKnAQlpdMD5eJ7iUskw8ncTi4OCrsGkhxwwIrIRr4kjeSljWLHIi1cvGo7tGq00hF1dT6UV";

  const [product, setProduct] = useState({
    name: "Headphone",
    price: 10,
  });

  const priceForStripe = product.price * 100;

  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:5000/payment",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        console.log("Your payment was successfull");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Complete React & Stripe payment integration</h2>
      <p>
        <span>Product: </span>
        {product.name}
      </p>
      <p>
        <span>Price: </span>${product.price}
      </p>
      <button className="bg-black w-full">
        <StripeCheckout
          stripeKey={publishableKey}
          label="Pay Now"
          name="Pay With Credit Card"
          billingAddress
          shippingAddress
          amount={priceForStripe}
          description={`Your total is $${product.price}`}
          token={payNow}
        />
      </button>
    </div>
  );
};

export default CheckOut;
