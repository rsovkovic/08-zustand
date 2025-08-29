import { Metadata } from "next";

// import Link from "next/link";
export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "404 - Page Not Found",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://08-zustand-mu-plum.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],
  },
};
const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
