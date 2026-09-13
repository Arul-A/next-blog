"use client";

import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: "error", message: "All fields are required" });
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.code === 201 || res.ok) {                
                setStatus({ type: "success", message: "Enquiry submitted successfully! We will get back to you soon." });
                setFormData({
                    name: "",
                    email: "",
                    message: ""
                });
            } else {
                setStatus({ type: "error", message: data.message || "Failed to submit enquiry" });
            }
        } catch (error) {
            setStatus({ type: "error", message: error.message || "Something went wrong" });
        } finally {
            setSubmitting(false);
        }

        setTimeout(() => {
            setStatus({ type: "", message: "" });
        }, 5000);
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-xs">
            <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-100 mb-3">
                    Get in Touch
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    Contact Us
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Have questions, feedback, or a story to pitch? Send us a message below.
                </p>
            </div>

            {status.message && (
                <div
                    className={`p-4 mb-6 rounded-xl text-sm font-medium ${
                        status.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                >
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your thoughts or questions here..."
                        rows={5}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition duration-150 disabled:opacity-50 cursor-pointer"
                >
                    {submitting ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
}
