import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import useAuth from "../hookes/useAuth";
import useAxiosSecure from "../hookes/seAxiosSecure";
import { FaStar } from "react-icons/fa";
import Loading from "../components/Loading";

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

    // Fetch reviews for the room
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

  if (!room) return <Loading></Loading>;

  return (
    <div className="mt-10 md:mt-[60px] lg:mt-[80px] px-4 md:px-8 lg:px-10 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={room.image}
          alt={room.name}
          className="rounded-lg shadow-lg h-full"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
          <p>
            <strong>Price per night:</strong> ${room.pricePerNight}
          </p>
          <p>
            <strong>Capacity:</strong> {room.capacity} persons
          </p>
          <p>
            <strong>Size:</strong> {room.size} sqm
          </p>
          <p>
            <strong>Description:</strong> {room.description}
          </p>
          <p>
            <strong>Total Reviews:</strong> {room.totalReviews}
          </p>
          {reviews.length ? (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              {reviews.map((review, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                  <p className="flex items-center gap-1">
                    <strong>{review.username}:</strong>
                    <span className="text-yellow-500 flex">
                      {Array(Number(review.rating))
                        .fill(0)
                        .map((_, i) => (
                          <FaStar key={i} />
                        ))}
                    </span>
                  </p>
                  <p>{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    Posted on: {new Date(review.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-gray-500">
              No reviews available for this room.
            </p>
          )}
          <button
            className="bg-black text-white px-4 py-2 mt-4 hover:bg-[#C19B76] font-semibold"
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                setIsModalOpen(true);
              }
            }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            <p>
              <strong>Room:</strong> {room.name}
            </p>
            <p>
              <strong>Price per night:</strong> ${room.pricePerNight}
            </p>
            <p>
              <strong>Description:</strong> {room.description}
            </p>
            <div className="mt-4">
              <label className="block text-gray-700">
                Select Booking Date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                className="mt-2 p-2 border rounded w-full"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleBooking}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
