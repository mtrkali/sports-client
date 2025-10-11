import React from 'react';
import club from '../../assets/club.jpg'
import court from '../../assets/courts.jpg';
import activities from '../../assets/activities.jpg';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {
    return (
        <div>
            <Carousel className='rounded-lg' autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                <img  src={club} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={court} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={activities} />
                <p className="legend">Legend 3</p>
            </div>
            </Carousel>
        </div>
    );
};

export default Banner;