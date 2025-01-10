import { FaFacebookF, FaInstagram, FaTwitter, FaTripadvisor } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 lg:px-20 mt-10 md:mt-[60px] lg:mt-[80px] 2xl:mt-[120px]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-400">
          Delivering exceptional hospitality and memorable experiences with a commitment to quality, comfort, and personalized service.
          </p>
          
        </div>

        {/* General Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">General</h3>
          <ul className="space-y-2 text-sm text-gray-400 hover:cursor-pointer">
            <li>Accommodation</li>
            <li>Dine & Drink</li>
            <li>Spa & Leisure</li>
            <li>Services</li>
          </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-sm text-gray-400 hover:cursor-pointer">
            <li className="flex items-center">
              <FaFacebookF className="mr-2" /> Facebook
            </li>
            <li className="flex items-center">
              <FaInstagram className="mr-2" /> Instagram
            </li>
            <li className="flex items-center">
              <FaTwitter className="mr-2" /> Twitter
            </li>
            <li className="flex items-center">
              <FaTripadvisor className="mr-2" /> Tripadvisor
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: hello@luxeway.com</li>
            <li>Phone: +41 463 23 445</li>
            <li>
              Address: Uttara, Dhaka
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>Copyright © 2000 by LuxeWay</p>
          <div className="flex space-x-4 mt-4 md:mt-0 hover:cursor-pointer">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaTripadvisor />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
