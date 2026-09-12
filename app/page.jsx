"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState(false)

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setPosts(data.postData || [])
      })
      .catch(err => console.error(err))
  }, [])

  const handleSearch = async () => {
    setSearch(true)
    try {
      const url = query ? `/api/posts?q=${encodeURIComponent(query)}` : '/api/posts'
      const res = await fetch(url)
      const data = await res.json()
      setPosts(data.postData || [])
    } catch (err) {
      console.error(err)
    } finally {
      setSearch(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !search) {
      handleSearch()
    }
  }

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Your space to read, learn, and share knowledge through engaging blog posts.</p>
      </main>
      <div className="flex justify-end px-4">
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-md" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search..." />
        <button className={`px-4 py-2 bg-blue-500 text-white rounded-md ml-4 ${search ? 'opacity-50' : ''}`} onClick={handleSearch} disabled={search}>Search</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pt-6 pb-20">
        {posts.map(post => (
          <Link key={post._id} href={"/post/" + post._id}>
            <div className="border border-gray-200 p-4">
              <img className="w-full h-48 object-cover mb-4" src={post.image} alt="Post Image" />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))}
      </div>
      {posts.length === 0 && <p className="text-center">No posts found</p>}
    </>
  );
}
