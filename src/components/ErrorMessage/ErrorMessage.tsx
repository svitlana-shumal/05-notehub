import css from "./ErrorMessage.module.css";

interface ErrorMessageProp {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProp) {
  return <p className={css.error}>{message || "Unknown error occurred."}</p>;
}
