"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [alert, setAlert] = useState({ type: "", message: "" });

    // Modal state for Create / Edit
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Form inputs
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
    });

    // Delete confirmation modal state
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // Fetch all posts
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();
            if (res.ok && data.postData) {
                setPosts(data.postData);
            } else {
                setPosts([]);
            }
        } catch (err) {
            showAlert("error", "Failed to fetch posts: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => {
            setAlert({ type: "", message: "" });
        }, 4000);
    };

    // Open modal for Create
    const handleOpenCreateModal = () => {
        setIsEditing(false);
        setCurrentPostId(null);
        setFormData({ title: "", image: "", description: "" });
        setIsModalOpen(true);
    };

    // Open modal for Edit
    const handleOpenEditModal = (post) => {
        setIsEditing(true);
        setCurrentPostId(post._id);
        setFormData({
            title: post.title || "",
            image: post.image || "",
            description: post.description || "",
        });
        setIsModalOpen(true);
    };

    // Close Create/Edit Modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ title: "", image: "", description: "" });
        setCurrentPostId(null);
    };

    // Handle Form Submit (Create or Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.description.trim()) {
            showAlert("error", "Title and description are required.");
            return;
        }

        setSubmitting(true);
        try {
            if (isEditing) {
                // Update Post
                const res = await fetch(`/api/post/${currentPostId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (res.ok) {
                    showAlert("success", "Post updated successfully!");
                    handleCloseModal();
                    fetchPosts();
                } else {
                    showAlert("error", data.message || "Failed to update post.");
                }
            } else {
                // Create Post
                const res = await fetch("/api/posts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (res.ok) {
                    showAlert("success", "Post created successfully!");
                    handleCloseModal();
                    fetchPosts();
                } else {
                    showAlert("error", data.message || "Failed to create post.");
                }
            }
        } catch (err) {
            showAlert("error", "An error occurred: " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    // Open Delete Confirmation
    const handlePromptDelete = (post) => {
        setPostToDelete(post);
        setDeleteModalOpen(true);
    };

    // Confirm Delete
    const handleConfirmDelete = async () => {
        if (!postToDelete) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/post/${postToDelete._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (res.ok) {
                showAlert("success", "Post deleted successfully!");
                setDeleteModalOpen(false);
                setPostToDelete(null);
                fetchPosts();
            } else {
                showAlert("error", data.message || "Failed to delete post.");
            }
        } catch (err) {
            showAlert("error", "Error deleting post: " + err.message);
        } finally {
            setDeleting(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            router.push("/admin/login");
            router.refresh();
        }
    };

    // Filtered posts based on search term
    const filteredPosts = posts.filter(
        (post) =>
            post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Top Admin Navbar */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow">
                                A
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 leading-none">
                                    Admin Dashboard
                                </h1>
                                <span className="text-xs text-gray-500">Post Management</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Link
                                href="/"
                                target="_blank"
                                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                ↗ View Public Site
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition border border-red-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                {/* Notification Alert Banner */}
                {alert.message && (
                    <div
                        className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center justify-between shadow-sm ${
                            alert.type === "success"
                                ? "bg-green-50 text-green-800 border border-green-200"
                                : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                    >
                        <span>{alert.message}</span>
                        <button
                            onClick={() => setAlert({ type: "", message: "" })}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Dashboard Stats & Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">All Blog Posts</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Create, update, or remove articles from your blog
                        </p>
                    </div>

                    <button
                        onClick={handleOpenCreateModal}
                        className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow transition hover:shadow-md"
                    >
                        <span className="mr-2 text-base font-bold">+</span> Create New Post
                    </button>
                </div>

                {/* Search & Statistics Bar */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-80">
                        <input
                            type="text"
                            placeholder="Search posts by title or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
                    </div>

                    <div className="text-sm text-gray-500 self-end sm:self-center font-medium">
                        Showing <span className="font-bold text-gray-800">{filteredPosts.length}</span> of{" "}
                        <span className="font-bold text-gray-800">{posts.length}</span> posts
                    </div>
                </div>

                {/* Posts Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="py-20 text-center text-gray-500">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-3"></div>
                            <p>Loading posts...</p>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="py-16 text-center text-gray-500 px-4">
                            <div className="text-4xl mb-3">📝</div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">No Posts Found</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                {searchTerm
                                    ? "No posts match your search query."
                                    : "Get started by creating your very first blog post."}
                            </p>
                            {!searchTerm && (
                                <button
                                    onClick={handleOpenCreateModal}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                                >
                                    + Create Post
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs">
                                    <tr>
                                        <th scope="col" className="px-6 py-3.5">
                                            Post
                                        </th>
                                        <th scope="col" className="px-6 py-3.5 hidden md:table-cell">
                                            Excerpt
                                        </th>
                                        <th scope="col" className="px-6 py-3.5 whitespace-nowrap">
                                            Created Date
                                        </th>
                                        <th scope="col" className="px-6 py-3.5 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {filteredPosts.map((post) => (
                                        <tr key={post._id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    {post.image ? (
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                                            onError={(e) => {
                                                                e.target.style.display = "none";
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs flex-shrink-0 font-medium">
                                                            No img
                                                        </div>
                                                    )}
                                                    <div className="min-w-0 flex-1">
                                                        <div className="font-semibold text-gray-900 line-clamp-1">
                                                            {post.title}
                                                        </div>
                                                        <Link
                                                            href={`/post/${post._id}`}
                                                            target="_blank"
                                                            className="text-xs text-blue-600 hover:underline inline-block mt-0.5"
                                                        >
                                                            View live ↗
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-gray-600 hidden md:table-cell max-w-xs">
                                                <p className="line-clamp-2 text-xs">
                                                    {post.short_description || post.description}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap text-xs">
                                                {post.formated_date || post.createdAt || "N/A"}
                                            </td>

                                            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleOpenEditModal(post)}
                                                    className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-md transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handlePromptDelete(post)}
                                                    className="inline-flex items-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-md transition border border-red-200"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Create / Edit Post Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {isEditing ? "Edit Blog Post" : "Create New Post"}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {isEditing
                                        ? "Update the details for this blog article"
                                        : "Fill in the details to publish a new article"}
                                </p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 text-lg p-1 rounded-lg"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Getting Started with Next.js"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Image URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://images.unsplash.com/photo-..."
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData({ ...formData, image: e.target.value })
                                    }
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                />
                                {formData.image && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">Image Preview:</p>
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="h-32 w-full object-cover rounded-lg border border-gray-200"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Content / Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={8}
                                    placeholder="Write your article content here..."
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-y"
                                />
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    disabled={submitting}
                                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow transition disabled:opacity-50"
                                >
                                    {submitting
                                        ? "Saving..."
                                        : isEditing
                                        ? "Update Post"
                                        : "Publish Post"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && postToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 text-xl">
                                🗑️
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Delete Post</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold text-gray-800">
                                    "{postToDelete.title}"
                                </span>
                                ? This action cannot be undone.
                            </p>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setDeleteModalOpen(false);
                                    setPostToDelete(null);
                                }}
                                disabled={deleting}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={deleting}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold shadow transition disabled:opacity-50"
                            >
                                {deleting ? "Deleting..." : "Delete Post"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}