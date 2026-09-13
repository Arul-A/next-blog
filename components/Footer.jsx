export default function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-100 bg-white text-gray-600 text-xs py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">NextBlog</span>
                    <span>•</span>
                    <span>Built with Next.js & MongoDB</span>
                </div>
                <div>
                    © {new Date().getFullYear()} All rights reserved.
                </div>
            </div>
        </footer>
    );
}