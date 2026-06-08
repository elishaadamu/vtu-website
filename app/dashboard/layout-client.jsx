"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { decryptData } from "../../lib/encryption";
import Logo from "@/assets/logo/logo-no-bg.png";
import axios from "axios";
import { apiUrl, API_CONFIG } from "@/configs/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/dashboard/Sidebar";
import DateTime from "@/components/DateTime";
import { FaLock, FaTimes, FaHome, FaShoppingCart, FaExchangeAlt, FaCogs, FaWifi, FaPhone, FaLightbulb, FaTv } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
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
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);


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
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
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

      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Mobile/Tablet Header */}
        <div className="bg-white lg:hidden">
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
              <Image className="w-[3rem]" src={Logo} alt="MISAL SUB" />
            </Link>
            <div className="scale-75 origin-right justify-self-end">
              <DateTime />
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white border-b">
          <div className="flex items-center justify-end p-2">
            <DateTime />
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8">{children}</main>

        {/* Mobile/Tablet Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
          {/* Backdrop overlay for quick menu */}
          <div
            className={`fixed inset-0 bg-black/20 z-30 transition-opacity duration-300 ${
              isQuickMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsQuickMenuOpen(false)}
          />
          
          {/* Dark Blue Quick Action Popup Menu */}
          <div
            className={`absolute bottom-[85px] left-1/2 -translate-x-1/2 z-45 bg-[#051c72] text-white px-6 py-4 rounded-3xl shadow-2xl flex gap-6 items-center transition-all duration-300 ease-out origin-bottom ${
              isQuickMenuOpen 
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}
          >
            {/* Quick actions: Data, Airtime, Electricity, Cable */}
            <Link
              href="/dashboard/services/data"
              onClick={() => setIsQuickMenuOpen(false)}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-colors">
                <FaWifi className="w-6 h-6 text-white" />
              </div>
              <span className="text-[11px] font-medium text-white/95">Data</span>
            </Link>
            <Link
              href="/dashboard/services/airtime"
              onClick={() => setIsQuickMenuOpen(false)}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-colors">
                <FaPhone className="w-6 h-6 rotate-[90deg] text-white" />
              </div>
              <span className="text-[11px] font-medium text-white/95">Airtime</span>
            </Link>
            <Link
              href="/dashboard/services/electric"
              onClick={() => setIsQuickMenuOpen(false)}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-colors">
                <FaLightbulb className="w-6 h-6 text-white" />
              </div>
              <span className="text-[11px] font-medium text-white/95">Electricity</span>
            </Link>
            <Link
              href="/dashboard/services/cable"
              onClick={() => setIsQuickMenuOpen(false)}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-colors">
                <FaTv className="w-6 h-6 text-white" />
              </div>
              <span className="text-[11px] font-medium text-white/95">Cable</span>
            </Link>
            {/* Triangle/notch pointer */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#051c72] rotate-45" />
          </div>

          {/* Bottom navigation bar */}
          <div className="relative w-full h-[75px] flex items-end pointer-events-auto shadow-[0_-8px_30px_rgba(0,0,0,0.06)] bg-transparent">
            {/* Curved cutout background */}
            <div className="absolute inset-0 flex">
              <div className="flex-1 bg-white h-full border-t border-gray-100" />
              <div className="w-[120px] h-full relative bg-transparent flex justify-center">
                {/* Dark blue circle behind the cutout */}
                <div className="absolute -top-[12px] w-[74px] h-[74px] rounded-full bg-[#051c72] z-10 shadow-lg" />
                {/* White SVG overlay */}
                <svg className="absolute inset-0 w-full h-full text-white fill-current z-20" viewBox="0 0 120 75" preserveAspectRatio="none">
                  <path d="M 0,0 L 23,0 C 35,0 40,48 60,48 C 80,48 85,0 97,0 L 120,0 L 120,75 L 0,75 Z" />
                </svg>
              </div>
              <div className="flex-1 bg-white h-full border-t border-gray-100" />
            </div>

            {/* Navigation buttons */}
            <div className="relative w-full h-full z-30 flex items-center justify-between px-3 sm:px-6">
              {/* Left Side Buttons */}
              <div className="flex-1 flex justify-around">
                <Link
                  href="/dashboard"
                  className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                    pathname === "/dashboard" ? "text-blue-800" : "text-gray-400"
                  }`}
                >
                  <FaHome className="w-5 h-5" />
                  <span className="text-[10px] font-semibold">Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/history/all-orders"
                  className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                    pathname === "/dashboard/history/all-orders" ? "text-blue-800" : "text-gray-400"
                  }`}
                >
                  <FaShoppingCart className="w-5 h-5" />
                  <span className="text-[10px] font-semibold">Orders</span>
                </Link>
              </div>

              {/* Central Floating Button */}
              <div className="w-[120px] flex justify-center relative">
                <button
                  onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
                  className="absolute -top-[2px] w-[54px] h-[54px] rounded-full bg-gradient-to-b from-[#5c8eff] via-[#2063f6] to-[#0c3cb3] shadow-[0_4px_15px_rgba(32,99,246,0.4)] hover:shadow-[0_6px_20px_rgba(32,99,246,0.6)] active:scale-95 transition-all duration-300 flex items-center justify-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full h-[50%]" />
                </button>
              </div>

              {/* Right Side Buttons */}
              <div className="flex-1 flex justify-around">
                <Link
                  href="/dashboard/history/funding"
                  className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                    pathname === "/dashboard/history/funding" ? "text-blue-800" : "text-gray-400"
                  }`}
                >
                  <FaExchangeAlt className="w-5 h-5" />
                  <span className="text-[10px] font-semibold">Payments</span>
                </Link>
                <Link
                  href="/dashboard/personal-details"
                  className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                    pathname === "/dashboard/personal-details" ? "text-blue-800" : "text-gray-400"
                  }`}
                >
                  <FaCogs className="w-5 h-5" />
                  <span className="text-[10px] font-semibold">Add Money</span>
                </Link>
              </div>
            </div>
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
