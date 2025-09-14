"use client";

import { useState, useEffect } from "react";

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);

  // Fetch all courses from the database
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/admin/course/list");
      const data = await res.json();
      if (res.ok) setCourses(data.courses || []);
      else console.error(data.error);
    } catch (err) {
      console.error("Fetch courses error:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      courseName,
      content,
      youtubeLink,
      image: image ? image.name : "",
    };

    try {
      const res = await fetch("/api/admin/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Course added successfully!");
        setCourseName("");
        setImage(null);
        setContent("");
        setYoutubeLink("");
        fetchCourses(); // refresh table
      } else setMessage("Error: " + data.error);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`/api/admin/course/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Course deleted successfully!");
        setCourses(courses.filter((course) => course._id !== id));
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-20 px-4">
      {/* Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter course name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Course Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              rows={5}
              placeholder="Enter course content"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-semibold">YouTube Link</label>
            <input
              type="url"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter YouTube link"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white font-semibold py-2 rounded-lg hover:bg-purple-900 transition"
          >
            Add Course
          </button>

          {message && <p className="text-center mt-2 text-green-600">{message}</p>}
        </form>
      </div>

      {/* Table */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">Existing Courses</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-purple-100 text-purple-800">
              <tr>
                <th className="border px-4 py-2">Course Name</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Content</th>
                <th className="border px-4 py-2">YouTube Link</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="hover:bg-purple-50">
                  <td className="border px-4 py-2">{course.courseName}</td>
                  <td className="border px-4 py-2 text-center">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.courseName}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="border px-4 py-2">{course.content}</td>
                  <td className="border px-4 py-2">
                    {course.youtubeLink ? (
                      <a
                        href={course.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Video
                      </a>
                    ) : (
                      "No Link"
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center text-gray-500">
                    No courses available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
