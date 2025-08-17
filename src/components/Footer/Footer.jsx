import React from "react";
import "./Footer.module.css";
import amazonpay from "../../assets/amazon-pay.png";
import americanexpress from "../../assets/american-express.png";
import mastercard from "../../assets/master-card.png";
import paypal from "../../assets/paypal.png";
import appstore from "../../assets/app-store.png";
import googleplay from "../../assets/google-play.png";

export default function Footer() {
  return (
    <footer className="bg-[#f4f5f6] text-gray-700 py-10 px-4 w-full border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* App Promo Section */}
        <div>
          <h2 className="text-green-700 text-xl font-bold mb-2 text-center sm:text-left">
            Get the FreshCart App
          </h2>
          <p className="text-sm mb-4 text-center sm:text-left">
            We will send you a link, open it on your phone to download the app
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Email..."
              className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-[900px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-[#0aad0a] text-white px-4 sm:px-6 cursor-pointer py-2 rounded-md hover:bg-green-700 transition-all w-full max-w-[170px] sm:max-w-[170px] md:max-w-[170px]">
              Share App Link
            </button>
          </div>
        </div>

        {/* Payment & App Links Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t pt-6">
          {/* Payment Partners */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center md:justify-start text-center">
            <span className="text-green-800 font-semibold">
              Payment Partners
            </span>
            <div className="flex flex-wrap justify-center gap-4">
              <img
                src={amazonpay}
                alt="Amazon Pay"
                className="w-20 h-12 object-contain"
              />
              <img
                src={americanexpress}
                alt="American Express"
                className="w-20 h-12 object-contain"
              />
              <img
                src={mastercard}
                alt="MasterCard"
                className="w-20 h-12 object-contain"
              />
              <img
                src={paypal}
                alt="PayPal"
                className="w-20 h-12 object-contain"
              />
            </div>
          </div>

          {/* App Store Links */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center md:justify-end text-center">
            <span className="text-green-800 font-semibold">
              Get deliveries with FreshCart
            </span>
            <div className="flex gap-4 justify-center">
              <img
                src={appstore}
                alt="App Store"
                className="w-28 h-10 object-contain"
              />
              <img
                src={googleplay}
                alt="Google Play"
                className="w-28 h-10 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
