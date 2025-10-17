import React from 'react';
import club from '../../assets/club.jpg'
import court from '../../assets/courts.jpg';
import activities from '../../assets/activities.jpg';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {
    return (
        <div>
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img className='md:h-[550px]' src={club} />
                    <p className="legend">Our club Activities</p>
                </div>
                <div>
                    <img className='md:h-[550px]' src={court} />
                    <p className="legend">Our club</p>
                </div>
                <div>
                    <img className='md:h-[550px]' src={activities} />
                    <p className="legend">Our courts </p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;