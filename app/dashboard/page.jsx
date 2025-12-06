"use client";
import React, { useState, useEffect, useRef } from "react";
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

const ServicesLayout = () => {
  const { userData } = useAppContext();
  const [walletBalance, setWalletBalance] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Wallet Cards Data
  const walletCards = [
    {
      bankName: "Wema Bank",
      accountNumber: "8573368088",
      accountName: "NORTHENCONNECT - Alkasim Khalil Ashana",
      balance: "₦205,707",
      charge: "CHARGE 1.08%",
      gradient: "from-blue-600 via-blue-500 to-blue-700",
      accentColor: "bg-orange-400",
    },
    {
      bankName: "Sterling Bank",
      accountNumber: "8234567890",
      accountName: "NORTHENCONNECT - Alkasim Khalil",
      balance: "₦150,320",
      charge: "CHARGE 0.95%",
      gradient: "from-purple-600 via-purple-500 to-indigo-600",
      accentColor: "bg-pink-400",
    },
    {
      bankName: "GTBank",
      accountNumber: "0123456789",
      accountName: "NORTHENCONNECT - Business Account",
      balance: "₦420,500",
      charge: "CHARGE 1.20%",
      gradient: "from-orange-600 via-orange-500 to-red-600",
      accentColor: "bg-yellow-400",
    },
  ];

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (!userData) return;
      const userId = userData?.id || userData?._id;
      if (!userId) return;

      try {
        const response = await axios.get(
          apiUrl(
            API_CONFIG.ENDPOINTS.ACCOUNT.walletBalance + "balance/" + userId
          )
        );
        console.log("Wallet Balance Response:", response.data);
        setWalletBalance(response.data?.wallet?.balance);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };

    fetchWalletBalance();
  }, [userData]);

  // Clock effect
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % walletCards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, walletCards.length]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % walletCards.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + walletCards.length) % walletCards.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200  rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-10 lg:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3">
                Welcome to Your Dashboard
              </h1>
              <p className="text-base lg:text-lg text-slate-600 max-w-2xl">
                Access all our premium services and manage your transactions
                seamlessly in one beautiful place
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-full shadow-sm border border-slate-200 text-center">
                <p className="text-lg font-semibold text-slate-900 font-mono tracking-wider">
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Carousel Section */}
        <div className="mb-10 lg:mb-14">
          <div className="relative">
            {/* Carousel Container */}
            <div
              className="relative overflow-hidden rounded-3xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Cards Wrapper */}
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {walletCards.map((card, index) => (
                  <div key={index} className="min-w-full px-2 sm:px-0">
                    {/* Bank Card */}
                    <div
                      className={`relative bg-gradient-to-br ${card.gradient} rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl overflow-hidden`}
                    >
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16"></div>

                      {/* Card Content */}
                      <div className="relative z-10">
                        {/* Top Section - Bank Name and Charge */}
                        <div className="flex items-start justify-between mb-4 sm:mb-5">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-red-500 to-pink-500 rounded"></div>
                              </div>
                              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg shadow-lg"></div>
                            </div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-2">
                              {card.bankName}
                            </h2>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <p className="text-xs sm:text-sm font-semibold text-white">
                              {card.charge}
                            </p>
                          </div>
                        </div>

                        {/* Account Details */}
                        <div className="space-y-2 sm:space-y-2.5">
                          <div>
                            <p className="text-white/80 text-xs sm:text-sm mb-1">
                              Acc. No:
                            </p>
                            <p className="text-white text-base sm:text-lg lg:text-xl font-bold tracking-wider">
                              {card.accountNumber}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/80 text-xs sm:text-sm mb-1">
                              Acc. Name:
                            </p>
                            <p className="text-white text-xs sm:text-sm lg:text-base font-semibold">
                              {card.accountName}
                            </p>
                          </div>
                        </div>

                        {/* Decorative Chip */}
                        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-200/30 to-orange-300/30 rounded-lg backdrop-blur-sm border border-white/20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Hidden on mobile, visible on tablet and desktop
            <button
              onClick={prevSlide}
              className="hidden sm:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 lg:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-20"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-slate-700" />
            </button>
            <button
              onClick={nextSlide}
              className="hidden sm:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 lg:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-20"
              aria-label="Next slide"
            >
              <FaChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-slate-700" />
            </button> */}

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {walletCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-8 sm:w-10 h-2.5 sm:h-3 bg-gradient-to-r from-blue-600 to-indigo-600"
                      : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards - Total Fund and Total Spent */}
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
              ₦ {walletBalance.toFixed(2)}
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
        </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-5">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href={service.path}
                    className="group relative bg-white rounded-xl p-5 lg:p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-slate-100 overflow-hidden"
                  >
                    {/* Gradient Background on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-3">
                        <div
                          className={`bg-gradient-to-br ${service.gradient} p-3.5 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 text-white`}
                        >
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-slate-800 mb-1">
                            {service.name}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end mt-4">
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
