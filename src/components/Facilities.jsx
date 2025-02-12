import { motion } from "framer-motion";
import { fadeIn } from "./variants";

const locations = [
  {
    id: 1,
    src: "https://i.ibb.co.com/PcbvTXq/chair-modern-table-interior-indoor.jpg",
    alt: "Luxury Dining Room",
  },
  {
    id: 2,
    src: "https://i.ibb.co.com/zVysJsV/beautiful-tropical-beach-front-hotel-resort-with-swimming-pool-paradise-destination-vacations-ge.jpg",
    alt: "Luxury Villa with Pool",
  },
  {
    id: 3,
    src: "https://i.ibb.co.com/d481cmL/expensive-restaurant-interior-view-with-colorful-illuminating.jpg",
    alt: "Modern Restaurant",
  },
  {
    id: 4,
    src: "https://i.ibb.co.com/6RbszJf/young-bodybuilder-running-cardio-workout-looking-gym-window.jpg",
    alt: "Hotel Gym Area",
  },
  {
    id: 5,
    src: "https://i.ibb.co.com/wLmBf9p/top-view-table-full-delicious-food-composition.jpg",
    alt: "Grilled Chicken Plate",
  },
  {
    id: 6,
    src: "https://i.ibb.co.com/2PCmCrN/modern-luxury-bedroom-suite-bathroom.jpg",
    alt: "Hotel Bedroom",
  },
];

const Facilities = () => {
  return (
    <div className="mt-10 md:mt-[60px] lg:mt-[80px] max-w-[1400px] mx-auto">
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-2xl md:text-4xl font-semibold text-center dark:text-white">
          Our Facilities
        </h1>
        <p className="text-center text-base md:text-xl text-gray-600 mt-2 md:mt-4 px-4 mb-4 md:mb-8 lg:mb-10 w-[95%] lg:w-[70%] mx-auto dark:text-white/80">
          Explore our luxurious facilities, from exquisite dining areas to
          breathtaking views and delicious cuisines. We ensure an unforgettable
          experience for all our guests.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-4 md:px-8 2xl:px-0">
        {locations.map((location) => (
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            key={location.id}
            className="overflow-hidden rounded-lg shadow-md group h-[300px]"
          >
            <img
              src={location.src}
              alt={location.alt}
              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
