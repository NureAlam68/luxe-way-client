import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "./variants";

const FeaturedRooms = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch featured rooms from the API
    const fetchFeaturedRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/featured-rooms"
        );
        setFeaturedRooms(response.data);
      } catch (error) {
        console.error("Error fetching featured rooms:", error);
      }
    };

    fetchFeaturedRooms();
  }, []);

  return (
    <div className="featured-rooms-section mt-10 md:mt-[60px] lg:mt-[80px] 2xl:mt-[120px]">
      <motion.h2
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center text-2xl md:text-3xl font-semibold my-6"
      >
        Top-rated Rooms
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 md:mt-8 lg:mt-10 px-4 md:px-8">
        {featuredRooms.map((room) => (
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            key={room._id}
            className="room-card bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
          >
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-semibold">{room.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{room.description}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => navigate(`/room/${room._id}`)}
                  className="bg-[#C19B76] hover:bg-black text-white font-semibold px-4 py-2 transition-colors duration-300"
                >
                  Book Now
                </button>
                <span className="text-[#C19B76] font-semibold">
                  From ${room.pricePerNight}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
