
import { Map, Marker } from "pigeon-maps";

const HotelMap = () => {
  // LuxeWay Hotel location coordinates
  const position = [23.8686, 90.4007];

  return (
    <div className="hotel-map mt-10 md:mt-[60px] lg:mt-[80px] max-w-[1400px] mx-auto">
      {/* Title and Description */}
      <div className="map-header text-center mb-4 md:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold">LuxeWay Hotel</h2>
        <p className="text-base md:text-xl text-gray-600 mt-2 md:mt-4 px-4">
          Your destination for luxury and comfort in Uttara, Dhaka.
        </p>
      </div>

      {/* Map Section */}
      <Map
        height={500}
        defaultCenter={position}
        defaultZoom={13}
      >
        <Marker
          width={50}
          anchor={position}
        />
      </Map>
    </div>
  );
};

export default HotelMap;
