"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function Post({ params }) {
    const { id } = use(params);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/post/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data.postData || null);
            })
            .catch((err) => console.error("Failed to load post:", err))
            .finally(() => setLoading(false));
    }, [id]);

    // Calculate approximate read time
    const getReadTime = (text) => {
        if (!text) return "1 min read";
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / 200);
        return `${time} min read`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-10 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-96 bg-gray-200 rounded-2xl"></div>
                    <div className="space-y-3 pt-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                        ✕
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Article Not Found</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        The article you are looking for may have been deleted or moved.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition"
                    >
                        ← Back to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-linear-to-b from-gray-50/40 via-white to-gray-50/20 pt-10 pb-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back navigation */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-xs font-semibold text-gray-600 hover:text-blue-600 transition group"
                    >
                        <span className="mr-1.5 transform group-hover:-translate-x-1 transition-transform">
                            ←
                        </span>
                        Back to all articles
                    </Link>
                </div>

                {/* Article Header */}
                <header className="space-y-4 mb-8">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                        {post.formated_date && (
                            <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full font-medium">
                                📅 {post.formated_date}
                            </span>
                        )}
                        <span className="inline-flex items-center bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full font-medium">
                            ⏱️ {getReadTime(post.description)}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.15]">
                        {post.title}
                    </h1>
                </header>

                {/* Hero Featured Image */}
                {post.image && (
                    <div className="relative mb-10 overflow-hidden rounded-2xl shadow-md border border-gray-100 bg-gray-100">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full max-h-[480px] object-cover"
                            onError={(e) => {
                                e.target.style.display = "none";
                            }}
                        />
                    </div>
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">
                    {post.description?.split("\n").map((paragraph, index) => {
                        const trimmed = paragraph.trim();
                        if (!trimmed) return null;
                        return (
                            <p key={index} className="leading-relaxed">
                                {trimmed}
                            </p>
                        );
                    })}
                </div>

                {/* Article Footer & Navigation */}
                <footer className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                            B
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Next.js Blog Editorial</p>
                            <p className="text-xs text-gray-600">Curated stories and insights</p>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl transition shadow-xs"
                    >
                        Explore More Articles →
                    </Link>
                </footer>
            </div>
        </article>
    );
}