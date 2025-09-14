import { connect } from "../../../../../utlis/dbconfig";
import Course from "../../../../../model/course";

export async function DELETE(req, { params }) {
  await connect();
  const { id } = params;

  try {
    await Course.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Course deleted successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to delete course" }), { status: 500 });
  }
}
