"use client"

import { useEffect, useState, use } from "react"

export default function Post({params}) {
    const {id} =  use(params)   
    const [post, setPost] = useState(null)
    useEffect(() => {
        fetch(`/api/post/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPost(data.postData)
            })
    }, [])
    return (
    post ? (
        <main className="container mx-auto px-4 pt-6 pb-20">
            <h2 className="text-4xl font-bold mb-4">{post?.title}</h2>
            <p className="text-gray-500">Published on {post?.formated_date}</p>
            <img src={post?.image} alt="Post Image" className="w-full h-80 sm:h-96 md:h-112.5 object-cover rounded-lg my-4" />
            <p>{post?.description}</p>
        </main>
        ) : (
            <p className="flex justify-center items-center h-screen">No Data</p>
        )
    );
}