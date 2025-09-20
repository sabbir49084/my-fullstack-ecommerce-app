import axios from "axios";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdCall, MdEmail, MdLocationOn, MdSchedule } from "react-icons/md";
import { toast } from "react-toastify";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        try {
            const response = await axios.post("http://localhost:4000/api/messages", formData);
            if (response.status === 201) {
                toast.success("Message sent successfully!");
                setFormData({ name: "", email: "", subject: "", message: "" });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitted(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-['Montserrat'] bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
                        Get in Touch with AFRITABS
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're here to answer any questions you may have about our products
                        and services. Reach out to us and we'll respond as soon as we can.
                    </p>
                </div>
                                <div className="flex flex-col lg:flex-row gap-10 mb-16">
                    {/* Contact Info */}
                    <div className="lg:w-1/3">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-xl">
                            <h2 className="text-2xl font-semibold mb-6 text-green-900">
                                Our Information
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <MdLocationOn className="text-green-700 text-2xl mr-4 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-green-800">Address</h3>
                                        <p className="text-gray-700">
                                            123 Forest Road, Johannesburg, South Africa
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MdCall className="text-green-700 text-2xl mr-4 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-green-800">Phone</h3>
                                        <p className="text-gray-700">+27 123 456 7890</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MdEmail className="text-green-700 text-2xl mr-4 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-green-800">Email</h3>
                                        <p className="text-gray-700">info@afritabs.co.za</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MdSchedule className="text-green-700 text-2xl mr-4 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-green-800">
                                            Business Hours
                                        </h3>
                                        <p className="text-gray-700">Monday - Friday: 8am - 5pm</p>
                                        <p className="text-gray-700">Saturday: 9am - 1pm</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="mt-8">
                                <h3 className="font-medium text-green-800 mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white hover:bg-green-800 transition-all duration-300 ease-in-out hover:scale-120"
                                    >
                                        <FaFacebook className="text-lg" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white hover:bg-green-800 transition-all duration-300 ease-in-out hover:scale-120"
                                    >
                                        <FaTwitter className="text-lg" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white hover:bg-green-800 transition-all duration-300 ease-in-out hover:scale-120"
                                    >
                                        <FaInstagram className="text-lg" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white hover:bg-green-800 transition-all duration-300 ease-in-out hover:scale-120"
                                    >
                                        <FaLinkedin className="text-lg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-xl">
                            <h2 className="text-2xl font-semibold mb-6 text-green-900">
                                Send us a Message
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-green-600 outline-none bg-gray-50 rounded-t-lg transition-all duration-300 ease-in-out"
                                            placeholder=" "
                                        />
                                        <label className="absolute pointer-events-none left-3 top-3 text-gray-500 transition-all duration-300 ease-in-out">
                                            Your Name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-green-600 outline-none bg-gray-50 rounded-t-lg transition-all duration-300 ease-in-out"
                                            placeholder=" "
                                        />
                                        <label className="absolute pointer-events-none left-3 top-3 text-gray-500 transition-all duration-300 ease-in-out">
                                            Your Email
                                        </label>
                                    </div>
                                </div>
                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-green-600 outline-none bg-gray-50 rounded-t-lg transition-all duration-300 ease-in-out"
                                        placeholder=" "
                                    />
                                    <label className="absolute pointer-events-none left-3 top-3 text-gray-500 transition-all duration-300 ease-in-out">
                                        Subject
                                    </label>
                                </div>
                                <div className="relative mb-8">
                                    <textarea
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-green-600 outline-none bg-gray-50 rounded-t-lg transition-all duration-300 ease-in-out"
                                        placeholder=" "
                                    ></textarea>
                                    <label className="absolute pointer-events-none left-3 top-3 text-gray-500 transition-all duration-300 ease-in-out">
                                        Your Message
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-md w-full flex items-center justify-center transition-all duration-300 ease-in-out hover:from-green-700 hover:to-green-800 hover:scale-105 disabled:opacity-70"
                                    disabled={isSubmitted}
                                >
                                    {isSubmitted ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-16 transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6 text-green-900 text-center">
                        Our Location
                    </h2>
                    <div className="rounded-xl overflow-hidden shadow-md">
                        <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <MdLocationOn className="text-6xl text-green-700 mb-2 mx-auto" />
                                <p className="text-green-800 font-medium">
                                    Johannesburg, South Africa
                                </p>
                                <p className="text-gray-600">Interactive map would be here</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6 text-green-900 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-5 rounded-xl shadow-md">
                            <h3 className="font-semibold text-green-800 mb-2">
                                What products does AFRITABS offer?
                            </h3>
                            <p className="text-gray-700">
                                We offer a wide range of high-quality pharmaceutical products
                                including tablets, capsules, and syrups tailored for the African
                                market.
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-md">
                            <h3 className="font-semibold text-green-800 mb-2">
                                How can I place an order?
                            </h3>
                            <p className="text-gray-700">
                                You can place an order by contacting our sales team directly via
                                phone or email, or through our authorized distributors across
                                Africa.
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-md">
                            <h3 className="font-semibold text-green-800 mb-2">
                                Do you ship internationally?
                            </h3>
                            <p className="text-gray-700">
                                Yes, we ship to all African countries and selected international
                                markets. Shipping times and costs may vary.
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-md">
                            <h3 className="font-semibold text-green-800 mb-2">
                                Are your products certified?
                            </h3>
                            <p className="text-gray-700">
                                All our products are certified by relevant health authorities
                                and meet international quality standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                input:focus + label,
                textarea:focus + label,
                input:not(:placeholder-shown) + label,
                textarea:not(:placeholder-shown) + label {
                    top: -20px !important;
                    left: 0 !important;
                    font-size: 0.75rem !important;
                    color: #059669 !important;
                    font-weight: 500 !important;
                }
            `}</style>
        </div>
    );
};

export default Contact;

