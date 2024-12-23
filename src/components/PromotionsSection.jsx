import Lottie from "lottie-react";
import promotion from "../assets/lottie/promotions.json";

const PromotionsSection = () => {
  return (
    <section className="bg-white mt-10 md:mt-[60px] lg:mt-[80px] px-4 md:px-8 2xl:px-0">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <Lottie animationData={promotion} />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h4 className="text-gray-500 uppercase text-3xl lg:text-4xl tracking-wider">
            Best Summer Offers
          </h4>
          <div className="flex flex-col gap-6 mt-6 md:mt-8 lg:mt-10">
            {/* Offer Item */}
            {[
              {
                title: "Small Room",
                duration: "One week",
                price: "$50",
                image:
                  "https://i.ibb.co.com/TYyszNx/3d-rendering-beautiful-comtemporary-luxury-bedroom-suite-hotel-with-tv.jpg",
              },
              {
                title: "Family Suite",
                duration: "Two weeks",
                price: "$100",
                image:
                  "https://i.ibb.co.com/ZMcZTRJ/mother-daughter-using-digital-tablet-bedroom.jpg",
              },
              {
                title: "Apartments",
                duration: "One month",
                price: "$200",
                image:
                  "https://i.ibb.co.com/2PCmCrN/modern-luxury-bedroom-suite-bathroom.jpg",
              },
            ].map((offer, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm border border-[#C19B76] transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center group gap-4">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-20 h-20 md:w-[100px] md:h-[100px] rounded-md object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{offer.duration}</p>
                    <p className="text-gray-600">{offer.title}</p>
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
