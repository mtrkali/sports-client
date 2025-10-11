import React from 'react';
import aboutPhoto from '../../assets/about.jpg'
const About = () => {
    return (
        <div aos-data = 'zoom-in' className='my-5'>
            <section className="bg-gray-50 py-12 px-6 md:px-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left Image */}
                    <div>
                        <img
                            src={aboutPhoto}
                            alt="Club"
                            className="rounded-2xl shadow-lg w-full"
                        />
                    </div>

                    {/* Right Content */}
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-gray-800">
                            About Our Club
                        </h2>

                        <h3 className="text-xl font-semibold text-gray-700 mb-3">Our History</h3>
                        <p className="text-gray-600 leading-relaxed mb-5">
                            Founded in 2005, our club started as a small community of sports lovers...
                        </p>

                        <h3 className="text-xl font-semibold text-gray-700 mb-3">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To inspire people to stay active, promote teamwork, and build a strong
                            fitness culture in our community.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;