import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AxiosError } from "axios";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const awaitedParams = await props.params;
  const id = awaitedParams.id;
  // console.log("generateMetadata called for note id:", id);
  try {
    const note = await fetchNoteById(id);
    if (!note) notFound();

    const title = note.title ?? "Untitled";
    const description = (note.content ?? "View note.").slice(0, 160);
    // const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://notehub.com";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        // url: `${baseUrl}/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 404)
      notFound();
    throw error;
  }
}

export default async function NoteDetailsPage(props: Props) {
  const awaitedParams = await props.params;
  const id = awaitedParams.id;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 404)
      notFound();
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
