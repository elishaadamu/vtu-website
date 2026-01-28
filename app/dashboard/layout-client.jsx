"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { decryptData } from "../../lib/encryption";
import Logo from "@/assets/logo/logo.png";
import axios from "axios";
import { apiUrl, API_CONFIG } from "@/configs/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/dashboard/Sidebar";
import DateTime from "@/components/DateTime";
import { FaLock, FaTimes } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [openOrders, setOpenOrders] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [hasWallet, setHasWallet] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [nin, setNin] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPinReminder, setShowPinReminder] = useState(false);
  const [walletPin, setWalletPin] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/signin");
    } else {
      const decryptedData = decryptData(user);
      setUserData(decryptedData);
    }
  }, [router]);

  // Check for wallet PIN and set up reminder
  useEffect(() => {
    const checkWalletPin = async () => {
      if (!userData) return;
      const userId = userData?.id || userData?._id;
      if (!userId) return;

      try {
        const response = await axios.get(
          apiUrl(
            API_CONFIG.ENDPOINTS.ACCOUNT.walletBalance + "balance/" + userId,
          ),
        );
        const pin = response.data?.wallet?.pin;
        setWalletPin(pin);

        // Show reminder if PIN doesn't exist
        if (!pin) {
          setShowPinReminder(true);
        }
      } catch (error) {
        console.error("Error checking wallet PIN:", error);
      }
    };

    checkWalletPin();
  }, [userData]);

  // Set up 5-minute interval for PIN reminder
  useEffect(() => {
    if (!walletPin || !showPinReminder) return;

    const intervalId = setInterval(() => {
      setShowPinReminder(true);
    }, 5 * 60); // 5 minutes

    return () => clearInterval(intervalId);
  }, [walletPin]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />

      {/* PIN Reminder Modal */}
      {showPinReminder && !walletPin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-end p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-slide-in-right">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <FaLock className="w-5 h-5" />
                <h3 className="text-lg font-bold">Secure Your Account</h3>
              </div>
              <button
                onClick={() => setShowPinReminder(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              <p className="text-gray-700 mb-4">
                Protect your wallet with a secure PIN. This adds an extra layer
                of security to all your transactions.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded mb-6">
                <p className="text-sm text-orange-800">
                  <strong>Important:</strong> Setting a PIN is recommended for
                  your account security.
                </p>
              </div>

              {/* Button */}
              <Link
                href="/dashboard/set-pin"
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                Create PIN Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleLogout={handleLogout}
        openOrders={openOrders}
        setOpenOrders={setOpenOrders}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        openDelivery={openDelivery}
        setOpenDelivery={setOpenDelivery}
        openProducts={openProducts}
        setOpenProducts={setOpenProducts}
      />

      <div className="md:pl-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="bg-white md:hidden">
          <div className="grid grid-cols-3 items-center p-4 border-b">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 justify-self-start"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link href={"/"} className="justify-self-center">
              <Image className="w-[3rem]" src={Logo} alt="logo" />
            </Link>
            <div className="scale-75 origin-right justify-self-end">
              <DateTime />
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block bg-white border-b">
          <div className="flex items-center justify-end p-2">
            <DateTime />
          </div>
        </div>

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">{children}</main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
          <div className="flex items-center justify-around px-4 py-2 relative">
            {/* Dashboard */}
            <Link
              href="/dashboard"
              className="flex flex-col items-center justify-center py-2 px-3 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-xs mt-1">Dashboard</span>
            </Link>
            {/* Add Money - Center FAB */}
            <Link
              href="/add-money"
              className="flex flex-col items-center justify-center -mt-8"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="text-xs mt-2 text-gray-500">Add Money</span>
            </Link>

            {/* Orders */}
            <Link
              href="/dashboard/history/all-orders"
              className="flex flex-col items-center justify-center py-2 px-3 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="text-xs mt-1">Orders</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
