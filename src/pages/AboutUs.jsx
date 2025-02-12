import { FaHotel, FaUsers, FaHandshake, FaGlobe, FaConciergeBell, FaStar } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="dark:bg-black py-16 px-6 md:px-16 lg:px-32 min-h-screen">
      <div className='max-w-[1400px] mx-auto'>
      <h2 className="text-4xl font-bold text-center dark:text-[#C19B76] mb-8">About LuxeWay</h2>
      <p className="text-center text-lg max-w-3xl mx-auto mb-12 dark:text-white">
        LuxeWay is a modern hotel booking platform designed to offer a seamless experience for travelers looking for luxury and comfort.
      </p>
      
      <div className="grid gap-5 md:gap-6 xl:gap-8 md:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-[#C19B76] text-black p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <FaHotel className="text-5xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-center">Luxury Stays</h3>
          <p className="text-center mt-2">Experience top-tier hotel accommodations with premium facilities.</p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-[#C19B76] text-black p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <FaUsers className="text-5xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-center">Customer First</h3>
          <p className="text-center mt-2">We prioritize customer satisfaction with 24/7 support.</p>
        </div>
        
        {/* Card 3 */}
        <div className="bg-[#C19B76] text-black p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <FaHandshake className="text-5xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-center">Trusted Partners</h3>
          <p className="text-center mt-2">We collaborate with top hotels to ensure quality service.</p>
        </div>
        
        {/* Card 4 */}
        <div className="bg-[#C19B76] text-black p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <FaGlobe className="text-5xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-center">Global Reach</h3>
          <p className="text-center mt-2">Our platform connects users with hotels worldwide.</p>
        </div>
        
        {/* Card 5 */}
        <div className="bg-[#C19B76] text-black p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <FaConciergeBell className="text-5xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-center">Premium Service</h3>
          <p className="text-center mt-2">Enjoy top-notch concierge services during your stay.</p>
        </div>
        
        {/* Card 6 */}
        <div className="bg-[#C19B76] text-black p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          <FaStar className="text-5xl mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-center">Top Ratings</h3>
          <p className="text-center mt-2">Highly rated by thousands of happy travelers.</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutUs;
