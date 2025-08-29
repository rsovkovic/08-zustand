"use client";
import { useId } from "react";
import css from "./NoteForm.module.css";
import { createNote, CreateNoteProps } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { NoteTag } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";

// interface NoteFormProps {
//   onClose: () => void;
// }

export default function NoteForm() {
  const router = useRouter();
  const fieldId = useId();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (formData: FormData) => {
    const data: CreateNoteProps = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    };
    mutate(data);
  };

  // const handleCancel = () => {
  //   if (onClose) {
  //     onClose();
  //   } else {
  //     router.back();
  //   }
  // };
  const handleCancel = () => router.back();
  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          value={draft.title || ""}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          maxLength={500}
          value={draft.content || ""}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          required
          value={draft.tag || "Todo"}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}

// const queryClient = useQueryClient();
// const mutation = useMutation({
//   mutationFn: createNote,
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ["notes"] });
//     router.back();
//   },
// });
