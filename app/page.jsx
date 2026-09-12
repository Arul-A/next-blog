"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (searchQuery = "") => {
    setLoading(true);
    try {
      const url = searchQuery
        ? `/api/posts?q=${encodeURIComponent(searchQuery)}`
        : "/api/posts";
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.postData || []);
    } catch (err) {
      console.error("Failed to load posts:", err);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    fetchPosts(query);
  };

  const handleClear = () => {
    setQuery("");
    fetchPosts("");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50/50 via-white to-gray-50/30 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-10 border-b border-gray-100 bg-white/70 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-100 mb-4">
            The Journal & Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight max-w-2xl mx-auto">
            Thoughts, Stories & Ideas
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Explore carefully crafted articles on technology, design, development, and modern thinking.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mt-8 max-w-md mx-auto relative flex items-center shadow-xs focus-within:shadow-md rounded-2xl transition duration-200"
          >
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles by title or keyword..."
                className="w-full pl-10 pr-20 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute inset-y-0 right-16 pr-2 flex items-center text-xs text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-gray-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition duration-150 disabled:opacity-50"
              >
                {isSearching ? "..." : "Search"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">
            {query ? `Search results for "${query}"` : "Latest Publications"}
          </h2>
          {!loading && (
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
          )}
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-gray-400">
              🔍
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No articles found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
              We couldn't find any articles matching your search criteria. Try a different query.
            </p>
            {query && (
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          /* Post Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group bg-white rounded-2xl border border-gray-200/70 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <Link href={`/post/${post._id}`} className="block relative overflow-hidden aspect-16/10 bg-gray-100">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 text-gray-400">
                      <span className="text-xs font-semibold uppercase tracking-wider">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Publication Date */}
                    {post.formated_date && (
                      <div className="flex items-center text-xs font-medium text-gray-600 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                        {post.formated_date}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2.5 leading-snug">
                      <Link href={`/post/${post._id}`}>{post.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {post.short_description || post.description}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Read article</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
