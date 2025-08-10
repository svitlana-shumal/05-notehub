import css from "./SearchBar.module.css";
// import toast from "react-hot-toast";

// interface SearchBarProps {
//   onSubmit: (query: string) => void;
// }

// export default function SearchBar({ onSubmit }: SearchBarProps) {
// const handleSubmit = (formData: FormData) => {
//   const query = (formData.get("query") as string)?.trim();
//   if (!query) {
//     toast.error("Please enter your search query.");
//     return;
//   }
//   onSubmit(query);
// };

export default function SearchBar() {
  return <input className={css.input} type="text" placeholder="Search notes" />;
}
