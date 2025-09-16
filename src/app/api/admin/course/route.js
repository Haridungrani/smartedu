// src/app/api/admin/course/add/route.js
import { connect } from "../../../../utils/dbconfig";
import Course from "../../../../model/course";

export async function POST(req) {
  await connect();

  try {
    const contentType = req.headers.get("content-type") || "";

    let courseName = "";
    let content = "";
    let youtubeLink = "";
    let image = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      courseName = formData.get("courseName")?.toString() || "";
      content = formData.get("content")?.toString() || "";
      youtubeLink = formData.get("youtubeLink")?.toString() || "";
      const imageFile = formData.get("image");
      // If you later implement file uploads, persist imageFile and set `image` URL here
      image = typeof imageFile === "string" ? imageFile : "";
    } else {
      const body = await req.json();
      courseName = body.courseName || "";
      content = body.content || "";
      youtubeLink = body.youtubeLink || "";
      image = body.image || "";
    }

    if (!courseName || !content) {
      return new Response(JSON.stringify({ error: "Course name and content are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newCourse = new Course({
      courseName,
      content,
      youtubeLink,
      image,
    });

    await newCourse.save();

    return new Response(JSON.stringify({ message: "Course added successfully!" }), {
      status: 201,
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
