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

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/signin");
    } else {
      const decryptedData = decryptData(user);
      setUserData(decryptedData);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />

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
              <Image className="w-[3rem]"  src={Logo} alt="logo" />
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

            {/* Orders */}
            <Link
              href="/orders"
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

            {/* Payments */}
            <Link
              href="/payments"
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span className="text-xs mt-1">Payments</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
