import css from "../App/App.module.css";
import { Note } from "../../types/note";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBar />
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}
