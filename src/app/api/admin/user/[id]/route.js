// app/api/admin/user/[id]/route.js
import { NextResponse } from "next/server";
import { connect } from "../../../../../utils/dbconfig";
import User from "../../../../../model/user";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await connect();
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
