import { Building2, Users, Handshake, Globe, Bell, Star } from 'lucide-react';

function AboutUs() {
  const features = [
    {
      icon: Building2,
      title: "Luxury Stays",
      description: "Experience top-tier hotel accommodations with premium amenities."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "We prioritize customer satisfaction with 24/7 support services."
    },
    {
      icon: Handshake,
      title: "Trusted Partners",
      description: "We collaborate with top hotels to ensure quality service."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Our platform connects users with luxury hotels worldwide."
    },
    {
      icon: Bell,
      title: "Premium Service",
      description: "Enjoy white-glove concierge services during your stay."
    },
    {
      icon: Star,
      title: "Top Ratings",
      description: "Consistently rated 5-stars by satisfied travelers."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1600')"
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-6 inline-flex justify-center items-center bg-[#C19B76]/90 p-4 rounded-full">
            <Building2 size={36} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-[#C19B76]">LuxeWay</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10">
            Redefining luxury travel with exceptional service and handpicked destinations since 2015.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 dark:text-gray-300">
            Why Choose <span className="text-[#C19B76]">LuxeWay</span>
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16 text-lg dark:text-gray-400">
            Discover what makes us the premier choice for discerning travelers.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-100 rounded-xl shadow-lg p-8 transition duration-300 hover:shadow-xl hover:translate-y-[-8px]"
              >
                <div className="h-14 w-14 rounded-lg bg-[#C19B76]/10 flex items-center justify-center mb-6">
                  <feature.icon size={28} className="text-[#C19B76]" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-24 px-6 md:px-16 bg-gray-50 dark:bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-gray-300">
                Our <span className="text-[#C19B76]">Story</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed dark:text-gray-400">
                Founded in 2015, LuxeWay began with a simple vision: to transform how discerning travelers discover and book luxury accommodations worldwide. Today, we connect travelers with over 5,000 luxury properties across 120 countries.
              </p>
              <button className="bg-[#C19B76] hover:bg-[#A68865] text-white py-3 px-8 rounded-md transition duration-300 text-lg font-medium">
                Learn More
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-lg h-64">
                  <img 
                    src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                    alt="Luxury hotel exterior" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg h-40">
                  <img 
                    src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                    alt="Hotel pool" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-lg overflow-hidden shadow-lg h-40">
                  <img 
                    src="https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                    alt="Hotel room" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg h-64">
                  <img 
                    src="https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                    alt="Luxurious bathroom" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;