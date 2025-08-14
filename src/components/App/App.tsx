import css from "../App/App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "../../services/noteService";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import EmptyState from "../EmptyState/EmptyState";

export default function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError, error } =
    useQuery<FetchNotesResponse>({
      queryKey: ["notes", page, debouncedSearch],
      queryFn: () => fetchNotes(debouncedSearch, page),
      placeholderData: (prev) => prev,
    });
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {(isLoading || isFetching) && <Loader />}

      {isError && <ErrorMessage message={(error as Error).message} />}
      {!data?.notes?.length && !isLoading && !isError && (
        <EmptyState message="No results found." />
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
