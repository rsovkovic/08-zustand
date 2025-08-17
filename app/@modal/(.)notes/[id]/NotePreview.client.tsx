"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

export default function NotePreview() {
  const params = useParams();
  const router = useRouter();
  const noteId = params?.id as string;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading)
    return (
      <Modal onClose={handleClose}>
        <p>Loading...</p>
      </Modal>
    );
  if (error || !note)
    return (
      <Modal onClose={handleClose}>
        <p>Error...</p>
      </Modal>
    );

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <span className={css.tag}>{note.tag}</span>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </p>
          <button className={css.backBtn} onClick={handleClose}>
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
}
