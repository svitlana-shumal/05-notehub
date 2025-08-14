import css from "../App/App.module.css";
import Loader from "../Loader/Loader";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteNote,
  fetchNotes,
  FetchNotesResponse,
} from "../../services/noteService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState } from "react";
import EmptyState from "../EmptyState/EmptyState";

export default function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, error } =
    useQuery<FetchNotesResponse>({
      queryKey: ["notes", page, debouncedSearch],
      queryFn: () => fetchNotes(debouncedSearch, page),
      placeholderData: (prev) => prev,
    });

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const handleDelete = (id: string) => {
    mutation.mutate(id);
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
        <SearchBox value={search} onChange={setSearch} />
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
      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
