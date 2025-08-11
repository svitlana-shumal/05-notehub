import css from "../App/App.module.css";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { Note } from "../../types/note";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";

export default function App() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes("", page, perPage),
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
    setSelectedNote(null);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBar />
        {data?.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={(selectedPage) => setPage(selectedPage)}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {data && data.results.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} note={selectedNote} />
        </Modal>
      )}
    </div>
  );
}
