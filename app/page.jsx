import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Home",
  description: "Explore carefully crafted articles on technology, design, development, and modern thinking on NextBlog.",
  openGraph: {
    title: "NextBlog - Thoughts, Stories & Ideas",
    description: "Explore carefully crafted articles on technology, design, development, and modern thinking.",
  },
};

export default function Home() {
  return <HomeClient />;
}
