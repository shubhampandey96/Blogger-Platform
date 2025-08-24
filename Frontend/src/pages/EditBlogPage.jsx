// src/pages/EditBlogPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, fetchPosts } from "../features/blog/blogSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditBlogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { posts } = useSelector((state) => state.blog);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch posts if state is empty
    if (posts.length === 0) dispatch(fetchPosts());

    const blog = posts.find((p) => (p._id || p.id) === id);
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [dispatch, id, posts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePost({ id, title, content })).unwrap();
      navigate("/blogs");
    } catch (err) {
      console.error("Failed to update blog:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Blog</h2>
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
          className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors"
        >
          💾 Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
