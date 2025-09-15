"use client";

import { useEffect, useState } from "react";
import Sidebar from "../sidebar/page";
import Header from "../header/page";
import Loader from "../loader";

export default function BloggerPage() {
  const [bloggerData, setBloggerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBloggerData = async () => {
    try {
      const res = await fetch("/api/admin/blogger/list");
      const data = await res.json();
      if (res.ok) {
        setBloggerData(data);
      } else {
        setError(data.error || "Failed to fetch data");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloggerData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/admin/blogger/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        // Remove blogger from state to update UI
        setBloggerData(bloggerData.filter(blogger => blogger._id !== id));
      } else {
        alert(data.error || "Failed to delete blogger");
      }
    } catch (err) {
      alert("Network error");
    }
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="flex justify-center bg-gray-100 min-h-screen p-6">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mt-10">
          <h3 className="text-2xl font-bold text-center text-purple-800 mb-6">Blogger List</h3>

          {bloggerData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg text-sm">
                <thead className="bg-purple-100 text-purple-800">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Contact</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bloggerData.map((blogger, index) => (
                    <tr key={index} className="hover:bg-purple-50">
                      <td className="border border-gray-300 px-4 py-2">{blogger.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{blogger.email}</td>
                      <td className="border border-gray-300 px-4 py-2">{blogger.contact}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => handleDelete(blogger._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center mt-6 text-gray-600">No bloggers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
