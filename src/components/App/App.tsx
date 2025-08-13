import css from "../App/App.module.css";
import Loader from "../Loader/Loader";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { Note } from "../../types/note";
import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteNote, fetchNotes } from "../../services/noteService";
import axios from "axios";

export default function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: async () => {
      const response = await axios.get(
        "https:notehub-public.goit.study/api/notes",
        {
          params: debouncedSearch ? { search: debouncedSearch } : {},
        }
      );
      return response.data;
    },
    enabled: true,
  });

  // const mutation = useMutation({
  //   mutationFn: deleteNote,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["notes"] });
  //   },
  //   onError: (error) => {
  //     console.error("Delete failed", error);
  //   },
  // });
  // const handleDelete = (id: string) => {
  //   mutation.mutate(id);
  // };

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
        <SearchBox value={search} onChange={setSearch} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages}
            onPageChange={(selectedPage) => setPage(selectedPage)}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <p>Error loading notes</p>}
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
