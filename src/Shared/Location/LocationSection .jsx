import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationSection = () => {
    return (
        <section className="bg-gray-50 py-12 px-6 md:px-16 my-5">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
                Our Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left: Address Details */}
                <div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <MapPin className="text-indigo-600" />
                        Elite Sports Club
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        123 Green Valley Road, Dhanmondi, Dhaka 1209
                    </p>

                    <div className="space-y-2">
                        <p className="flex items-center gap-2 text-gray-700">
                            <Phone className="text-indigo-600 w-5 h-5" /> +880 1234 567890
                        </p>
                        <p className="flex items-center gap-2 text-gray-700">
                            <Mail className="text-indigo-600 w-5 h-5" /> contact@elitesports.com
                        </p>
                    </div>

                    <p className="text-black mt-6 leading-relaxed">
                        Visit us in the heart of Dhaka — easily accessible via the main highway,
                        with on-site parking available.
                    </p>

                    {/* Get Directions Button */}
                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=23.6850,90.3563"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-6 text-indigo-600 font-semibold hover:underline"
                    >
                        Get Directions →
                    </a>
                </div>

                {/* Right: Static Map Image */}
                <div className="border">
                    <MapContainer center={[23.6850, 90.3563]} zoom={8} scrollWheelZoom={false} className="h-96 w-[440px]  md:w-[500px]">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker
                            position={[23.6850, 90.3563]}
                        >
                            <Popup>
                                <strong>gazipur</strong><br />
                            </Popup>
                        </Marker>

                    </MapContainer>
                </div>

            </div>
        </section>
    );
};

export default LocationSection;
