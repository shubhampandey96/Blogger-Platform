import { useState } from "react";

const dummyPosts = [
  {
    id: 1,
    title: "Getting Started with Blogging",
    author: "Shubham",
    date: "Aug 20, 2025",
    excerpt:
      "Learn how to share your thoughts, ideas, and stories with the world through blogging...",
  },
  {
    id: 2,
    title: "Top 5 Tips for Writing Better Content",
    author: "Admin",
    date: "Aug 22, 2025",
    excerpt:
      "Improve your writing with these 5 easy-to-follow tips that professional bloggers use...",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");

  const filteredPosts = dummyPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation Bar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">MyBlog</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:text-blue-500">
            Home
          </a>
          <a href="/login" className="hover:text-blue-500">
            Login
          </a>
          <a href="/register" className="hover:text-blue-500">
            Register
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-4xl font-bold mb-3">Welcome to MyBlog</h2>
        <p className="text-lg">
          Share your stories, connect with others, and explore new ideas.
        </p>
      </section>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mt-6">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Blog Posts List */}
      <main className="max-w-3xl mx-auto p-6">
        <h3 className="text-2xl font-semibold mb-4">Latest Posts</h3>

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-xl shadow-md mb-5 hover:shadow-lg transition"
            >
              <h4 className="text-xl font-bold">{post.title}</h4>
              <p className="text-gray-500 text-sm">
                By {post.author} • {post.date}
              </p>
              <p className="mt-2 text-gray-700">{post.excerpt}</p>
              <a
                href={`/posts/${post.id}`}
                className="mt-3 inline-block text-blue-600 font-medium hover:underline"
              >
                Read More →
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </main>
    </div>
  );
}
