"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaDatabase,
  FaBolt,
  FaTv,
  FaFileAlt,
  FaIdCard,
  FaShoppingBag,
  FaWallet,
  FaChartLine,
  FaMobileAlt,
  FaClipboardList,
  FaCreditCard,
  FaMoneyBillWave,
  FaArrowRight,
  FaArrowUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";
import { apiUrl, API_CONFIG } from "@/configs/api";
import { useAppContext } from "@/context/AppContext";
import WalletCard from "@/components/WalletCard";

const ServicesLayout = () => {
  const { userData, authLoading } = useAppContext();
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const services = [
    {
      name: "Data",
      icon: <FaDatabase className="w-7 h-7" />,
      description: "Mobile data plans and bundles",
      path: "dashboard/services/data",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      name: "Airtime",
      icon: <FaMobileAlt className="w-7 h-7" />,
      description: "Mobile airtime top-up",
      path: "dashboard/services/airtime",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      name: "Electric",
      icon: <FaBolt className="w-7 h-7" />,
      description: "Electricity bill payments",
      path: "dashboard/services/electric",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
    },
    {
      name: "Cable",
      icon: <FaTv className="w-7 h-7" />,
      description: "Cable TV subscriptions",
      path: "dashboard/services/cable",
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-50 to-rose-50",
    },
    {
      name: "BVN Slip",
      icon: <FaFileAlt className="w-7 h-7" />,
      description: "Bank Verification Number services",
      path: "dashboard/services/bvn-slip",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      name: "NIN Slip",
      icon: <FaIdCard className="w-7 h-7" />,
      description: "National Identity Number services",
      path: "dashboard/services/nin-slip",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
    },
  ];

  const transactions = [
    {
      name: "My Orders",
      icon: <FaShoppingBag className="w-5 h-5" />,
      path: "/transactions/orders",
      count: 12,
      color: "blue",
    },
    {
      name: "Wallet Summary",
      icon: <FaWallet className="w-5 h-5" />,
      path: "/transactions/wallet",
      count: null,
      color: "green",
    },
    {
      name: "Dashboard",
      icon: <FaChartLine className="w-5 h-5" />,
      path: "/dashboard",
      count: null,
      color: "purple",
    },
    {
      name: "Orders",
      icon: <FaClipboardList className="w-5 h-5" />,
      path: "/orders",
      count: 5,
      color: "yellow",
    },
    {
      name: "Payments",
      icon: <FaCreditCard className="w-5 h-5" />,
      path: "/payments",
      count: 8,
      color: "blue",
    },
    {
      name: "Add Money",
      icon: <FaMoneyBillWave className="w-5 h-5" />,
      path: "/add-money",
      count: null,
      color: "blue",
    },
  ];

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (!userData) return;
      const userId = userData?.id || userData?._id;
      if (!userId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          apiUrl(
            API_CONFIG.ENDPOINTS.ACCOUNT.walletBalance + "balance/" + userId
          )
        );
        console.log("Wallet Balance Response:", response.data);
        setWalletBalance(response.data?.wallet?.balance);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletBalance();
  }, [userData]);




  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200  rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header Section */}
        <div className="mb-10 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-3">
              {authLoading ? (
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                    Welcome
                  </span>
                  <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              ) : (
                <>
                  <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                    Welcome {userData?.firstName || userData?.username}
                  </span>{" "}
                  <span>🙂</span>
                </>
              )}
            </h1>
            <p className="text-base lg:text-lg text-slate-600 max-w-2xl">
              All your premium services and transactions in one place
            </p>
          </div>
        </div>

        {/* Wallet Carousel Section */}
        <WalletCard walletBalance={walletBalance} isLoading={loading || authLoading} />

        {/* Stats Cards - Total Fund and Total Spent
        <div className="grid grid-cols-2 gap-4 mb-10 lg:mb-14">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-5 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                <FaArrowUp className="w-5 h-5 text-white rotate-180" />
              </div>
              <p className="text-sm lg:text-base text-slate-600 font-medium">
                Total Fund
              </p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">
              ₦ 0.00
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-5 lg:p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-orange-500 to-yellow-600 p-3 rounded-xl shadow-lg">
                <FaArrowUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm lg:text-base text-slate-600 font-medium">
                Total Spent
              </p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">₦ 0</p>
          </div>
        </div> */}

        {/* Main Grid Layout - Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5">
          {/* Services Section - Takes 2 columns on desktop */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                    <FaDatabase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-2xl font-bold text-slate-900">
                      Our Services
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {services.length} premium services available
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-5">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href={service.path}
                    className="group relative bg-white rounded-xl p-5 lg:p-6 transition-all duration-300 hover:scale-105 hover:shadow-md border border-slate-100 overflow-hidden"
                  >
                    {/* Gradient Background on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100  transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex flex-row md:flex-row justify-center items-center gap-4 mb-3">
                        <div
                          className={`bg-gradient-to-br ${service.gradient} p-2 md:p-3.5 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 text-white`}
                        >
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-center md:text-left text-slate-900 group-hover:text-slate-800 mb-1">
                            {service.name}
                          </h3>
                         
                        </div>
                      </div>
                      <div className="flex items-center justify-start mt-4">
                        <span
                          className={`text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent flex items-center gap-1 group-hover:gap-2 transition-all`}
                        >
                          Access now
                          <FaArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions & Stats Section - Takes 1 column on desktop */}
          <div className="space-y-6 lg:space-y-8">
            {/* Transactions List */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                  <FaWallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-slate-900">
                    Quick Actions
                  </h2>
                  <p className="text-sm text-slate-600">Manage activities</p>
                </div>
              </div>

              <div className="space-y-2">
                {transactions.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    className="group flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`bg-${item.color}-100 p-2.5 rounded-lg group-hover:bg-${item.color}-200 transition-colors text-${item.color}-600`}
                      >
                        {item.icon}
                      </div>
                      <span className="font-medium text-slate-900 group-hover:text-slate-700">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count !== null && (
                        <span
                          className={`bg-${item.color}-100 text-${item.color}-700 text-xs font-bold px-2.5 py-1 rounded-full`}
                        >
                          {item.count}
                        </span>
                      )}
                      <FaArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <p className="text-slate-700 font-medium mb-2">
              Need help? Contact our 24/7 support team
            </p>
            <p className="text-sm text-slate-600">
              All services are available 24/7 • Secure transactions guaranteed •
              Premium customer support
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ServicesLayout;
