"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import { apiUrl, API_CONFIG } from "@/configs/api";
import {
  FaWallet,
  FaMobileAlt,
  FaRegMoneyBillAlt,
  FaWifi,
} from "react-icons/fa";

const AirtimePage = () => {
  const { userData } = useAppContext();
  const [walletBalance, setWalletBalance] = useState(0);
  const [network, setNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (!userData) return;
      const userId = userData?.id || userData?._id;
      if (!userId) return;

      try {
        const response = await axios.get(
          apiUrl(
            API_CONFIG.ENDPOINTS.ACCOUNT.walletBalance + userId + "/balance"
          )
        );
        setWalletBalance(response.data?.wallet?.balance || 0);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };

    fetchWalletBalance();
  }, [userData]);

  const handlePurchase = (e) => {
    e.preventDefault();
    // Handle purchase logic here
    console.log({ network, phoneNumber, amount });
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Purchase successful!");
    }, 2000);
  };

  const networks = [
    { id: "mtn", name: "MTN" },
    { id: "glo", name: "Glo" },
    { id: "airtel", name: "Airtel" },
    { id: "9mobile", name: "9mobile" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Airtime Top-up
        </h1>
        <p className="text-slate-600 mt-2">
          Quickly and easily recharge any mobile phone.
        </p>
      </div>

      {/* Wallet Balance */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 mb-8 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
            <FaWallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-slate-600 font-medium">Available Balance</p>
            <p className="text-2xl font-bold text-slate-900">
              ₦ {walletBalance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Airtime Form */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 md:p-8 shadow-lg">
        <form onSubmit={handlePurchase} className="space-y-6">
          {/* Network Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Network
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {networks.map((net) => (
                <button
                  key={net.id}
                  type="button"
                  onClick={() => setNetwork(net.id)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                    network === net.id
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-slate-200 bg-slate-50 hover:border-purple-300"
                  }`}
                >
                  <FaWifi className="w-5 h-5 text-slate-500" />
                  <span className="font-semibold text-slate-800">
                    {net.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="relative">
            <FaMobileAlt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Amount Input */}
          <div className="relative">
            <FaRegMoneyBillAlt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Purchase Airtime"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AirtimePage;
