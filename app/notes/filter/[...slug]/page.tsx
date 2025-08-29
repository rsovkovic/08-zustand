import Notes from "@/app/notes/filter/[...slug]/Notes.client";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";
interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;
  const currentTag = awaitedParams.slug?.[0] as NoteTag | "All" | undefined;

  const tagFetch = !currentTag || currentTag === "All" ? undefined : currentTag;
  const tagTitle = currentTag && currentTag !== "All" ? currentTag : "All Tags";

  const { notes } = await fetchNotes({
    page: 1,
    perPage: 12,
    search: "",
    tag: tagFetch,
  });

  const description =
    notes.length > 0
      ? notes[0].content.slice(0, 160)
      : `Browse notes with tag: ${tagTitle}`;

  const pageTitle = `Notes - ${tagTitle}`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      url: `https://08-zustand-mu-plum.vercel.app/notes/filter/${currentTag ?? "All"}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes - ${tagTitle}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const awaitedParams = await params;
  const currentTag = awaitedParams.slug?.[0] as NoteTag | "All" | undefined;
  const tagFetch = !currentTag || currentTag === "All" ? undefined : currentTag;
  const { notes, totalPages } = await fetchNotes({
    page: 1,
    perPage: 12,
    search: "",
    tag: tagFetch,
  });
  return (
    <div>
      <Notes
        initialData={{ notes, totalPages }}
        currentTag={currentTag ?? "All"}
      />
    </div>
  );
}
