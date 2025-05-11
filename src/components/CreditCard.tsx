import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart, CartItem } from "../contexts/CartContext";
import {createOrder} from "@/api/order"
import { processPayment } from "@/api/payment";
const PaymentMethod = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");


  const { items, clearCart } = useCart(); 

   const handlePay = async () => {
    try {
      // Sample userId — replace with auth context later
      const userId = Number(localStorage.getItem("userId")) ;

      const itemIds = items.map((item) => Number(item.id)); // adjust to match backend
      const orderDate = new Date().toISOString().split("T")[0];

      const dto = {
        userId,
        itemIds,
        status: "PENDING",
        orderDate,
      };

      const orderCreated  = await createOrder(dto);
      const res = await processPayment(orderCreated.data.id);
      clearCart(); // ✅ optional: clear cart after order success
      navigate("/payment-success");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to process payment.");
    }
  };
  return (
    <div className="flex items-center justify-center p-4 ">
      <div className="w-full max-w-sm bg-white rounded-xl p-6 shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-center">Payment Method</h2>

        {/* Credit Card Visual (DYNAMIC) */}
        <div className="rounded-xl bg-gradient-to-br from-purple-400 to-purple-700 text-white p-4 space-y-2">
          <p className="text-sm">
            {cardNumber || "**** **** **** ****"}
          </p>
          <div className="text-xs flex justify-between">
            <span>Valid: {expiry || "MM/YY"}</span>
            <span>Sec Code: {cvv || "***"}</span>
          </div>
          <p className="text-sm opacity-70">
            {cardHolder || "Cardholder Name"}
          </p>
          <div className="flex justify-between items-center text-sm mt-2">
            <span>DEBIT</span>
            <span className="text-lg font-bold">VISA</span>
          </div>
        </div>

        {/* Card Number */}
        <div>
          <label className="text-sm font-medium">Enter Card Number</label>
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
            <input
              type="text"
              placeholder="**** **** ****"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm"
            />
            <img src="/images/VISA.jpg" alt="Visa" className="h-5 w-8" />
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="text-sm font-medium">Card Holder Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="w-full bg-gray-100 px-3 py-2 rounded-lg outline-none text-sm"
          />
        </div>

        {/* Expiry and CVV */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full bg-gray-100 px-3 py-2 rounded-lg outline-none text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">CVV</label>
            <input
              type="text"
              placeholder="***"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full bg-gray-100 px-3 py-2 rounded-lg outline-none text-sm"
            />
          </div>
        </div>

        {/* Other Payment Methods */}
        <button
          className="w-full bg-gradient-to-br from-purple-400 to-purple-700 text-white rounded-full py-2 font-medium"
          onClick={() => setShowModal(true)}
        >
          Other payment Methods
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-80 space-y-4 shadow-xl">
              <h3 className="text-lg font-semibold">Choose Payment Method</h3>
              <button
                onClick={() => navigate("/")}
                className="w-full [background-color:#7C3AED] text-white py-2 rounded-lg"
              >
                Cash
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Icons */}
        <div className="flex justify-between items-center px-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
          ))}
        </div>

        {/* Proceed Button */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold"
          onClick={handlePay}
        >
          Proceed Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
