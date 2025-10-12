import React from 'react';
import Banner from '../../Shared/Banner/Banner';
import About from '../../Shared/About/About';
import LocationSection from '../../Shared/Location/LocationSection ';
import PromotionsSection from '../../Shared/PromotionsSection/PromotionsSection';
import Footer from '../../Shared/Footer/Footer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <LocationSection></LocationSection>
            <PromotionsSection></PromotionsSection>
        </div>
    );
};

export default Home;