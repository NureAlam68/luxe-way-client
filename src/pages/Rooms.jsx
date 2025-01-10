import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the MongoDB API
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/rooms", {
          params: {
            minPrice,
            maxPrice,
          },
        });
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [minPrice, maxPrice]);

  const resetFilters = () => {
    setMinPrice(null);
    setMaxPrice(null);
  };

  return (
    <div className="min-h-screen mt-8 md:mt-[50px] xl:mt-[70px] max-w-[1400px] mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        Explore Luxe Stays
      </h1>
      {/* Filter Section */}
      <div className="my-4 text-center">
        <h2 className="text-sm font-semibold mb-4">Filter by Price Range</h2>
        <div className="flex justify-center items-center mb-4">
          <input
            type="number"
            value={minPrice || ""}
            onChange={(e) =>
              setMinPrice(e.target.value ? parseInt(e.target.value) : null)
            }
            placeholder="Min Price"
            className="px-4 py-2 border border-gray-300 rounded-lg mr-4 w-[100px] md:w-auto"
          />
          <input
            type="number"
            value={maxPrice || ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? parseInt(e.target.value) : null)
            }
            placeholder="Max Price"
            className="px-4 py-2 border border-gray-300 rounded-lg w-[100px] md:w-auto"
          />
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-black text-white  hover:bg-[#C19B76] ml-1"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 px-4 md:px-8 2xl:px-0">
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
                <span className="text-[#C19B76] font-semibold">
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
