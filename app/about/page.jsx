export const metadata = {
    title: "About Us",
    description: "Learn more about NextBlog - our mission to share ideas, stories, and knowledge in a simple and user-friendly way.",
    openGraph: {
        title: "About Us | NextBlog",
        description: "Learn more about NextBlog - our mission to share ideas, stories, and knowledge in a simple and user-friendly way.",
    },
};

export default function AboutPage() {
    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex-1">
            <div className="space-y-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-100">
                    Our Mission
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    About NextBlog
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Our blog platform is built to share ideas, stories, and knowledge in a simple and user-friendly way.
                    We aim to provide a modern, curated reading experience for creators, engineers, and curious minds.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                    <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                            ✍️
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Curated Writing</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Every article is crafted to provide valuable takeaways, architectural patterns, and actionable insights.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
                            ⚡
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Modern Architecture</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Built using Next.js App Router, MongoDB, Tailwind CSS, and optimized for speed and SEO.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}