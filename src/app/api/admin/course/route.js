// src/app/api/admin/course/add/route.js
import { connect } from "../../../../utlis/dbconfig";
import Course from "../../../../model/course";

export async function POST(req) {
  await connect(); // Connect to MongoDB

  try {
    const { courseName, content, youtubeLink, image } = await req.json();

    // Validate required fields
    if (!courseName || !content) {
      return new Response(JSON.stringify({ error: "Course name and content are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a new course
    const newCourse = new Course({
      courseName,
      content,
      youtubeLink: youtubeLink || "",
      image: image || "",
    });

    await newCourse.save();

    return new Response(JSON.stringify({ message: "Course added successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding course:", error);
    return new Response(JSON.stringify({ error: "Failed to add course" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
