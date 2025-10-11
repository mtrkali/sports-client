import React from "react";

const PromotionsSection = () => {
    const coupons = [
        {
            code: "ABC5",
            discount: "5% OFF",
            description: "Get 5% off on your first booking!",
        },
        {
            code: "SPORT10",
            discount: "10% OFF",
            description: "Enjoy 10% off for annual members.",
        },
        {
            code: "WEEKEND15",
            discount: "15% OFF",
            description: "Book weekend sessions with 15% discount!",
        },
    ];

    return (
        <section className="bg-gradient-to-r from-indigo-500 to-green-500 py-16 px-6 md:px-20 text-white">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                Exclusive Offers & Coupons
            </h2>

            {/* Coupons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {coupons.map((coupon, index) => (
                    <div
                        key={index}
                        className="bg-white text-gray-800 rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform"
                    >
                        <h3 className="text-4xl font-bold text-indigo-600 mb-2">
                            {coupon.discount}
                        </h3>
                        <p className="text-lg font-semibold mb-4">Coupon Code: {coupon.code}</p>
                        <p className="text-gray-600 mb-6">{coupon.description}</p>

                        {/* Button placeholder (you’ll add functionality later) */}
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition">
                            Copy Code
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PromotionsSection;
