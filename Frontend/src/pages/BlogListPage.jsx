// src/pages/BlogListPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";

const BlogListPage = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deletePost(id));
    }
  };

  if (status === "loading") return <p className="text-center">Loading blogs...</p>;
  if (status === "failed") return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📚 My Blogs</h2>
      <Link to="/blogs/create" className="bg-cyan-600 text-white px-4 py-2 rounded-md mb-4 inline-block">
        ➕ Create Blog
      </Link>

      <div className="space-y-4">
        {posts.length === 0 && <p>No blogs yet.</p>}
        {posts.map((blog) => (
          <div key={blog._id} className="p-4 border rounded-md shadow">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
            <div className="flex gap-4 mt-2">
              <Link to={`/blogs/edit/${blog._id}`} className="text-blue-600 hover:underline">
                ✏️ Edit
              </Link>
              <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:underline">
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;
