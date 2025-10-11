import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-20 my-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Club Info */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Sports Club</h2>
                    <p className="text-gray-400 leading-relaxed">
                        A place where passion meets performance. Join us and enjoy the best
                        sports facilities in town.
                    </p>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-indigo-500" />
                            123 Green Valley Road, Dhanmondi, Dhaka 1209
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-indigo-500" />
                            +880 1234 567890
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-indigo-500" />
                            contact@elitesports.com
                        </li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition"
                        >
                            <Facebook className="w-5 h-5 text-white" />
                        </a>
                        <a
                            href="#"
                            className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition"
                        >
                            <Instagram className="w-5 h-5 text-white" />
                        </a>
                        <a
                            href="#"
                            className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full transition"
                        >
                            <Twitter className="w-5 h-5 text-white" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom line */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
                © {new Date().getFullYear()} Elite Sports Club — All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
