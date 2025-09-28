// src/components/CreateBlogButton.jsx
import { useNavigate } from "react-router-dom";

export default function CreateBlogButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/blogs/create")}  // Navigates to create blog page
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      + Create Blog
    </button>
  );
}
