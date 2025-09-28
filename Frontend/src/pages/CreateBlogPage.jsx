// src/pages/CreateBlogPage.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../features/blog/blogSlice";

const CreateBlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Form submitted:", { title, content });

    try {
      const result = await dispatch(createPost({ title, content })).unwrap();
      console.log("Blog created:", result);
      navigate("/blogs"); // Redirect after success
    } catch (err) {
      console.error("Failed to create blog:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Create Blog</h2>

      {error && (
        <div className="mb-4 text-red-600 font-semibold">
          Failed to create blog: {error.message || error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-md"
            rows={6}
            required
          />
        </div>

        <button
          type="submit"
          className={`px-4 py-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-cyan-600 hover:bg-cyan-700"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
