import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const reference = query.get("reference");

    if (reference) {
      axios.get(`http://localhost:3000/api/payment/verify/${reference}`)
        .then(() => {
          alert("Payment successful! You are now premium.");
        });
    }
  }, []);

  return <h2>Processing Payment...</h2>;
}