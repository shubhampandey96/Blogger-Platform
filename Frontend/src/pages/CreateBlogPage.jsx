// src/pages/CreateBlogPage.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";

const CreateBlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPost({ title, content })).unwrap();
      navigate("/blogs"); // go to blog list after creating
    } catch (err) {
      console.error("Failed to create blog:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Create Blog</h2>
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
          className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
