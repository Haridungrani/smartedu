// src/components/Loader.js
export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-800 border-b-4 border-gray-300"></div>
    </div>
  );
}
