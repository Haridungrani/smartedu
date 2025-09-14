"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, comment }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Message sent successfully!");
        setName("");
        setEmail("");
        setComment("");
      } else {
        setMessage(data.error || "Failed to send message");
      }
    } catch (error) {
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/6 bg-white min-h-screen shadow-md">{/* Sidebar placeholder */}</div>
      <div className="w-5/6 p-8">
        <h1 className="text-4xl font-algerian text-purple-800 text-center mb-2">Contact us</h1>
        <hr className="w-1/4 mx-auto mb-8 border-purple-800" />
        <div className="flex justify-center">
          <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="comment" className="block mb-2 font-semibold text-gray-700">Comment</label>
                <textarea
                  id="comment"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your message"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                ></textarea>
              </div>
              {message && <p className="text-center text-green-600">{message}</p>}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-800 text-white font-forte rounded-lg hover:bg-purple-900 transition"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
