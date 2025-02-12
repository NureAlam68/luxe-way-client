import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hookes/useAuth";
import Swal from "sweetalert2";
import moment from "moment";
import useAxiosSecure from "../hookes/seAxiosSecure";
import { Calendar, Star, X, Trash2 } from "lucide-react";

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

  const handleUpdateDate = async () => {
    if (!selectedDate) {
      return toast.error("Please select a update date before proceeding.");
    }

    try {
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
    <div className="mt-10 md:mt-[60px] lg:mt-[80px] px-4 md:px-8 2xl:px-0 min-h-screen max-w-[1400px] mx-auto">
      <div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:text-white">My Bookings</h1>
          <p className="text-gray-600 dark:text-white/80">Manage your upcoming stays and experiences</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-white">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-white">Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-white">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={booking.image}
                          alt={booking.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">{booking.name}</span>
                        <span className="text-sm text-gray-500 dark:text-white/80">${booking.pricePerNight} per night</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-gray-700 dark:text-white/70">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(booking.selectedDate).toLocaleDateString("en-US", {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setCurrentBooking(booking);
                            setIsDateModalOpen(true);
                          }}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Update
                        </button>
                        <button
                          onClick={() => {
                            setCurrentBooking(booking);
                            setIsReviewModalOpen(true);
                          }}
                          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Review
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking._id, booking.selectedDate)}
                          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Date Modal */}
        {isDateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Update Booking Date</h2>
                <button
                  onClick={() => setIsDateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mb-6">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDateModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateDate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Date
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property
                  </label>
                  <p className="text-gray-900 font-medium">{currentBooking?.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReview({ ...review, rating: star })}
                        className={`p-1 ${
                          review.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Share your experience..."
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;