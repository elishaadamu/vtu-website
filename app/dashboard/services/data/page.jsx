"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { message } from "antd";
import { useAppContext } from "@/context/AppContext";
import { apiUrl, API_CONFIG, apiUrlData } from "@/configs/api";
import {
  FaWallet,
  FaMobileAlt,
  FaRegMoneyBillAlt,
  FaWifi,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { MdSignalCellularAlt } from "react-icons/md";


const DataPage = () => {
  const { userData } = useAppContext();
  const [walletBalance, setWalletBalance] = useState(0);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [networksLoading, setNetworksLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [networks, setNetworks] = useState([]);

  // Create refs for PIN inputs
  const pinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Handle PIN input change
  const handlePinChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 3) {
      pinRefs[index + 1].current?.focus();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinRefs[index - 1].current?.focus();
    }
  };

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (!userData) return;
      const userId = userData?.id || userData?._id;
      if (!userId) return;

      try {
        setWalletLoading(true);
        const response = await axios.get(
          apiUrl(
            API_CONFIG.ENDPOINTS.ACCOUNT.walletBalance + "balance/" + userId
          )
        );
        setWalletBalance(response.data?.wallet?.balance || 0);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      } finally {
        setWalletLoading(false);
      }
    };

    fetchWalletBalance();
  }, [userData]);

  // Fetch networks from external API on initial load
  useEffect(() => {
    const fetchNetworks = async () => {
      setNetworksLoading(true);
      try {
        const response = await axios.get(
          apiUrlData(API_CONFIG.ENDPOINTS.DATA.GET_ALL)
        );
       
        
        if (response.data.networks && Array.isArray(response.data.networks)) {
          setNetworks(response.data.networks);
        }
      } catch (error) {
        console.error("Error fetching networks:", error);
      } finally {
        setNetworksLoading(false);
      }
    };

    fetchNetworks();
  }, []);

  // Fetch network-specific plans when network is selected
  useEffect(() => {
    if (!selectedNetwork) {
      setPlans([]);
      return;
    }

    const fetchNetworkPlans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          apiUrlData(API_CONFIG.ENDPOINTS.DATA.GET_BY_NETWORK + "=" + selectedNetwork)
        );
      
        
        // API returns array of plans or { plans: [...] }
        const plansData = Array.isArray(response.data) ? response.data : response.data.plans;
        
        if (plansData && Array.isArray(plansData)) {
          setPlans(plansData);
        } else {
          console.warn("Unexpected API response format");
          setPlans([]);
        }
      } catch (error) {
        console.error(`Error fetching ${selectedNetwork} plans:`, error);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkPlans();
  }, [selectedNetwork]);

  const handleNetworkSelect = (identifier) => {
    setSelectedNetwork(identifier);
    setSelectedPlanId(""); // Reset plan selection when network changes
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    
    const userId = userData?.id || userData?._id;
    if (!userId) {
      message.error("User not found. Please log in again.");
      return;
    }

    const selectedPlan = plans.find((p) => p.plan_code === selectedPlanId);
    if (!selectedPlan) {
      message.error("Please select a valid data plan.");
      return;
    }

    const payload = {
      network: selectedNetwork,
      phone: phoneNumber,
      plan_code: selectedPlanId,
      userId,
      amount: selectedPlan.amount,
      pin: pin.join("")
    };
    console.log(payload);

    try {
      setLoading(true);
      const response = await axios.post(
        apiUrl(API_CONFIG.ENDPOINTS.DATA.CREATE),
        payload
      );
      
      message.success("Data subscription successful!");
      
      // Reset form
      setSelectedNetwork("");
      setPhoneNumber("");
      setSelectedPlanId("");
      setPin(["", "", "", ""]);
      setPlans([]);
      
      // Refresh wallet balance
      const balanceResponse = await axios.get(
        apiUrl(
          API_CONFIG.ENDPOINTS.ACCOUNT.walletBalance + "balance/" + userId
        )
      );
      setWalletBalance(balanceResponse.data?.wallet?.balance || 0);
    } catch (error) {
      console.error("Error purchasing data:", error);
      message.error(error.response?.data?.message || "Failed to purchase data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPlans = useMemo(() => {
    return plans;
  }, [plans]);

  const selectedPlanDetails = useMemo(() => {
    if (!selectedPlanId) return null;
    return plans.find((p) => p.plan_code === selectedPlanId);
  }, [selectedPlanId, plans]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Data Subscription
        </h1>
        <p className="text-slate-600 mt-2">
          Get connected instantly with our data plans.
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
            {walletLoading ? (
              <div className="h-8 w-32 bg-slate-200 rounded animate-pulse mt-1"></div>
            ) : (
              <p className="text-2xl font-bold text-slate-900">
                ₦ {walletBalance.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Data Form */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 md:p-8 shadow-lg">
        <form onSubmit={handlePurchase} className="space-y-6">
          {/* Network Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              1. Select Network
            </label>
            {networksLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-slate-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {networks.map((net) => (
                  <button
                    key={net.identifier}
                    type="button"
                    onClick={() => handleNetworkSelect(net.identifier)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedNetwork === net.identifier
                        ? "border-purple-500 bg-purple-50 shadow-md"
                        : "border-slate-200 bg-slate-50 hover:border-purple-300"
                    }`}
                  >
                    <MdSignalCellularAlt className="w-5 h-5 text-slate-500" />
                    <span className="font-semibold text-slate-800 text-xs">
                      {net.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              2. Enter Phone Number
            </label>
            <FaMobileAlt className="absolute left-4 top-1/2 -translate-y-1/2 mt-3.5 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition"
              required
            />
          </div>

          {/* Plan Selection */}
          {selectedNetwork && (
            <div>
              <label
                htmlFor="plan-select"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                3. Select Plan
              </label>
              <div className="relative">
                <FaWifi className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  id="plan-select"
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition appearance-none bg-white"
                  required
                  disabled={filteredPlans.length === 0}
                >
                  <option value="" disabled>
                    {loading
                      ? "Loading plans..."
                      : filteredPlans.length > 0
                      ? "Choose a data plan"
                      : "No plans available for this network"}
                  </option>
                  {filteredPlans.map((plan, index) => (
                    <option key={`${plan.plan_code}-${index}`} value={plan.plan_code}>
                      {plan.label} - ₦{plan.amount}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Price Display */}
          {selectedPlanDetails && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800">
                  {selectedPlanDetails.label}
                </p>
              </div>
              <p className="text-xl font-bold text-purple-600">
                ₦{selectedPlanDetails.amount}
              </p>
            </div>
          )}

          {/* PIN Input */}
          {selectedPlanId && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  4. Transaction PIN
                </label>
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                >
                  {showPin ? (
                    <>
                      <FaEyeSlash /> Hide PIN
                    </>
                  ) : (
                    <>
                      <FaEye /> Show PIN
                    </>
                  )}
                </button>
              </div>
              <div className="flex gap-3 justify-center">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={pinRefs[index]}
                    type={showPin ? "text" : "password"}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 text-center text-2xl font-bold bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                    required
                  />
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !selectedPlanId || !phoneNumber}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Purchase Data"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataPage;
