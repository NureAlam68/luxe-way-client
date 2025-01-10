import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hookes/useAuth";
import Swal from "sweetalert2";
import moment from "moment";
import useAxiosSecure from "../hookes/seAxiosSecure";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState({ rating: 1, comment: "" });

  // Fetch bookings
  useEffect(() => {
    axiosSecure
      .get(`/my-bookings/${user.email}`)
      .then((res) => setBookings(res.data))
      .catch((error) => console.error(error));
  }, [axiosSecure, user.email]);

  // Cancel booking with SweetAlert and success check
  const handleCancelBooking = (id, bookingDate) => {
    const today = moment();
    const allowedCancelDate = moment(bookingDate).subtract(1, "days");

    if (today.isAfter(allowedCancelDate)) {
      return toast.error(
        "You can only cancel the booking up to 1 day before the booked date."
      );
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/cancel-booking/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Cancelled!",
                text: "Your booking has been successfully cancelled.",
                icon: "success",
              });

              // Update the local state to remove the cancelled booking
              const remainingBookings = bookings.filter(
                (booking) => booking._id !== id
              );
              setBookings(remainingBookings);
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to cancel the booking. Please try again later.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again later.",
              icon: "error",
            });
            console.error(error);
          });
      }
    });
  };

  // Update booking date
  const handleUpdateDate = async () => {
    // if (!selectedDate || !currentBooking) return;

    if (!selectedDate) {
      return toast.error("Please select a update date before proceeding.");
    }

    try {
      // Using PATCH to update only the selected date
      await axios.patch(
        `http://localhost:5000/update-booking/${currentBooking._id}`,
        {
          selectedDate: new Date(selectedDate).toISOString(),
        }
      );
      toast.success("Booking date updated successfully!");
      setBookings(
        bookings.map((booking) =>
          booking._id === currentBooking._id
            ? { ...booking, selectedDate: new Date(selectedDate).toISOString() }
            : booking
        )
      );
      setSelectedDate(null);
      setIsDateModalOpen(false);
    } catch (error) {
      toast.error("Failed to update booking date.", error);
    }
  };

  // Submit review
  const handleSubmitReview = async () => {
    try {
      const reviewData = {
        roomId: currentBooking.roomId,
        username: user.displayName,
        userPhoto: user?.photoURL,
        rating: review.rating,
        comment: review.comment,
        timestamp: new Date(),
      };
      await axios.post("http://localhost:5000/reviews", reviewData);
      toast.success("Review submitted successfully!");
      setIsReviewModalOpen(false);
    } catch (error) {
      toast.error("Failed to submit review.", error);
    }
  };

  return (
    <div className="container mt-10 lg:mt-20 min-h-screen max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">My Bookings</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border p-2">
                <img
                  src={booking.image}
                  alt={booking.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border p-2">{booking.name}</td>
              <td className="border p-2">${booking.pricePerNight}</td>
              <td className="border p-2">
                {new Date(booking.selectedDate).toLocaleDateString("en-US")}
              </td>
              <td className="border p-2 grid grid-cols-1 md:flex justify-center gap-1">
                <button
                  onClick={() => {
                    setCurrentBooking(booking);
                    setIsDateModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm md:text-base"
                >
                  Update Date
                </button>
                <button
                  onClick={() => {
                    setCurrentBooking(booking);
                    setIsReviewModalOpen(true);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Review
                </button>
                <button
                  onClick={() =>
                    handleCancelBooking(booking._id, booking.selectedDate)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Date Modal */}
      {isDateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Booking Date</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              className="p-2 border rounded w-full"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsDateModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateDate}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Submit Review</h2>
            <p>
              <strong>Room:</strong> {currentBooking.name}
            </p>
            <label className="block mt-4 font-semibold">User Name:</label>
            <input
              type="text"
              defaultValue={user.displayName}
              disabled
              className="p-2 border rounded w-full"
            />
            <label className="block mt-4 font-semibold">User Photo:</label>
            <input
              type="text"
              defaultValue={user.photoURL}
              disabled
              className="p-2 border rounded w-full"
            />
            <label className="block mt-4 font-semibold">Rating (1-5):</label>
            <input
              type="number"
              required
              value={review.rating}
              min={1}
              max={5}
              onChange={(e) => setReview({ ...review, rating: e.target.value })}
              className="p-2 border rounded w-full"
            />
            <label className="block mt-4 font-semibold">Comment:</label>
            <textarea
              value={review.comment}
              required
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
              className="p-2 border rounded w-full"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
