import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal, ArrowUpDown, X, BedDouble } from "lucide-react";
import Loading from "../components/Loading";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://luxe-way-server.vercel.app/rooms",
          {
            params: {
              minPrice,
              maxPrice,
              sortOrder,
            },
          }
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [minPrice, maxPrice, sortOrder]);

  const resetFilters = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setSortOrder("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-gray-900 to-gray-800 mb-8">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Hotel"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-4">
            Discover Exceptional Stays
          </h1>
          <p className="md:text-xl text-gray-200 text-center max-w-2xl">
            Experience luxury and comfort in our carefully curated selection of
            rooms
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 2xl:px-0">
        {/* Filter Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </button>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sort by Price</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-white/80">
              Showing {rooms.length} properties
            </div>
          </div>

          {/* Expandable Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/80">
                    Minimum Price
                  </label>
                  <input
                    type="number"
                    value={minPrice || ""}
                    onChange={(e) =>
                      setMinPrice(
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                    placeholder="Min Price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/80">
                    Maximum Price
                  </label>
                  <input
                    type="number"
                    value={maxPrice || ""}
                    onChange={(e) =>
                      setMaxPrice(
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                    placeholder="Max Price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Room Grid */}
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center text-gray-900 font-semibold">
                      <BedDouble className="w-4 h-4 mr-1" />
                      <span className="text-sm">Luxury</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
                    {room.name}
                  </h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-white/80">
                        Starting from
                      </span>
                      <div className="text-2xl font-bold text-blue-600">
                        ${room.pricePerNight}
                        <span className="text-sm font-normal text-gray-500 dark:text-white/80">
                          /night
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/room/${room._id}`)}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-950 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
