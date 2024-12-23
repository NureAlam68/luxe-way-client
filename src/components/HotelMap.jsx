import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const HotelMap = () => {
  // Hotel location coordinates
  const position = [23.8686, 90.4007];

  return (
    <div className="hotel-map mt-10 md:mt-[60px] lg:mt-[80px]">
      {/* Title and Description */}
      <div className="map-header text-center mb-4 md:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl font-semibold">LuxeWay Hotel</h2>
        <p className="text-base md:text-xl text-gray-600 mt-2 md:mt-4 px-4">Your destination for luxury and comfort in Uttara, Dhaka.</p>
      </div>

      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ width: '100%', height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            LuxeWay. <br /> Uttara, Dhaka.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default HotelMap;
