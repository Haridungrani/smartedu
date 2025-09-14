// // /api/admin/course/count.js
// import { connect } from "../../../../../utlis/dbconfig";
// import Course from "../../../../../model/course";

// export default async function handler(req, res) {
//   try {
//     await connect();
//     const totalCourses = await Course.countDocuments();
//     res.status(200).json({ totalCourses });
//   } catch (err) {
//     res.status(500).json({ error: "Unable to fetch course count" });
//   }
// }
