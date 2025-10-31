import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import club from '../../assets/club.jpg'
import court from '../../assets/courts.jpg';
import activities from '../../assets/activities.jpg';


const Banner = () => {
    const slides = [
       
        
        {
            img: 'https://i.ibb.co.com/mFRL3wbJ/cricket.jpg',
            title: "All-in-One Sports Club Platform",
            desc: "Manage players, events, bookings, and payments — all from one dashboard. Our Sports Club Management System simplifies every aspect of your club’s operations.",
        },
        {
           img: 'https://i.ibb.co.com/JR67tdVQ/courts.jpg',
            title: "Smart Booking & Scheduling",
            desc: "Easily manage court reservations, match schedules, and training sessions with real-time availability updates and smart notifications.",
        },
        {
            img: 'https://i.ibb.co.com/qMrSS2XX/activities.jpg',
            title: "Member Management Made Easy",
            desc: "Add, update, or remove members effortlessly. Keep track of attendance, performance, and membership plans with just a few clicks.",
        },
    ];
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false, speed: 5000 }}
                pagination={{ clickable: true }}
                navigation={false}
                loop={true}
                modules={[Autoplay, Pagination]}
                className="w-full h-[70vh] rounded-2xl overflow-hidden"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={slide.img}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-500/40 flex flex-col items-center justify-center text-center text-white px-6">
                                <h2 className="text-3xl md:text-5xl font-bold mb-3 text-amber-100">{slide.title}</h2>
                                <p className="text-lg md:text-xl max-w-xl bg-black/20 p-6 rounded-2xl">{slide.desc}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;