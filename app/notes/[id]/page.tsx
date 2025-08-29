import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = await props.params;
  try {
    const note = await fetchNoteById(id);
    const title = note.title.slice(0, 15);
    const description = note.content?.slice(0, 14) || "View note";
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://08-zustand-mu-plum.vercel.app/notes/${note.id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: "website",
      },
    };
  } catch {
    return {
      title: "NoteHub - note",
      description: "View note",
      openGraph: {
        title: "NoteHub - note",
        description: "View note",
        url: "https://08-zustand-mu-plum.vercel.app",
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub",
          },
        ],
        type: "website",
      },
    };
  }
}

export default async function NoteDetailsPage(props: Props) {
  const { id } = await props.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
