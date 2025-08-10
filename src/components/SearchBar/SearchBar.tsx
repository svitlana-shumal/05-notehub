import css from "./SearchBar.module.css";

export default function SearchBar() {
  return <input className={css.input} type="text" placeholder="Search notes" />;
}
