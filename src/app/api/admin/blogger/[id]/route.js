import { connect } from "../../../../../utlis/dbconfig";
import Blogger from "../../../../../model/blogger";

export async function DELETE(req, { params }) {
  await connect();
  const { id } = params;

  try {
    await Blogger.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Blogger deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete blogger" }), { status: 500 });
  }
}
