"use client";

import { useEffect, useState } from "react";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/admin/course/list");
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (err) {
      console.error("Fetch courses error:", err);
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 py-20">
      <div className="flex flex-col items-center w-full max-w-7xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Courses</h2>

        {/* Responsive centered grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[-32] w-full justify-items-center">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-80 transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.courseName}
                    className="w-40 h-40 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded mb-4">
                    No Image
                  </div>
                )}

                <h3 className="text-xl font-semibold mb-2 text-center">{course.courseName}</h3>
                <p className="text-gray-700 text-sm mb-4 text-center">{course.content}</p>

                {course.youtubeLink ? (
                  <a
                    href={course.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-purple-800 text-white rounded hover:bg-purple-900 transition"
                  >
                    Watch Video
                  </a>
                ) : (
                  <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-not-allowed">
                    No Video
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No courses available</p>
          )}
        </div>
      </div>
    </div>
  );
}
