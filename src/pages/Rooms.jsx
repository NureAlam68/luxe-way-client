import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the MongoDB API
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen mt-8 md:mt-[50px] xl:mt-[70px]">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        Explore Luxe Stays
      </h1>
      {/* Section Description */}
      <p className="text-center text-base md:text-xl text-gray-600 mt-2 md:mt-4 px-4 mb-4 md:mb-8 lg:mb-10 w-[95%] lg:w-[70%] mx-auto">
      Find your perfect stay with LuxeWay’s curated selection of elegant and comfortable rooms. Experience luxury tailored to your needs, wherever you go.
      </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="bg-white rounded-lg overflow-hidden hover:scale-105 transition-transform border cursor-pointer"
          onClick={() => navigate(`/room/${room._id}`)}
        >
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-[300px] object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{room.name}</h2>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-green-600 font-semibold">
                From ${room.pricePerNight}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Rooms;
