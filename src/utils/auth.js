import { verify } from "jsonwebtoken";

export async function getAdminFromCookie(req) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.split("; ").find(row => row.startsWith("admin-token="))?.split("=")[1];
  if (!token) return null;
  try {
    const admin = verify(token, process.env.JWT_SECRET);
    if (admin?.role !== "admin") return null;
    return admin;
  } catch (err) {
    return null;
  }
}

export async function getUserFromCookie(req) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.split("; ").find(row => row.startsWith("user-token="))?.split("=")[1];
  if (!token) return null;
  try {
    const user = verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    return null;
  }
}


