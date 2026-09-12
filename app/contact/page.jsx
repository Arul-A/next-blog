"use client"

import { useState } from "react"

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!formData.name || !formData.email || !formData.message) {
            setError('All fields are required')
            return
        }
        try {
            const res = await fetch('/api/enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.code === 201) {                
                setError('Enquiry submitted successfully')
                setFormData({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setError('')
        }, 3000)
    }
    return (
        <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex items-center mb-4">
                <label htmlFor="name" className="w-1/4">Name:</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="border rounded px-2 py-1 w-3/4 focus:outline-none" />
            </div>
            <div className="flex items-center mb-4">
                <label htmlFor="email" className="w-1/4">Email:</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="border rounded px-2 py-1 w-3/4 focus:outline-none" />
            </div>
            <div className="flex items-center mb-4">
                <label htmlFor="message" className="w-1/4">Message:</label>
                <textarea id="message" value={formData.message} onChange={handleChange} className="border rounded px-2 py-1 w-3/4 focus:outline-none" rows="4"></textarea>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
        {error && <p className={error === 'Enquiry submitted successfully' ? "text-green-600 font-medium mt-3" : "text-red-500 font-medium mt-3"}>{error}</p>}
    </main>
    )
}