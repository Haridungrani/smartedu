"use client";

import { useEffect, useState } from "react";
import { FaUser, FaPenFancy, FaEnvelope } from "react-icons/fa"; // FaEnvelope for contact
import Header from "./header/page";
import Sidebar from "./sidebar/page";
import Loader from "./loader";

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBloggers, setTotalBloggers] = useState(0);
  const [totalContact, setTotalContact] = useState(0);
  // const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch total users
        const resUsers = await fetch("/api/admin/user/count");
        const dataUsers = await resUsers.json();
        setTotalUsers(dataUsers.totalUsers || 0);

        // Fetch total bloggers
        const resBloggers = await fetch("/api/admin/blogger/count");
        const dataBloggers = await resBloggers.json();
        setTotalBloggers(dataBloggers.totalBloggers || 0);

        //fetch total courses
        //         const resCourses = await fetch("/api/admin/course/count");
        // const dataCourses = await resCourses.json();
        // setTotalCourses(dataCourses.totalCourses || 0);

        // Fetch total contacts
        const resContact = await fetch("/api/admin/contact/count");
        const dataContact = await resContact.json();
        setTotalContact(dataContact.totalContact || 0);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);
  if (loading) return <Loader />;
  if (error) return <div className="text-center mt-6 text-red-600">{error}</div>;

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Users Card */}
          <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
            <FaUser className="text-purple-800 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>

          {/* Total Bloggers Card */}
          <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
            <FaPenFancy className="text-green-600 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Total Bloggers</h2>
            <p className="text-2xl font-bold">{totalBloggers}</p>
          </div>

          {/* Total Contact Card */}
          <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
            <FaEnvelope className="text-blue-600 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Total Contact</h2>
            <p className="text-2xl font-bold">{totalContact}</p>
          </div>

          {/* Total Courses Card */}
          {/* <div className="bg-white shadow-lg rounded-lg p-10 text-center w-64 aspect-square flex flex-col justify-center items-center">
  <FaPenFancy className="text-red-600 w-12 h-12 mb-4" />
  <h2 className="text-xl font-semibold mb-2">Total Courses</h2>
  <p className="text-2xl font-bold">{totalCourses}</p>
</div> */}
        </div>
      </div>
    </div>
  );
}
