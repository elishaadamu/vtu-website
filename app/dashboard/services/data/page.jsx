"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import { apiUrl, API_CONFIG } from "@/configs/api";
import {
  FaWallet,
  FaMobileAlt,
  FaRegMoneyBillAlt,
  FaWifi,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdSignalCellularAlt } from "react-icons/md";

// Mock data for plans - in a real app, this would come from an API
const allPlans = [
  {
    planId: "mtn-1",
    networkId: "mtn",
    name: "1GB Data",
    validity: "30 Days",
    price: 300,
  },
  {
    planId: "mtn-2",
    networkId: "mtn",
    name: "2.5GB Data",
    validity: "30 Days",
    price: 500,
  },
  {
    planId: "mtn-3",
    networkId: "mtn",
    name: "5GB Data",
    validity: "30 Days",
    price: 1000,
  },
  {
    planId: "glo-1",
    networkId: "glo",
    name: "1.5GB Data",
    validity: "30 Days",
    price: 350,
  },
  {
    planId: "glo-2",
    networkId: "glo",
    name: "3GB Data",
    validity: "30 Days",
    price: 550,
  },
  {
    planId: "9mobile-1",
    networkId: "9mobile",
    name: "1GB Data",
    validity: "30 Days",
    price: 320,
  },
  {
    planId: "airtel-1",
    networkId: "airtel",
    name: "750MB Data",
    validity: "14 Days",
    price: 250,
  },
  {
    planId: "airtel-2",
    networkId: "airtel",
    name: "2GB Data",
    validity: "30 Days",
    price: 500,
  },
];

const DataPage = () => {
  const { userData } = useAppContext();
  const [walletBalance, setWalletBalance] = useState(0);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [plans, setPlans] = useState([]); // This would be fetched from the API

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

  // Fetch all data plans from API on initial load
  useEffect(() => {
    const fetchDataPlans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          apiUrl(API_CONFIG.ENDPOINTS.DATA.GET_ALL)
        );
        console.log("Data Plans Response:", response.data);
        
        // API returns { count: number, data: [...] }
        if (response.data.data && Array.isArray(response.data.data)) {
          // Map API fields to component's expected structure
          const mappedPlans = response.data.data
            .filter(plan => plan.isActive) // Only show active plans
            .map(plan => ({
              planId: plan.planId,
              networkId: plan.network.toLowerCase(), // Convert to lowercase for matching
              name: plan.planName,
              validity: `${plan.validity} Days`,
              price: plan.price,
              _id: plan._id
            }));
          setPlans(mappedPlans);
        } else {
          // Fallback to default plans if API doesn't return expected format
          console.warn("Unexpected API response format, using fallback plans");
          setPlans(allPlans);
        }
      } catch (error) {
        console.error("Error fetching data plans:", error);
        // Use default plans on error
        setPlans(allPlans);
      } finally {
        setLoading(false);
      }
    };

    fetchDataPlans();
  }, []);

  // Fetch network-specific plans when network is selected
  useEffect(() => {
    if (!selectedNetwork) return;

    const fetchNetworkPlans = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          apiUrl(`${API_CONFIG.ENDPOINTS.DATA.GET_BY_NETWORK}/${selectedNetwork.toUpperCase()}`)
        );
        console.log(`${selectedNetwork} Plans Response:`, response.data);
        
        // API returns { count: number, data: [...] }
        if (response.data.data && Array.isArray(response.data.data)) {
          // Map API fields to component's expected structure
          const mappedPlans = response.data.data
            .filter(plan => plan.isActive) // Only show active plans
            .map(plan => ({
              planId: plan.planId,
              networkId: plan.network.toLowerCase(), // Convert to lowercase for matching
              name: plan.planName,
              validity: `${plan.validity} Days`,
              price: plan.price,
              _id: plan._id
            }));
          setPlans(mappedPlans);
        } else {
          // Fallback to filtering all plans if API doesn't return expected format
          console.warn("Unexpected API response format, filtering from all plans");
          const filtered = allPlans.filter(plan => plan.networkId === selectedNetwork);
          setPlans(filtered.length > 0 ? filtered : allPlans);
        }
      } catch (error) {
        console.error(`Error fetching ${selectedNetwork} plans:`, error);
        // Fallback to filtering from all plans on error
        const filtered = allPlans.filter(plan => plan.networkId === selectedNetwork);
        setPlans(filtered.length > 0 ? filtered : allPlans);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkPlans();
  }, [selectedNetwork]);

  const handleNetworkSelect = (networkId) => {
    setSelectedNetwork(networkId);
    setSelectedPlanId(""); // Reset plan selection when network changes
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    const selectedPlan = plans.find((p) => p.planId === selectedPlanId);
    if (!selectedPlan) {
      alert("Please select a valid data plan.");
      return;
    }
    console.log({
      network: selectedNetwork,
      phoneNumber,
      plan: selectedPlan,
      price: selectedPlan.price,
    });
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Data purchase successful!");
    }, 2000);
  };

  const networks = [
    { id: "mtn", name: "MTN" },
    { id: "glo", name: "Glo" },
    { id: "9mobile", name: "9mobile" },
    { id: "airtel", name: "Airtel" },
  ];

  const filteredPlans = useMemo(() => {
    if (!selectedNetwork) return [];
    return plans.filter((plan) => plan.networkId === selectedNetwork);
  }, [selectedNetwork, plans]);

  const selectedPlanDetails = useMemo(() => {
    if (!selectedPlanId) return null;
    return plans.find((p) => p.planId === selectedPlanId);
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {networks.map((net) => (
                <button
                  key={net.id}
                  type="button"
                  onClick={() => handleNetworkSelect(net.id)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedNetwork === net.id
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-slate-200 bg-slate-50 hover:border-purple-300"
                  }`}
                >
                  <MdSignalCellularAlt className="w-5 h-5 text-slate-500" />
                  <span className="font-semibold text-slate-800">
                    {net.name}
                  </span>
                </button>
              ))}
            </div>
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
                  {filteredPlans.map((plan) => (
                    <option key={plan.planId} value={plan.planId}>
                      {plan.name} ({plan.validity}) - ₦{plan.price}
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
                  {selectedPlanDetails.name}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt /> {selectedPlanDetails.validity}
                  </span>
                </div>
              </div>
              <p className="text-xl font-bold text-purple-600">
                ₦{selectedPlanDetails.price}
              </p>
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
