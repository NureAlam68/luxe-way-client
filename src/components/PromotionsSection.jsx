import Lottie from "lottie-react";
import promotion from "../assets/lottie/promotions.json";

const PromotionsSection = () => {
  return (
    <section className="bg-white mt-10 md:mt-[60px] lg:mt-[80px] 2xl:mt-[120px] px-4 md:px-8 2xl:px-0 max-w-[1400px] mx-auto dark:bg-black">
      <h4 className="text-gray-500 dark:text-white uppercase text-3xl lg:text-4xl tracking-wider text-center">
        Best Winter Offers
      </h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4 md:mt-8 lg:mt-10">
        {/* Left Section */}
        <div className="w-full h-full">
          <Lottie animationData={promotion} className="w-full h-full" />
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center bg-gray-100 min-h-[400px] p-6 dark:bg-gray-800">
          <div className="flex flex-col gap-6">
            {[{
              title: "Small Room",
              duration: "One week",
              price: "$400",
              image:
                "https://i.ibb.co.com/TYyszNx/3d-rendering-beautiful-comtemporary-luxury-bedroom-suite-hotel-with-tv.jpg",
            },
            {
              title: "Family Suite",
              duration: "Two weeks",
              price: "$600",
              image:
                "https://i.ibb.co.com/ZMcZTRJ/mother-daughter-using-digital-tablet-bedroom.jpg",
            },
            {
              title: "Apartments",
              duration: "One month",
              price: "$900",
              image:
                "https://i.ibb.co.com/2PCmCrN/modern-luxury-bedroom-suite-bathroom.jpg",
            }].map((offer, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-[#C19B76] transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center group gap-4">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-20 h-20 md:w-[100px] md:h-[100px] rounded-md object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100">{offer.duration}</p>
                    <p className="text-gray-600 dark:text-gray-300">{offer.title}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-[#C19B76]">{offer.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
