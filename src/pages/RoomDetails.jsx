import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Star, Users, Maximize2, DollarSign, MapPin } from 'lucide-react';
import clsx from 'clsx';
import useAuth from "../hookes/useAuth";
import useAxiosSecure from "../hookes/seAxiosSecure";
import Loading from "../components/Loading";
import { FaStar } from "react-icons/fa6";

const RoomDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/room/${id}`)
      .then((response) => setRoom(response.data))
      .catch((error) => console.error(error));

    axios
      .get(`http://localhost:5000/reviews/${id}`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleBooking = async () => {
    if (!selectedDate) {
      return toast.error("Please select a booking date before proceeding.");
    }

    if (!room?.isAvailable) {
      return toast.error("Sorry, this room is no longer available.");
    }

    const bookingData = {
      roomId: room._id,
      email: user.email,
      name: room.name,
      pricePerNight: room.pricePerNight,
      image: room.image,
      selectedDate,
    };

    try {
      await axiosSecure.post("/book-room", bookingData);
      setIsModalOpen(false);
      toast.success("Room booked successfully!");
      navigate("/myBookings");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!room) return <Loading />;

  const amenities = [
    { icon: <Users className="w-5 h-5" />, label: `${room.capacity} persons`, title: "Capacity" },
    { icon: <Maximize2 className="w-5 h-5" />, label: `${room.size} sqm`, title: "Room Size" },
    { icon: <DollarSign className="w-5 h-5" />, label: `$${room.pricePerNight}/night`, title: "Price" },
    { icon: <MapPin className="w-5 h-5" />, label: "City View", title: "View" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 md:mt-[60px] lg:mt-[80px] px-4 md:px-8 2xl:px-0 min-h-screen max-w-[1400px] mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-2xl"
        >
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">{room.name}</h1>
            <div className="flex items-center gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-gray-600 dark:text-gray-300">({room.totalReviews} reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <div className="text-indigo-600 dark:text-indigo-400">
                    {amenity.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{amenity.title}</p>
                    <p className="font-semibold dark:text-white">{amenity.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="prose dark:prose-invert">
            <h2 className="text-2xl font-semibold mb-2 dark:text-white">Description</h2>
            <p className="text-gray-600 dark:text-gray-300">{room.description}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(
              "w-full py-4 px-6 rounded-lg text-lg font-semibold transition-colors",
              "bg-indigo-600 text-white hover:bg-indigo-700",
              "dark:bg-indigo-500 dark:hover:bg-indigo-600"
            )}
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                setIsModalOpen(true);
              }
            }}
          >
            Book Now
          </motion.button>
        </div>
      </div>

      {reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 dark:text-white">Guest Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                      {review.username[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white">{review.username}</h3>
                    <p className="flex items-center gap-1 dark:text-white">
                    <span className="text-yellow-500 flex">
                      {Array(Number(review.rating))
                        .fill(0)
                        .map((_, i) => (
                          <FaStar key={i} />
                        ))}
                    </span>
                  </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(review.timestamp).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Booking Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md m-4"
          >
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Complete Your Booking</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">Room Type</span>
                <span className="font-semibold dark:text-white">{room.name}</span>
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">Price per night</span>
                <span className="font-semibold dark:text-white">${room.pricePerNight}</span>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Check-in Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  dateFormat="MMMM d, yyyy"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  className="flex-1 px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  onClick={handleBooking}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RoomDetails;