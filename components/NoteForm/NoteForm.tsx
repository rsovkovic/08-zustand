import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useId } from "react";
import css from "./NoteForm.module.css";
// import { Note } from "../../types/note";
import { createNote } from "@/lib/api";
import { CreateNoteProps } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
interface NoteFormProps {
  onClose: () => void;
}

// interface NoteValues {
//     title: string;
//     content: string;
//     tag: string;

// }
const noteValues: CreateNoteProps = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500, "Too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required field"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  //   const handleSubmit = (values: Note, actions: FormikHelpers<Note>) => {
  //     console.log("Form submitted:", values);
  //     actions.resetForm();
  //   };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const handleSubmit = (
    values: CreateNoteProps,
    actions: FormikHelpers<CreateNoteProps>
  ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
        onClose();
      },
    });
  };
  return (
    <Formik
      initialValues={noteValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            as="textarea"
          />
          <ErrorMessage name="content" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
            as="select"
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} component="span" />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
