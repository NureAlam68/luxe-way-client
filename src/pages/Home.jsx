import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Facilities from "../components/Facilities";
import HotelMap from "../components/HotelMap";
import PromotionsSection from "../components/PromotionsSection";
import UserReviews from "../components/UserReviews";


const Home = () => {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Show modal after the page loads
  useEffect(() => {
    setTimeout(() => {
      setIsOfferModalOpen(true);
    }, 1000);
  }, []);

  const closeModal = () => {
    setIsOfferModalOpen(false);
  };

  return (
    <div className="relative">
      <Banner />
      <HotelMap />
      <Facilities />
      <PromotionsSection />
      <UserReviews></UserReviews>

      {/* Modal */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-xl text-red-500 hover:text-red-700"
            >
              &times;
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-bold text-center mb-4">
              🎉 Special Offer! 🎉
            </h2>
            <p className="text-lg text-center mb-4">
              Enjoy up to <strong>50% off</strong> on selected rooms! Hurry,
              book now!
            </p>
            <img
              src="https://i.ibb.co.com/tBLLnCV/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv.jpg"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
