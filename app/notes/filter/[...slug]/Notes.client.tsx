"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { NoteTag } from "@/types/note";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import EmptyMessage from "../Empty/EmptyMessage";
interface NotesProps {
  initialData: FetchNotesResponse;
  currentTag?: NoteTag | "All";
}

export default function Notes({ initialData, currentTag = "All" }: NotesProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isSuccess } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, currentTag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: 12,
        search: searchQuery,
        tag: currentTag === "All" ? undefined : currentTag,
      }),

    placeholderData: keepPreviousData,
    initialData,
  });

  const changeSearchQuery = useDebouncedCallback((newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  }, 300);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    changeSearchQuery(value);
  };

  const changePage = useDebouncedCallback((page: number) => {
    setCurrentPage(page);
  }, 200);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const totalPages = data?.totalPages ?? 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleInputChange} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={(page: number) => {
              if (page >= 1 && page <= totalPages) {
                changePage(page);
              }
            }}
          />
        )}
        <button className={css.button} onClick={handleOpen}>
          Create note +
        </button>
        {isModalOpen && (
          <Modal onClose={handleClose}>
            <NoteForm onClose={handleClose} />
          </Modal>
        )}
      </header>
      {/* {isLoading && <Loader />}
      {isError && <ErrorMessage />} */}
      {isSuccess && data.notes.length === 0 && (
        <p className={css.emptyMessage}>No notes found.</p>
      )}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
