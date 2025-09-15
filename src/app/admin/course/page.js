"use client";

import { useState, useEffect } from "react";
import Sidebar from "../sidebar/page";
import Header from "../header/page";

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/admin/course/list");
      const data = await res.json();
      if (res.ok) setCourses(data.courses || []);
      else setMessage(data.error || "Failed to fetch courses");
    } catch (err) {
      setMessage("Network error: " + err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Validate form
  const validateForm = () => {
    if (!courseName.trim()) return setMessage("Course name is required");
    if (!/^[A-Za-z\s]+$/.test(courseName)) return setMessage("Course name can only contain letters and spaces");
    if (!editingCourseId && !image) return setMessage("Course image is required");
    if (!content.trim() || content.length < 5) return setMessage("Content must be at least 5 characters");
    if (!youtubeLink.trim()) return setMessage("YouTube link is required");
    setMessage("");
    return true;
  };

  // Add or update course
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("content", content);
    formData.append("youtubeLink", youtubeLink);
    if (image) formData.append("image", image);

    const url = editingCourseId ? `/api/admin/course/${editingCourseId}` : "/api/admin/course";
    const method = editingCourseId ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        setMessage(editingCourseId ? "Course updated successfully!" : "Course added successfully!");
        setCourseName("");
        setContent("");
        setYoutubeLink("");
        setImage(null);
        setEditingCourseId(null);
        fetchCourses();
      } else {
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`/api/admin/course/${id}`, { method: "DELETE" });
      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        setMessage("Course deleted successfully!");
        setCourses(courses.filter((course) => course._id !== id));
      } else {
        setMessage("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  // Edit course
  const handleEdit = (course) => {
    setCourseName(course.courseName);
    setContent(course.content);
    setYoutubeLink(course.youtubeLink);
    setEditingCourseId(course._id);
    setMessage("");
  };

  return (
    <div>
      <Header/>
      <Sidebar/>
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-20 px-4">
      {/* Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">{editingCourseId ? "Update Course" : "Add New Course"}</h2>
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
              required={!editingCourseId}
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
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">YouTube Link</label>
            <input
              type="url"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter YouTube link"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white font-semibold py-2 rounded-lg hover:bg-purple-900 transition"
          >
            {editingCourseId ? "Update Course" : "Add Course"}
          </button>
          {message && <p className="text-center mt-2 text-red-600">{message}</p>}
        </form>
      </div>

      {/* Courses Table */}
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
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="hover:bg-purple-50">
                  <td className="border px-4 py-2">{course.courseName}</td>
                  <td className="border px-4 py-2 text-center">
                    {course.image ? <img src={course.image} alt={course.courseName} className="w-16 h-16 object-cover mx-auto rounded" /> : "No Image"}
                  </td>
                  <td className="border px-4 py-2">{course.content}</td>
                  <td className="border px-4 py-2">
                    {course.youtubeLink ? <a href={course.youtubeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Video</a> : "No Link"}
                  </td>
                  <td className="border px-4 py-2 text-center flex justify-center gap-2">
                    <button onClick={() => handleEdit(course)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Update</button>
                    <button onClick={() => handleDelete(course._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Delete</button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center text-gray-500">No courses available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}
