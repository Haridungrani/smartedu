"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/6 bg-white min-h-screen shadow-md">{/* Sidebar placeholder */}</div>

      {/* Main content */}
      <div className="w-5/6 p-8 space-y-8">
        {/* Page Header */}
        <h1 className="text-4xl font-algerian text-purple-800 text-center mb-2">About us</h1>
        <hr className="w-1/4 mx-auto mb-8 border-purple-800" />

        {/* First Section */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:w-1/2">
            <Image
              src="/about.jpg"
              alt="about image"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-serif text-gray-800 mb-4">
              <span className="font-bold text-gray-800">A</span>bout{" "}
              <span className="font-bold text-gray-800">U</span>s
            </h1>
            <p className="text-gray-700 mb-6">
              Education is the most powerful weapon which you can use to change the world.
              One child, one teacher, one book, one pen can change the world. Learn as much as
              you can while you are young since life becomes too busy later. Go confidently in
              the direction of your dreams, live the life you have imagined. Education is a work
              of self-organization by which man adapts himself to the conditions of life.
            </p>
            <Link href="/contact">
              <button className="px-6 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition">
                THANKS FOR VISITING!
              </button>
            </Link>
          </div>
        </div>

        {/* Second Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-700 mb-6">
            <span className="font-bold italic text-purple-800 text-xl">Welcome to smartEDU</span>:
            Your Gateway to the World of Programming Languages!<br /><br />
            <span className="font-bold italic text-purple-800">At smartEDU,</span> we believe that education is a fundamental right,
            and learning should never be limited by barriers or boundaries. We provide a platform
            that empowers individuals from all walks of life to explore programming languages without any cost.<br /><br />
            <span className="font-bold italic text-purple-800">Our Mission:</span> Democratize education and make programming accessible to everyone.
            <br /><br />
            <span className="font-bold italic text-purple-800">Why Choose smartEDU?</span> Free Access: Knowledge should be freely available to all.
            Our website offers educational content, resources, and tutorials at no charge.
            <br /><br />
            Remember, at smartEDU, knowledge knows no bounds, and learning has no limits.
            Start your coding adventure now!
          </p>
          <div className="text-center">
            <Link href="/developer">
              <button className="px-6 py-3 bg-purple-800 text-white rounded-lg hover:bg-purple-900 transition">
                Happy Learning! The smartEDU Team
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
