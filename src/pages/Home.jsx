import Banner from "../components/Banner";
import Facilities from "../components/Facilities";
import HotelMap from "../components/HotelMap";
import PromotionsSection from "../components/PromotionsSection";




const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HotelMap></HotelMap>
            <Facilities></Facilities>
            <PromotionsSection></PromotionsSection>
        </div>
    );
};

export default Home;