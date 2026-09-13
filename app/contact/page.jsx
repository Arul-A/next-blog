import ContactForm from "@/components/ContactForm";

export const metadata = {
    title: "Contact Us",
    description: "Get in touch with the NextBlog team for inquiries, feedback, article suggestions, or collaborations.",
    openGraph: {
        title: "Contact Us | NextBlog",
        description: "Get in touch with the NextBlog team for inquiries, feedback, article suggestions, or collaborations.",
    },
};

export default function ContactPage() {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 flex-1 flex items-center justify-center">
            <ContactForm />
        </div>
    );
}