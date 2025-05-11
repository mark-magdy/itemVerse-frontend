import React, { useState } from "react";
import { CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const CongratCard = () => {
      const navigate = useNavigate();
  return (
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <CheckCircle className="w-16 h-16 text-[#7C3AED] mx-auto" />
          <div className="absolute inset-0 flex justify-center items-center -z-10">
            <div className="w-24 h-24 rounded-full bg-[#7C3AED33] animate-ping"></div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Thank you for ordering!</h2>
      <p className="text-sm text-gray-500 mb-6">
        We’ve received your order and are preparing it. You’ll hear from us soon!
      </p>
      <div className="flex justify-center gap-4">
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
         onClick={() => navigate("/")}>
          View Order
        </button>
        <button className="px-4 py-2 bg-[#7C3AED] text-white rounded hover:bg-[#6B21A8]"
         onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CongratCard;
