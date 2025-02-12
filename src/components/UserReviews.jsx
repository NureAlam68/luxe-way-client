import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa6";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the server
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/reviews");
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-10 md:mt-[60px] lg:mt-[80px] 2xl:mt-[120px] max-w-[1400px] mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 dark:text-white">User Reviews</h1>
      <div className="px-2 md:px-6 2xl:px-0">
        {reviews.length > 0 ? (
          reviews.length > 1 ? (
            <Slider {...settings}>
              {reviews.map((review) => (
                <div key={review._id} className="p-2">
                  <div
                    className="p-8 border border-black bg-black text-white rounded-lg flex flex-col justify-between dark:bg-[#C19B76]"
                    style={{ minHeight: "250px" }}
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={review.userPhoto || "default-avatar.png"}
                        alt={review.username}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <p className="text-lg font-semibold dark:text-black">{review.username}</p>
                    </div>
                    <p className="text-gray-400 flex-grow dark:text-black">{review.comment}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500 flex dark:text-black">
                        {Array(Number(review.rating))
                          .fill(0)
                          .map((_, i) => (
                            <FaStar key={i} />
                          ))}
                      </span>
                      <span className="text-gray-300 ml-2 dark:text-black">
                        {new Date(review.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div
              className="p-8 border border-black bg-black text-white rounded-lg mx-auto flex flex-col justify-between"
              style={{ minHeight: "250px", maxWidth: "400px" }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={reviews[0].userPhoto || "default-avatar.png"}
                  alt={reviews[0].username}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="text-lg font-semibold">{reviews[0].username}</p>
              </div>
              <p className="text-gray-400 flex-grow">{reviews[0].comment}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">
                  {"★".repeat(reviews[0].rating)}
                </span>
                <span className="text-gray-300 ml-2">
                  {new Date(reviews[0].timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          )
        ) : (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserReviews;
