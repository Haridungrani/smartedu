import { connect } from "../../../../../utils/dbconfig";
import Course from "../../../../../model/course";

export async function GET(req) {
  try {
    await connect();
    const courses = await Course.find({});
    return new Response(JSON.stringify({ ok: true, courses }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connect();
    const data = await req.formData();
    const courseName = data.get("courseName");
    const content = data.get("content");
    const youtubeLink = data.get("youtubeLink");
    const image = data.get("image")?.name || "";

    const newCourse = await Course.create({ courseName, content, youtubeLink, image });
    return new Response(JSON.stringify({ ok: true, course: newCourse }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connect();
    const { id } = params;
    const data = await req.formData();
    const updateData = {
      courseName: data.get("courseName"),
      content: data.get("content"),
      youtubeLink: data.get("youtubeLink"),
    };
    if (data.get("image")) updateData.image = data.get("image").name;

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });
    return new Response(JSON.stringify({ ok: true, course: updatedCourse }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connect();
    const { id } = params;
    await Course.findByIdAndDelete(id);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
