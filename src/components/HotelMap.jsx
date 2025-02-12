import { useState } from 'react';
import { Map, Marker } from "pigeon-maps";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const HotelMap = () => {
  const [isHovered, setIsHovered] = useState(false);
  // LuxeWay Hotel location coordinates
  const position = [23.8686, 90.4007];

  return (
    <section className="hotel-map py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Title and Description */}
        <div className="map-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 dark:text-white">
            Find Us
          </h2>
          <p className="md:text-xl text-gray-600 mx-auto dark:text-white/80">
            Experience luxury in the heart of Uttara, where convenience meets elegance.
          </p>
        </div>

        {/* Map and Contact Info Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Contact Information */}
          <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg dark:bg-[#f0d5ba] h-full">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Contact Details</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <p className="text-gray-600 mt-1">123 Luxury Avenue, Sector 13</p>
                  <p className="text-gray-600">Uttara, Dhaka 1230</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-600 mt-1">+880 2-123456</p>
                  <p className="text-gray-600">+880 1711-123456</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600 mt-1">info@luxewayhotel.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Check-in/out</h4>
                  <p className="text-gray-600 mt-1">Check-in: 2:00 PM</p>
                  <p className="text-gray-600">Check-out: 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg">
            <Map
              height={600}
              defaultCenter={position}
              defaultZoom={15}
              attribution={false}
            >
              <Marker
                width={50}
                anchor={position}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                color={isHovered ? '#2563eb' : '#1e40af'}
              />
            </Map>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelMap;